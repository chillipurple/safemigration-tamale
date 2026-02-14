import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const UserRegistration = ({ onComplete }) => {
  const [userData, setUserData] = useState({
    phone: '',
    ageRange: '',
    gender: '',
    migrationIntent: '',
    language: 'english'
  });

  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const existingUser = storage.getUser();
    if (existingUser) {
      setIsRegistered(true);
      setUserData(existingUser);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userData.phone || !userData.ageRange || !userData.gender) {
      alert('Please fill in all required fields');
      return;
    }

    storage.saveUser(userData);
    setIsRegistered(true);

    if (onComplete) {
      onComplete(userData);
    }
  };

  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  if (isRegistered && !onComplete) {
    return (
      <div className="card max-w-md mx-auto mt-8">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-xl font-bold mb-2">Already Registered</h3>
          <p className="text-gray-600 mb-4">
            Welcome back! You can skip to using the app.
          </p>
          <button
            onClick={() => setIsRegistered(false)}
            className="btn-secondary"
          >
            Update My Info
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Safe Migration</h2>
        <p className="text-gray-600 mb-6">
          {isRegistered ? 'Update your information' : 'Tell us a bit about yourself (optional but helpful)'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Phone Number <span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              value={userData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="e.g., 0244123456"
              className="input-field"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              We'll use this to send you verification results for job ads you report
            </p>
          </div>

          {/* Age Range */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Age Range <span className="text-danger">*</span>
            </label>
            <select
              value={userData.ageRange}
              onChange={(e) => handleChange('ageRange', e.target.value)}
              className="input-field"
              required
            >
              <option value="">Select age range</option>
              <option value="under-18">Under 18</option>
              <option value="18-24">18-24</option>
              <option value="25-34">25-34</option>
              <option value="35-44">35-44</option>
              <option value="45+">45+</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Gender <span className="text-danger">*</span>
            </label>
            <select
              value={userData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="input-field"
              required
            >
              <option value="">Select gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          {/* Migration Intent */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Are you considering working abroad?
            </label>
            <select
              value={userData.migrationIntent}
              onChange={(e) => handleChange('migrationIntent', e.target.value)}
              className="input-field"
            >
              <option value="">Select option</option>
              <option value="yes">Yes, actively looking</option>
              <option value="maybe">Maybe, in the future</option>
              <option value="no">No</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              This helps us provide relevant resources for you
            </p>
          </div>

          {/* Language Preference */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Preferred Language
            </label>
            <select
              value={userData.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="input-field"
            >
              <option value="english">English</option>
              <option value="dagbani" disabled>Dagbani (Coming Soon)</option>
            </select>
          </div>

          {/* Privacy Notice */}
          <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-700">
            <p className="font-semibold mb-1">🔒 Your Privacy</p>
            <p>
              Your information is stored only on your device. We don't share it with anyone
              except when you submit job ads for verification.
            </p>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-primary w-full">
            {isRegistered ? 'Update Information' : 'Get Started'}
          </button>

          {onComplete && (
            <button
              type="button"
              onClick={() => onComplete(null)}
              className="btn-secondary w-full"
            >
              Skip for Now
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;
