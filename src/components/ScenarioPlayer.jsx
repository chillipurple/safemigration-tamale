import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getScenarioById } from '../data/scenarios';
import { storage } from '../utils/storage';

const ScenarioPlayer = () => {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const scenario = getScenarioById(scenarioId);

  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [totalPoints, setTotalPoints] = useState(0);
  const [history, setHistory] = useState([]);
  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    // Load saved progress if exists
    const progress = storage.getProgress()[scenarioId];
    if (progress) {
      setCurrentNodeId(progress.currentNodeId || 'start');
      setTotalPoints(progress.totalPoints || 0);
      setHistory(progress.history || []);
    }
  }, [scenarioId]);

  useEffect(() => {
    // Save progress whenever it changes
    if (!isEnding) {
      storage.saveProgress(scenarioId, {
        currentNodeId,
        totalPoints,
        history
      });
    }
  }, [currentNodeId, totalPoints, history, scenarioId, isEnding]);

  if (!scenario) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="card text-center">
          <h2 className="text-xl font-bold mb-4">Scenario not found</h2>
          <button onClick={() => navigate('/education')} className="btn-primary">
            Back to Education
          </button>
        </div>
      </div>
    );
  }

  const currentNode = scenario.nodes.find(node => node.id === currentNodeId);

  const handleChoice = (choice) => {
    const newPoints = totalPoints + (choice.points || 0);
    setTotalPoints(newPoints);
    setHistory([...history, { nodeId: currentNodeId, choice: choice.text, points: choice.points }]);
    setCurrentNodeId(choice.nextNode);

    // Check if next node is an ending
    const nextNode = scenario.nodes.find(node => node.id === choice.nextNode);
    if (nextNode && nextNode.ending) {
      setIsEnding(true);
      storage.completeScenario(scenarioId, newPoints + (choice.points || 0));
    }
  };

  const restartScenario = () => {
    setCurrentNodeId('start');
    setTotalPoints(0);
    setHistory([]);
    setIsEnding(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Header */}
      <div className="card mb-4">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => navigate('/education')}
            className="text-primary font-semibold"
          >
            ← Back
          </button>
          <div className="text-sm font-bold">
            Points: {totalPoints}
          </div>
        </div>
        <h2 className="text-xl font-bold">{scenario.title}</h2>
      </div>

      {/* Story Content */}
      <div className="card mb-4">
        {!isEnding ? (
          <>
            <div className="prose prose-sm mb-6">
              <p className="text-gray-800 leading-relaxed">{currentNode.text}</p>
            </div>

            {/* Choices */}
            <div className="space-y-3">
              {currentNode.choices && currentNode.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(choice)}
                  className="w-full text-left p-4 rounded-lg border-2 border-gray-300 hover:border-primary hover:bg-blue-50 transition-all"
                >
                  <div className="font-semibold text-gray-800">{choice.text}</div>
                  {choice.points !== undefined && (
                    <div className={`text-xs mt-1 ${choice.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {choice.points > 0 ? `+${choice.points}` : choice.points} points
                    </div>
                  )}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Ending Screen */}
            <div className={`text-center py-8 ${
              currentNode.outcome === 'safe' ? 'bg-green-50' :
              currentNode.outcome === 'warning' ? 'bg-yellow-50' :
              'bg-red-50'
            } rounded-lg mb-6`}>
              <div className="text-6xl mb-4">
                {currentNode.outcome === 'safe' ? '✅' : currentNode.outcome === 'warning' ? '⚠️' : '🚨'}
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {currentNode.outcome === 'safe' ? 'Safe Ending' :
                 currentNode.outcome === 'warning' ? 'Warning Ending' :
                 'Danger Ending'}
              </h3>
              <p className="text-gray-700 mb-4">{currentNode.text}</p>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <h4 className="font-bold mb-2">What You Learned:</h4>
              <p className="text-gray-700">{currentNode.message}</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h4 className="font-bold mb-2">Your Score:</h4>
              <div className="text-3xl font-bold text-primary">{totalPoints} points</div>
              <p className="text-sm text-gray-600 mt-2">
                {currentNode.outcome === 'safe' ? 'Excellent decisions!' :
                 currentNode.outcome === 'warning' ? 'You could improve your choices.' :
                 'Learn from these mistakes to stay safe.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button onClick={restartScenario} className="btn-secondary flex-1">
                🔄 Try Again
              </button>
              <button onClick={() => navigate('/education')} className="btn-primary flex-1">
                Next Scenario →
              </button>
            </div>
          </>
        )}
      </div>

      {/* Progress indicator */}
      {!isEnding && history.length > 0 && (
        <div className="card bg-gray-50">
          <h4 className="font-semibold mb-2 text-sm">Your Journey:</h4>
          <div className="space-y-1">
            {history.slice(-3).map((item, index) => (
              <div key={index} className="text-xs text-gray-600 flex justify-between">
                <span>"{item.choice}"</span>
                <span className={item.points > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  {item.points > 0 ? '+' : ''}{item.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioPlayer;
