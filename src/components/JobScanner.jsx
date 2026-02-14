import React, { useState, useRef } from 'react';
import { extractTextFromImage, analyzeJobAd } from '../services/fraudDetection';
import { storage } from '../utils/storage';

const JobScanner = () => {
  const [jobText, setJobText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [userPhone, setUserPhone] = useState('');
  const [jobContact, setJobContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [useCamera, setUseCamera] = useState(false);
  const [stream, setStream] = useState(null);

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Start camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      setUseCamera(true);
    } catch (error) {
      alert('Cannot access camera. Please upload a photo instead.');
      console.error('Camera error:', error);
    }
  };

  // Capture photo from camera
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      setImageFile(new File([blob], 'captured-photo.jpg', { type: 'image/jpeg' }));
      setImagePreview(canvas.toDataURL('image/jpeg'));
      stopCamera();
    }, 'image/jpeg');
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setUseCamera(false);
    }
  };

  // Process the job ad
  const processJobAd = async () => {
    setIsProcessing(true);
    setAnalysis(null);

    try {
      let textToAnalyze = jobText;

      // If image is provided, extract text first
      if (imageFile && !jobText) {
        textToAnalyze = await extractTextFromImage(imageFile);
        setJobText(textToAnalyze);
      }

      if (!textToAnalyze || textToAnalyze.trim().length < 10) {
        alert('Please provide job ad text or upload a clear image');
        setIsProcessing(false);
        return;
      }

      // Analyze with AI
      const result = await analyzeJobAd(textToAnalyze);
      setAnalysis(result);

    } catch (error) {
      alert('Error processing job ad. Please try again.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Submit report
  const submitReport = () => {
    if (!userPhone) {
      alert('Please enter your phone number');
      return;
    }

    const submission = {
      jobText,
      imagePreview,
      analysis,
      userPhone,
      jobContact,
      riskLevel: analysis.riskLevel
    };

    storage.saveSubmission(submission);
    setSubmitted(true);

    setTimeout(() => {
      resetForm();
    }, 3000);
  };

  const resetForm = () => {
    setJobText('');
    setImageFile(null);
    setImagePreview(null);
    setAnalysis(null);
    setUserPhone('');
    setJobContact('');
    setSubmitted(false);
    stopCamera();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Ad Fraud Screener</h2>
        <p className="text-gray-600 mb-6">
          Scan job advertisements for trafficking and fraud red flags using AI
        </p>

        {!analysis ? (
          <>
            {/* Image capture/upload */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Job Advertisement Photo</label>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="btn-secondary flex-1"
                  disabled={isProcessing}
                >
                  📷 Upload Photo
                </button>
                <button
                  onClick={useCamera ? stopCamera : startCamera}
                  className="btn-secondary flex-1"
                  disabled={isProcessing}
                >
                  {useCamera ? '❌ Cancel' : '📸 Take Photo'}
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Camera view */}
              {useCamera && (
                <div className="mb-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full rounded-lg border-2 border-gray-300"
                  />
                  <button onClick={capturePhoto} className="btn-primary w-full mt-2">
                    Capture Photo
                  </button>
                </div>
              )}

              <canvas ref={canvasRef} className="hidden" />

              {/* Image preview */}
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Job ad preview"
                    className="w-full rounded-lg border-2 border-gray-300"
                  />
                </div>
              )}
            </div>

            {/* Manual text input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Or Type/Paste Job Ad Text
              </label>
              <textarea
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder="Enter job advertisement text here..."
                className="input-field min-h-[150px]"
                disabled={isProcessing}
              />
            </div>

            <button
              onClick={processJobAd}
              disabled={isProcessing || (!jobText && !imageFile)}
              className="btn-primary w-full"
            >
              {isProcessing ? '⏳ Analyzing...' : '🔍 Scan for Fraud'}
            </button>
          </>
        ) : (
          <>
            {/* Analysis Results */}
            <div className={`p-6 rounded-lg mb-6 ${
              analysis.riskLevel === 'HIGH' ? 'bg-red-50 border-2 border-red-500' :
              analysis.riskLevel === 'MEDIUM' ? 'bg-yellow-50 border-2 border-yellow-500' :
              'bg-green-50 border-2 border-green-500'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">
                  {analysis.riskLevel === 'HIGH' ? '🚨 HIGH RISK' :
                   analysis.riskLevel === 'MEDIUM' ? '⚠️ MEDIUM RISK' :
                   '✅ LOW RISK'}
                </h3>
                <span className="text-2xl font-bold">
                  {analysis.riskScore}/100
                </span>
              </div>

              {analysis.warningMessage && (
                <div className="bg-white p-4 rounded mb-4 font-semibold">
                  {analysis.warningMessage}
                </div>
              )}

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Analysis:</h4>
                <p className="text-gray-700">{analysis.analysis}</p>
              </div>

              {analysis.detectedFlags.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Red Flags Detected:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {analysis.detectedFlags.map((flag, index) => (
                      <li key={index} className="text-gray-700">{flag}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-2">Recommendations:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-700">{rec}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Submission form */}
            {!submitted ? (
              <div className="border-t pt-6">
                <h3 className="font-bold mb-4">Report This Job Ad</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Submit this for verification. We'll contact you with confirmation.
                </p>

                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Your Phone Number (required)
                    </label>
                    <input
                      type="tel"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      placeholder="e.g., 0244123456"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Job Contact Info (optional)
                    </label>
                    <input
                      type="text"
                      value={jobContact}
                      onChange={(e) => setJobContact(e.target.value)}
                      placeholder="Phone number or contact from the job ad"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={submitReport} className="btn-primary flex-1">
                    Submit Report
                  </button>
                  <button onClick={resetForm} className="btn-secondary flex-1">
                    Scan Another
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2">Report Submitted!</h3>
                <p className="text-gray-600">
                  We'll review this job ad and contact you at {userPhone} with verification results.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobScanner;
