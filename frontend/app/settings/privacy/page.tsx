// ============================================================================
// FILE: app/settings/privacy/page.tsx
// Description: Enhanced Privacy & Data settings page with modern styling
// ============================================================================
"use client";
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';

const PrivacyPage: React.FC = () => {
  const { authState } = useAppContext();
  const [autoSave, setAutoSave] = useState(true);
  const [originalAutoSave, setOriginalAutoSave] = useState(true);
  const [dataSync, setDataSync] = useState(!authState.isAnonymous);
  const [originalDataSync, setOriginalDataSync] = useState(!authState.isAnonymous);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setAutoSave(true);
    setOriginalAutoSave(true);
    setDataSync(!authState.isAnonymous);
    setOriginalDataSync(!authState.isAnonymous);
    setDirty(false);
    setMessage('');
  }, [authState.isAnonymous]);

  const handleSave = () => {
    setOriginalAutoSave(autoSave);
    setOriginalDataSync(dataSync);
    setDirty(false);
    setMessage('Privacy settings updated! (Backend integration coming soon)');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCancel = () => {
    setAutoSave(originalAutoSave);
    setDataSync(originalDataSync);
    setDirty(false);
    setMessage('');
  };

  const handleAutoSaveChange = (value: boolean) => {
    setAutoSave(value);
    setDirty(value !== originalAutoSave || dataSync !== originalDataSync);
  };

  const handleDataSyncChange = (value: boolean) => {
    setDataSync(value);
    setDirty(autoSave !== originalAutoSave || value !== originalDataSync);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        {/* Enhanced Header */}
        <div className="text-center mb-8 transform transition-all duration-1000">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Privacy & Data
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Control your privacy settings, data preferences, and learning analytics
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Privacy Status Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Privacy Status</h3>
                <p className="text-gray-600">Your current privacy settings</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Data Sync</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    dataSync 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {dataSync ? 'Cloud Enabled' : 'Local Only'}
                  </span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Account Type</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    authState.isAnonymous 
                      ? 'bg-orange-100 text-orange-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {authState.isAnonymous ? 'Guest Account' : 'Registered User'}
                  </span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Auto-save</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    autoSave 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {autoSave ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Data Encryption</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Always Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Controls Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.524-1.783 2.679-1.783 3.203 0l.865 2.623a1 1 0 00.928.688l2.945-.279c1.85-.175 2.31.29 1.415 1.988l-2.096 1.724a1 1 0 00-.342 1.09l.7 2.84c.466 1.896-.946 3.25-2.615 2.768l-2.642-.965a1 1 0 00-1.153 0l-2.642.965c-1.669.482-3.081-.872-2.615-2.768l.7-2.84a1 1 0 00-.342-1.09L4.317 8.42c-.895-1.698-.436-2.163 1.415-1.988l2.945.279a1 1 0 00.928-.688l.865-2.623z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Privacy Controls</h3>
                <p className="text-gray-600">Manage your privacy preferences</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Data Sync Control */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      Cloud Data Sync
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Sync your progress and preferences across devices
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={dataSync}
                      onChange={e => handleDataSyncChange(e.target.checked)}
                      disabled={authState.isAnonymous}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                  </label>
                </div>
                {authState.isAnonymous && (
                  <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded-lg border border-orange-200">
                    ⚠️ Sign up for an account to enable cloud sync
                  </div>
                )}
              </div>

              {/* Auto-save Control */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Auto-save Progress
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Automatically save your learning progress
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={autoSave}
                      onChange={e => handleAutoSaveChange(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>

              {/* Data Export */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-700 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Export Your Data
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Download all your learning data and progress
                    </p>
                  </div>
                  <button 
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    onClick={() => alert('Data export feature coming soon!')}
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {message && (
          <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl animate-fadeIn">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-green-700 font-medium">{message}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {dirty && (
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 animate-fadeIn">
            <button
              onClick={handleSave}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacyPage; 