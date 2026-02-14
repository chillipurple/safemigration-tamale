// LocalStorage utility for data persistence
const STORAGE_KEYS = {
  USER_PROFILE: 'safemigration_user',
  SUBMISSIONS: 'safemigration_submissions',
  PROGRESS: 'safemigration_progress',
  COMPLETED_SCENARIOS: 'safemigration_completed'
};

export const storage = {
  // User profile
  saveUser: (userData) => {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(userData));
  },

  getUser: () => {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : null;
  },

  // Job ad submissions
  saveSubmission: (submission) => {
    const submissions = storage.getSubmissions();
    submissions.push({
      ...submission,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'pending' // pending, verified_safe, confirmed_scam, under_review
    });
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  },

  getSubmissions: () => {
    const data = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    return data ? JSON.parse(data) : [];
  },

  updateSubmissionStatus: (id, status, adminNotes = '') => {
    const submissions = storage.getSubmissions();
    const updated = submissions.map(sub =>
      sub.id === id ? { ...sub, status, adminNotes, reviewedAt: new Date().toISOString() } : sub
    );
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(updated));
  },

  // Education progress
  saveProgress: (scenarioId, progress) => {
    const allProgress = storage.getProgress();
    allProgress[scenarioId] = {
      ...progress,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(allProgress));
  },

  getProgress: () => {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : {};
  },

  completeScenario: (scenarioId, score) => {
    const completed = storage.getCompletedScenarios();
    if (!completed.includes(scenarioId)) {
      completed.push(scenarioId);
      localStorage.setItem(STORAGE_KEYS.COMPLETED_SCENARIOS, JSON.stringify(completed));
    }
  },

  getCompletedScenarios: () => {
    const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_SCENARIOS);
    return data ? JSON.parse(data) : [];
  },

  // Check if all scenarios are completed (for badge)
  hasGoldBadge: () => {
    const completed = storage.getCompletedScenarios();
    return completed.length >= 3; // All 3 scenarios
  },

  // Clear all data (for testing)
  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};
