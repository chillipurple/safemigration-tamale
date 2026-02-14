import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllScenarios } from '../data/scenarios';
import { storage } from '../utils/storage';

const EducationModule = () => {
  const scenarios = getAllScenarios();
  const [completedScenarios, setCompletedScenarios] = useState([]);
  const [hasGoldBadge, setHasGoldBadge] = useState(false);

  useEffect(() => {
    const completed = storage.getCompletedScenarios();
    setCompletedScenarios(completed);
    setHasGoldBadge(storage.hasGoldBadge());
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="card mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Learn to Recognize Trafficking
        </h2>
        <p className="text-gray-600 mb-4">
          Complete all 3 scenarios to earn your Gold Certificate and help protect your community
        </p>

        {/* Progress indicator */}
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Your Progress</span>
            <span className="text-sm font-bold">
              {completedScenarios.length}/3 Completed
            </span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all"
              style={{ width: `${(completedScenarios.length / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Gold Badge */}
        {hasGoldBadge && (
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg p-6 text-center mb-6">
            <div className="text-6xl mb-2">🏆</div>
            <h3 className="text-2xl font-bold mb-2">Gold Certificate Earned!</h3>
            <p className="mb-4">
              You completed all scenarios. You can now help protect others from trafficking.
            </p>
            <button className="bg-white text-yellow-600 px-6 py-2 rounded-lg font-semibold">
              📥 Download Certificate
            </button>
          </div>
        )}
      </div>

      {/* Scenario Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {scenarios.map((scenario) => {
          const isCompleted = completedScenarios.includes(scenario.id);

          return (
            <div
              key={scenario.id}
              className={`card relative ${isCompleted ? 'border-2 border-secondary' : ''}`}
            >
              {isCompleted && (
                <div className="absolute top-4 right-4 bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center">
                  ✓
                </div>
              )}

              <div className="mb-4">
                <div className="w-full h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white text-6xl">
                  {scenario.id === 'scenario_1' ? '🛒' : scenario.id === 'scenario_2' ? '📱' : '🏪'}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{scenario.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{scenario.description}</p>

              <Link
                to={`/education/${scenario.id}`}
                className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                  isCompleted
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-primary text-white hover:bg-blue-700'
                }`}
              >
                {isCompleted ? 'Play Again' : 'Start Scenario'}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Info section */}
      <div className="card mt-6 bg-blue-50">
        <h3 className="font-bold text-lg mb-2">💡 How It Works</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Each scenario presents a realistic trafficking situation</li>
          <li>• Make choices based on what you would do</li>
          <li>• Learn from the outcomes - Safe, Warning, or Danger endings</li>
          <li>• Complete all 3 to earn your Gold Certificate</li>
          <li>• Share what you learn with friends and family</li>
        </ul>
      </div>
    </div>
  );
};

export default EducationModule;
