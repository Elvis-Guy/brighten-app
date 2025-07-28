"use client";

import React, { useState } from 'react';
import { testAPIConnection } from '@/lib/api-test';

const APIDebugger: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    console.clear();
    console.log('🚀 Starting API diagnostics...');
    await testAPIConnection();
    console.log('🏁 Diagnostics complete. Check the console above for details.');
    setIsRunning(false);
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold text-yellow-800 mb-2">🔧 API Debugger</h3>
      <p className="text-yellow-700 text-sm mb-3">
        This tool helps diagnose API connection issues. Click the button below and check your browser console for detailed results.
      </p>
      <button
        onClick={runTests}
        disabled={isRunning}
        className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white px-4 py-2 rounded font-medium transition-colors"
      >
        {isRunning ? '🔄 Running Tests...' : '🧪 Run API Diagnostics'}
      </button>
      <div className="mt-3 text-xs text-yellow-600">
        <strong>Note:</strong> Open your browser's Developer Tools (F12) → Console tab to see the test results.
      </div>
    </div>
  );
};

export default APIDebugger; 