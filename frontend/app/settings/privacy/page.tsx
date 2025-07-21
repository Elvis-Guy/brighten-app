// ============================================================================
// FILE: app/settings/privacy/page.tsx
// Description: Privacy settings page (styled, save/cancel, backend integration ready)
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
  };

  const handleCancel = () => {
    setAutoSave(originalAutoSave);
    setDataSync(originalDataSync);
    setDirty(false);
    setMessage('');
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Privacy & Data</h2>
      <div className="bg-white rounded-xl shadow p-6 space-y-6 border border-green-100">
        <div className="mb-2"><span className="font-semibold">Data Sync:</span> {dataSync ? 'Cloud enabled' : 'Local only'}</div>
        <div className="mb-2"><span className="font-semibold">Account Type:</span> {authState.isAnonymous ? 'Guest' : 'Registered'}</div>
        <div className="mb-2"><span className="font-semibold">Auto-save:</span> {autoSave ? 'Enabled' : 'Disabled'}</div>
        <hr className="my-4" />
        <div>
          <label className="block font-semibold mb-1">Data Sync</label>
          <button
            className={`px-4 py-2 rounded ${dataSync ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => { setDataSync(v => !v); setDirty(true); setMessage(''); }}
          >
            {dataSync ? 'Disable Cloud Sync' : 'Enable Cloud Sync'}
          </button>
        </div>
        <div>
          <label className="block font-semibold mb-1">Auto-save</label>
          <button
            className={`px-4 py-2 rounded ${autoSave ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => { setAutoSave(v => !v); setDirty(true); setMessage(''); }}
          >
            {autoSave ? 'Disable Auto-save' : 'Enable Auto-save'}
          </button>
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            className={`px-6 py-2 rounded-lg font-semibold shadow ${dirty ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            onClick={handleSave}
            disabled={!dirty}
          >
            Save
          </button>
          <button
            className="px-6 py-2 rounded-lg font-semibold bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={handleCancel}
            disabled={!dirty}
          >
            Cancel
          </button>
        </div>
        {message && <div className="text-green-600 font-semibold mt-2">{message}</div>}
      </div>
    </div>
  );
};

export default PrivacyPage; 