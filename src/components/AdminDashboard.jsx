import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, high-risk
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    const allSubmissions = storage.getSubmissions();
    // Sort by newest first
    setSubmissions(allSubmissions.sort((a, b) => b.timestamp.localeCompare(a.timestamp)));
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'pending') return sub.status === 'pending';
    if (filter === 'high-risk') return sub.riskLevel === 'HIGH';
    return true;
  });

  const updateStatus = (submissionId, newStatus, notes = '') => {
    storage.updateSubmissionStatus(submissionId, newStatus, notes);
    loadSubmissions();
    setSelectedSubmission(null);
  };

  const exportToCSV = () => {
    // Create CSV content
    const headers = ['Date', 'Phone', 'Risk Level', 'Score', 'Job Contact', 'Status', 'Flags'];
    const rows = submissions.map(sub => [
      new Date(sub.timestamp).toLocaleString(),
      sub.userPhone,
      sub.riskLevel,
      sub.analysis?.riskScore || 'N/A',
      sub.jobContact || 'N/A',
      sub.status,
      sub.analysis?.detectedFlags?.join('; ') || ''
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job-fraud-reports-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified_safe': return 'bg-green-100 text-green-800';
      case 'confirmed_scam': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
            <p className="text-gray-600">Review submitted job advertisements</p>
          </div>
          <button onClick={exportToCSV} className="btn-secondary">
            📥 Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-primary">{submissions.length}</div>
            <div className="text-sm text-gray-600">Total Reports</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-warning">
              {submissions.filter(s => s.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-danger">
              {submissions.filter(s => s.riskLevel === 'HIGH').length}
            </div>
            <div className="text-sm text-gray-600">High Risk</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-secondary">
              {submissions.filter(s => s.status === 'verified_safe').length}
            </div>
            <div className="text-sm text-gray-600">Verified Safe</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filter === 'all' ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
          >
            All ({submissions.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filter === 'pending' ? 'bg-warning text-white' : 'bg-gray-200'
            }`}
          >
            Pending ({submissions.filter(s => s.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('high-risk')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filter === 'high-risk' ? 'bg-danger text-white' : 'bg-gray-200'
            }`}
          >
            High Risk ({submissions.filter(s => s.riskLevel === 'HIGH').length})
          </button>
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <div className="card text-center py-12 text-gray-500">
            No submissions found
          </div>
        ) : (
          filteredSubmissions.map((submission) => (
            <div key={submission.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      submission.riskLevel === 'HIGH' ? 'bg-red-100 text-red-800' :
                      submission.riskLevel === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {submission.riskLevel} RISK
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(submission.status)}`}>
                      {submission.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Submitted: {new Date(submission.timestamp).toLocaleString()}
                  </div>
                  <div className="text-sm font-semibold">
                    Phone: {submission.userPhone}
                  </div>
                  {submission.jobContact && (
                    <div className="text-sm text-gray-600">
                      Job Contact: {submission.jobContact}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    {submission.analysis?.riskScore || 0}
                  </div>
                  <div className="text-xs text-gray-500">Risk Score</div>
                </div>
              </div>

              {/* Job Text Preview */}
              <div className="bg-gray-50 p-3 rounded mb-3">
                <div className="text-sm text-gray-700 line-clamp-2">
                  {submission.jobText || 'No text available'}
                </div>
              </div>

              {/* Red Flags */}
              {submission.analysis?.detectedFlags && submission.analysis.detectedFlags.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs font-semibold text-gray-600 mb-1">Detected Red Flags:</div>
                  <div className="flex flex-wrap gap-1">
                    {submission.analysis.detectedFlags.slice(0, 3).map((flag, index) => (
                      <span key={index} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                        {flag}
                      </span>
                    ))}
                    {submission.analysis.detectedFlags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{submission.analysis.detectedFlags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3 border-t">
                <button
                  onClick={() => setSelectedSubmission(submission)}
                  className="btn-secondary flex-1 text-sm py-2"
                >
                  View Details
                </button>
                {submission.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(submission.id, 'verified_safe')}
                      className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      ✓ Safe
                    </button>
                    <button
                      onClick={() => updateStatus(submission.id, 'confirmed_scam')}
                      className="bg-danger text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      ✗ Scam
                    </button>
                    <button
                      onClick={() => updateStatus(submission.id, 'under_review')}
                      className="bg-warning text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      ⏳ Review
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Submission Details</h3>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Image */}
            {selectedSubmission.imagePreview && (
              <div className="mb-4">
                <img
                  src={selectedSubmission.imagePreview}
                  alt="Job ad"
                  className="w-full rounded-lg border"
                />
              </div>
            )}

            {/* Full Text */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Job Ad Text:</h4>
              <div className="bg-gray-50 p-4 rounded text-sm">
                {selectedSubmission.jobText}
              </div>
            </div>

            {/* Full Analysis */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">AI Analysis:</h4>
              <p className="text-sm text-gray-700 mb-2">{selectedSubmission.analysis?.analysis}</p>
              {selectedSubmission.analysis?.recommendations && (
                <ul className="text-sm space-y-1">
                  {selectedSubmission.analysis.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-600">• {rec}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Action Buttons */}
            {selectedSubmission.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(selectedSubmission.id, 'verified_safe')}
                  className="btn-primary flex-1"
                >
                  Mark as Safe
                </button>
                <button
                  onClick={() => updateStatus(selectedSubmission.id, 'confirmed_scam')}
                  className="btn-danger flex-1"
                >
                  Confirm Scam
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
