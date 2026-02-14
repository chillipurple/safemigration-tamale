import React, { useState } from 'react';
import { hotlines, warningSigns, verifiedAgencies, educationalTips, statistics } from '../data/resources';

const ResourceHub = () => {
  const [activeTab, setActiveTab] = useState('hotlines');

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="card mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Resources & Support</h2>
        <p className="text-gray-600">
          Get help, verify recruiters, and learn about trafficking warning signs
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('hotlines')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
            activeTab === 'hotlines' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          🆘 Hotlines
        </button>
        <button
          onClick={() => setActiveTab('warning-signs')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
            activeTab === 'warning-signs' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          ⚠️ Warning Signs
        </button>
        <button
          onClick={() => setActiveTab('verify')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
            activeTab === 'verify' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          ✓ Verify Agencies
        </button>
        <button
          onClick={() => setActiveTab('tips')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
            activeTab === 'tips' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          💡 Tips
        </button>
      </div>

      {/* Hotlines Tab */}
      {activeTab === 'hotlines' && (
        <div className="space-y-4">
          <div className="card bg-red-50 border-2 border-red-500">
            <h3 className="text-lg font-bold text-red-800 mb-4">⚠️ Emergency Hotlines - Free & Confidential</h3>
            <p className="text-sm text-red-700 mb-4">
              If you or someone you know is in danger, trapped, or being exploited, call these numbers NOW:
            </p>
            <div className="space-y-3">
              {hotlines.filter(h => h.type === 'emergency').map((hotline) => (
                <a
                  key={hotline.id}
                  href={`tel:${hotline.number}`}
                  className="block bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-gray-800">{hotline.name}</div>
                      <div className="text-sm text-gray-600">{hotline.description}</div>
                    </div>
                    <div className="text-2xl font-bold text-primary">{hotline.number}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold mb-4">Support Services</h3>
            <div className="space-y-3">
              {hotlines.filter(h => h.type === 'support').map((hotline) => (
                <a
                  key={hotline.id}
                  href={`tel:${hotline.number}`}
                  className="block bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-gray-800">{hotline.name}</div>
                      <div className="text-sm text-gray-600">{hotline.description}</div>
                    </div>
                    <div className="text-lg font-bold text-primary">{hotline.number}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Warning Signs Tab */}
      {activeTab === 'warning-signs' && (
        <div className="space-y-4">
          {warningSigns.map((category, index) => (
            <div key={index} className="card">
              <h3 className="text-lg font-bold mb-4">{category.category}</h3>
              <ul className="space-y-2">
                {category.signs.map((sign, signIndex) => (
                  <li key={signIndex} className="flex items-start">
                    <span className="text-danger mr-2 text-xl">•</span>
                    <span className="text-gray-700">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="card bg-blue-50">
            <h3 className="text-lg font-bold mb-2">📊 {statistics.title}</h3>
            <ul className="space-y-2 mb-4">
              {statistics.facts.map((fact, index) => (
                <li key={index} className="text-sm text-gray-700">• {fact}</li>
              ))}
            </ul>
            <p className="text-xs text-gray-600 italic">Source: {statistics.source}</p>
          </div>
        </div>
      )}

      {/* Verify Agencies Tab */}
      {activeTab === 'verify' && (
        <div className="space-y-4">
          <div className="card bg-green-50 border-2 border-secondary">
            <h3 className="text-lg font-bold text-green-800 mb-2">
              ✓ {verifiedAgencies.title}
            </h3>
            <p className="text-gray-700 mb-4">{verifiedAgencies.description}</p>

            <a
              href={verifiedAgencies.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-secondary text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              View Official List →
            </a>

            <div className="mt-4 p-4 bg-white rounded-lg">
              <p className="text-sm font-semibold text-red-600">
                ⚠️ {verifiedAgencies.note}
              </p>
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold mb-4">How to Verify a Recruiter:</h3>
            <ol className="space-y-3 text-gray-700">
              <li className="flex">
                <span className="font-bold mr-2">1.</span>
                <span>Ask the recruiter for their agency name and license number</span>
              </li>
              <li className="flex">
                <span className="font-bold mr-2">2.</span>
                <span>Visit the Ghana Immigration Service website</span>
              </li>
              <li className="flex">
                <span className="font-bold mr-2">3.</span>
                <span>Check the list of licensed agencies</span>
              </li>
              <li className="flex">
                <span className="font-bold mr-2">4.</span>
                <span>If not on the list, do NOT pay them or give documents</span>
              </li>
              <li className="flex">
                <span className="font-bold mr-2">5.</span>
                <span>Report unlicensed recruiters to police (191) or trafficking hotline (0800-100-100)</span>
              </li>
            </ol>
          </div>
        </div>
      )}

      {/* Tips Tab */}
      {activeTab === 'tips' && (
        <div className="space-y-4">
          {educationalTips.map((tip, index) => (
            <div key={index} className="card">
              <h3 className="text-lg font-bold mb-2">{tip.title}</h3>
              <p className="text-gray-700">{tip.content}</p>
            </div>
          ))}

          <div className="card bg-yellow-50">
            <h3 className="font-bold mb-2">Share This Information</h3>
            <p className="text-sm text-gray-700 mb-4">
              Help protect your community by sharing what you've learned about trafficking warning signs.
              Talk to family, friends, and coworkers about how to stay safe.
            </p>
            <button className="btn-primary w-full">
              📤 Share App
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceHub;
