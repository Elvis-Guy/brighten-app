// ============================================================================
// FILE: app/settings/profile/page.tsx
// Description: Profile settings page (styled, save/cancel, backend integration ready)
// ============================================================================
"use client";
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';

const ProfilePage: React.FC = () => {
  const { authState, userPreferences } = useAppContext();
  const [displayName, setDisplayName] = useState(authState.user?.displayName || '');
  const [originalDisplayName, setOriginalDisplayName] = useState(authState.user?.displayName || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setDisplayName(authState.user?.displayName || '');
    setOriginalDisplayName(authState.user?.displayName || '');
    setDirty(false);
  }, [authState.user?.displayName]);

  const handleSave = () => {
    // TODO: Integrate backend update for display name and password
    setOriginalDisplayName(displayName);
    setPassword('');
    setNewPassword('');
    setDirty(false);
    setMessage('Profile updated! (Backend integration coming soon)');
  };

  const handleCancel = () => {
    setDisplayName(originalDisplayName);
    setPassword('');
    setNewPassword('');
    setDirty(false);
    setMessage('');
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Account Profile</h2>
      <div className="bg-white rounded-xl shadow p-6 space-y-6 border border-blue-100">
        <div className="mb-2"><span className="font-semibold">Email:</span> {authState.user?.email || 'N/A'}</div>
        <div className="mb-2"><span className="font-semibold">Display Name:</span> {originalDisplayName || 'N/A'}</div>
        <div className="mb-2"><span className="font-semibold">Role:</span> {authState.isAdmin ? 'Administrator' : 'Student'}</div>
        <hr className="my-4" />
        <div>
          <label className="block font-semibold mb-1">Change Display Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mb-2"
            value={displayName}
            onChange={e => { setDisplayName(e.target.value); setDirty(true); setMessage(''); }}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Change Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="Current Password"
            value={password}
            onChange={e => { setPassword(e.target.value); setDirty(true); setMessage(''); }}
          />
          <input
            type="password"
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="New Password"
            value={newPassword}
            onChange={e => { setNewPassword(e.target.value); setDirty(true); setMessage(''); }}
          />
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            className={`px-6 py-2 rounded-lg font-semibold shadow ${dirty ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
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
        {message && <div className="text-blue-600 font-semibold mt-2">{message}</div>}
      </div>
    </div>
  );
};

export default ProfilePage; 