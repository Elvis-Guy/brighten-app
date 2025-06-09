// ============================================================================
// FILE: app/settings/page.tsx
// Description: Page for user personalization settings.
// ============================================================================
"use client";

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { TextSizeIcon, PaletteIcon, MicrophoneIcon, PlusIcon, MinusIcon } from '@/components/icons';
import type { UserPreferences } from '@/types';

const SettingsPage: React.FC = () => {
  const { userPreferences, setUserPreferences, userId, loadingText, setLoadingText, db, appId } = useAppContext();

  // Function to save preferences to Firestore
  const savePreferences = async () => {
    if (!userId || !db) {
      console.error("User not authenticated or Firestore not initialized.");
      return;
    }
    setLoadingText('Saving preferences...');
    try {
      const userDocRef = doc(db, `artifacts/${appId}/users/${userId}/preferences/user_settings`);
      await setDoc(userDocRef, userPreferences, { merge: true });
      setLoadingText('Preferences saved!');
      setTimeout(() => setLoadingText(''), 2000);
    } catch (error) {
      console.error("Error saving preferences:", error);
      setLoadingText('Failed to save preferences.');
      setTimeout(() => setLoadingText(''), 2000);
    }
  };

  // Default preferences for reset or initial state (used for high contrast toggle logic)
  const defaultPreferencesForReset: UserPreferences = {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    letterSpacing: 0,
    backgroundColor: '#FFFBEB',
    textColor: '#333333',
    highContrastMode: false,
    voice: 'female',
    speakingRate: 1,
    language: 'English',
  };

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Personalize Your Experience</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Font Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <TextSizeIcon className="h-7 w-7 text-orange-500" />
            <h3 className="text-xl font-semibold text-gray-800">Font Settings</h3>
          </div>
          <div className="mb-6">
            <label htmlFor="fontFamily" className="block text-gray-700 font-medium mb-2">Font Family</label>
            <select
              id="fontFamily"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
              value={userPreferences.fontFamily}
              onChange={(e) => setUserPreferences({ ...userPreferences, fontFamily: e.target.value })}
            >
              <option value="Open Dyslexic, sans-serif">Open Dyslexic (Dyslexia-friendly)</option>
              <option value="Comic Neue, cursive">Comic Neue (Dyslexia-friendly)</option>
              <option value="Arial, sans-serif">Arial</option>
              <option value="Verdana, sans-serif">Verdana</option>
              <option value="Inter, sans-serif">Inter</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="fontSize" className="block text-gray-700 font-medium mb-2">Font Size</label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setUserPreferences(prev => ({ ...prev, fontSize: Math.max(12, prev.fontSize - 1) }))}
                className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition duration-200"
              >
                <MinusIcon className="h-5 w-5" />
              </button>
              <span className="text-lg font-semibold text-gray-800 w-16 text-center">{userPreferences.fontSize}px</span>
              <button
                onClick={() => setUserPreferences(prev => ({ ...prev, fontSize: Math.min(24, prev.fontSize + 1) }))}
                className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition duration-200"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="letterSpacing" className="block text-gray-700 font-medium mb-2">Letter Spacing</label>
            <input
              type="range"
              id="letterSpacing"
              min="0"
              max="2"
              step="0.1"
              value={userPreferences.letterSpacing}
              onChange={(e) => setUserPreferences({ ...userPreferences, letterSpacing: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-orange"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Tight</span>
              <span>Loose</span>
            </div>
          </div>
        </div>

        {/* Color Theme */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <PaletteIcon className="h-7 w-7 text-orange-500" />
            <h3 className="text-xl font-semibold text-gray-800">Color Theme</h3>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Background Color</label>
            <div className="flex space-x-3">
              {['#FFFBEB', '#E0F7FA', '#D1C4E9', '#FEECE2', '#263238'].map(color => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-full border-2 ${userPreferences.backgroundColor === color ? 'border-orange-500' : 'border-gray-300'} transition duration-200`}
                  style={{ backgroundColor: color }}
                  onClick={() => setUserPreferences({ ...userPreferences, backgroundColor: color })}
                  aria-label={`Set background color to ${color}`}
                ></button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="contrast" className="block text-gray-700 font-medium mb-2">Contrast</label>
            <input
              type="range"
              id="contrast"
              min="0.5"
              max="1.5"
              step="0.1"
              value={userPreferences.textColor === '#333333' ? 1 : 0.5} // Simple toggle for demo
              onChange={(e) => setUserPreferences({ ...userPreferences, textColor: parseFloat(e.target.value) > 0.7 ? '#333333' : '#666666' })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-orange"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="highContrastMode"
              checked={userPreferences.highContrastMode}
              onChange={(e) => setUserPreferences({
                ...userPreferences,
                highContrastMode: e.target.checked,
                backgroundColor: e.target.checked ? '#000000' : defaultPreferencesForReset.backgroundColor,
                textColor: e.target.checked ? '#FFFFFF' : defaultPreferencesForReset.textColor,
              })}
              className="h-5 w-5 text-orange-500 rounded border-gray-300 focus:ring-orange-400"
            />
            <label htmlFor="highContrastMode" className="ml-2 text-gray-700 font-medium">High contrast mode</label>
          </div>
        </div>

        {/* Audio Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <MicrophoneIcon className="h-7 w-7 text-orange-500" />
            <h3 className="text-xl font-semibold text-gray-800">Audio Settings</h3>
          </div>
          <div className="mb-6">
            <label htmlFor="voice" className="block text-gray-700 font-medium mb-2">Voice</label>
            <select
              id="voice"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
              value={userPreferences.voice}
              onChange={(e) => setUserPreferences({ ...userPreferences, voice: e.target.value as 'female' | 'male' })}
            >
              <option value="female">Female Voice</option>
              <option value="male">Male Voice</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="speakingRate" className="block text-gray-700 font-medium mb-2">Speaking Rate</label>
            <input
              type="range"
              id="speakingRate"
              min="0.5"
              max="2"
              step="0.1"
              value={userPreferences.speakingRate}
              onChange={(e) => setUserPreferences({ ...userPreferences, speakingRate: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-orange"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Slow</span>
              <span>Fast</span>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="language" className="block text-gray-700 font-medium mb-2">Language</label>
            <select
              id="language"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
              value={userPreferences.language}
              onChange={(e) => setUserPreferences({ ...userPreferences, language: e.target.value })}
            >
              <option value="English">English</option>
              {/* Add other African languages if TTS supports them */}
            </select>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={savePreferences}
          className="px-8 py-4 bg-orange-500 text-white font-bold rounded-full shadow-md hover:bg-orange-600 transition duration-300 text-lg"
        >
          Save Preferences
        </button>
        {loadingText && (
          <p className="mt-4 text-orange-600 text-sm">{loadingText}</p>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;