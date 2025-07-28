// ============================================================================
// FILE: app/settings/profile/page.tsx
// Description: Enhanced Account Profile settings page with modern styling
// ============================================================================
"use client";
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';

const ProfilePage: React.FC = () => {
  const { authState } = useAppContext();
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
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCancel = () => {
    setDisplayName(originalDisplayName);
    setPassword('');
    setNewPassword('');
    setDirty(false);
    setMessage('');
  };

  const handleDisplayNameChange = (value: string) => {
    setDisplayName(value);
    setDirty(value !== originalDisplayName || password || newPassword);
  };

  const handlePasswordChange = (field: 'password' | 'newPassword', value: string) => {
    if (field === 'password') {
      setPassword(value);
      setDirty(displayName !== originalDisplayName || value || newPassword);
    } else {
      setNewPassword(value);
      setDirty(displayName !== originalDisplayName || password || value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        {/* Enhanced Header */}
        <div className="text-center mb-8 transform transition-all duration-1000">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Account Profile
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your account details, security settings, and personal information
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Account Information Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Account Information</h3>
                <p className="text-gray-600">Your current account details</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Email Address</span>
                  <span className="text-blue-600 font-medium">{authState.user?.email || 'N/A'}</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Display Name</span>
                  <span className="text-blue-600 font-medium">{originalDisplayName || 'Not Set'}</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Account Role</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    authState.isAdmin 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {authState.isAdmin ? 'Administrator' : 'Student'}
                  </span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Account Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Edit Profile</h3>
                <p className="text-gray-600">Update your personal information</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-semibold mb-3 text-gray-700">
                  Display Name
                  <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Optional</span>
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                  placeholder="Enter your display name"
                  value={displayName}
                  onChange={e => handleDisplayNameChange(e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-2">This name will be visible to other users and instructors</p>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Change Password
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">Current Password</label>
                    <input
                      type="password"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                      placeholder="Enter current password"
                      value={password}
                      onChange={e => handlePasswordChange('password', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">New Password</label>
                    <input
                      type="password"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={e => handlePasswordChange('newPassword', e.target.value)}
                    />
                    <p className="text-sm text-gray-500 mt-2">Password should be at least 8 characters long</p>
                  </div>
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

export default ProfilePage; 