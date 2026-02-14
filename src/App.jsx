import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import JobScanner from './components/JobScanner';
import EducationModule from './components/EducationModule';
import ScenarioPlayer from './components/ScenarioPlayer';
import ResourceHub from './components/ResourceHub';
import UserRegistration from './components/UserRegistration';
import AdminDashboard from './components/AdminDashboard';
import { storage } from './utils/storage';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is registered
    const user = storage.getUser();
    if (!user) {
      setShowOnboarding(true);
    }

    // Check for admin access (simple check - in production use proper auth)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleOnboardingComplete = (userData) => {
    setShowOnboarding(false);
  };

  // Admin Dashboard route
  if (isAdmin) {
    return (
      <Router>
        <div className="min-h-screen bg-cream">
          <header className="hep-header p-6 shadow-xl">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-heading font-bold">Safe Migration Admin</h1>
                <p className="text-sm text-primary-light mt-1">Hope Education Project</p>
              </div>
              <button
                onClick={() => setIsAdmin(false)}
                className="bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-secondary transition-all"
              >
                Exit Admin
              </button>
            </div>
          </header>
          <AdminDashboard />
        </div>
      </Router>
    );
  }

  // Onboarding flow
  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <UserRegistration onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  // Main app
  return (
    <Router>
      <div className="min-h-screen bg-cream pb-20">
        {/* Header */}
        <header className="hep-header p-6 shadow-xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-heading font-bold tracking-tight">Safe Migration</h1>
            </div>
            <div className="accent-bar mb-2"></div>
            <p className="text-base text-primary-light font-medium">Hope Education Project • Protecting Tamale from trafficking</p>
          </div>
        </header>

        {/* Routes */}
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<JobScanner />} />
            <Route path="/education" element={<EducationModule />} />
            <Route path="/education/:scenarioId" element={<ScenarioPlayer />} />
            <Route path="/resources" element={<ResourceHub />} />
            <Route path="/profile" element={<UserRegistration />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Navigation */}
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
