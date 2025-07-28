// ============================================================================
// FILE: app/settings/preferences/page.tsx
// Description: Enhanced Learning Preferences settings page with modern styling
// ============================================================================
"use client";

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';

// Dyslexia-friendly fonts
const dyslexiaFonts = [
  { name: 'OpenDyslexic', css: 'OpenDyslexic, sans-serif' },
  { name: 'Comic Sans MS', css: 'Comic Sans MS, cursive' },
  { name: 'Verdana', css: 'Verdana, sans-serif' },
  { name: 'Tahoma', css: 'Tahoma, sans-serif' },
  { name: 'Century Gothic', css: 'Century Gothic, sans-serif' },
  { name: 'Trebuchet MS', css: 'Trebuchet MS, sans-serif' },
  { name: 'Calibri', css: 'Calibri, sans-serif' },
  { name: 'Arial', css: 'Arial, sans-serif' }
];

const PreferencesPage: React.FC = () => {
  const { userPreferences, setUserPreferences } = useAppContext();
  const [form, setForm] = useState(userPreferences);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setForm(userPreferences);
    setDirty(false);
  }, [userPreferences]);

  const handleChange = (field: keyof typeof form, value: string | number | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setDirty(true);
  };

  const handleSave = () => {
    setUserPreferences(form);
    setDirty(false);
  };

  const handleCancel = () => {
    setForm(userPreferences);
    setDirty(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        {/* Enhanced Header */}
        <div className="text-center mb-8 transform transition-all duration-1000">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Learning Preferences
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Customize your learning experience with dyslexia-friendly options and personalized settings
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Font Settings Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Typography</h3>
                <p className="text-gray-600">Font and text appearance settings</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-semibold mb-3 text-gray-700">
                  Font Family 
                  <span className="ml-2 px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-full">Dyslexia-friendly</span>
                </label>
                <select
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                  value={form.fontFamily.split(',')[0]}
                  onChange={e => handleChange('fontFamily', dyslexiaFonts.find(f => f.name === e.target.value)?.css || e.target.value)}
                >
                  {dyslexiaFonts.map(f => (
                    <option key={f.name} value={f.name}>{f.name}</option>
                  ))}
                </select>
                <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-100" style={{ fontFamily: form.fontFamily }}>
                  <p className="text-gray-700 font-medium">Font Preview:</p>
                  <p className="text-lg text-gray-800 mt-2">The quick brown fox jumps over the lazy dog</p>
                  <p className="text-base text-gray-600 mt-1">ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-3 text-gray-700">Font Size</label>
                  <div className="relative">
                    <input
                      type="range"
                      className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                      min={12}
                      max={32}
                      value={form.fontSize}
                      onChange={e => handleChange('fontSize', Number(e.target.value))}
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>12px</span>
                      <span className="font-semibold text-orange-600">{form.fontSize}px</span>
                      <span>32px</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-3 text-gray-700">Letter Spacing</label>
                  <div className="relative">
                    <input
                      type="range"
                      className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                      min={0}
                      max={10}
                      value={form.letterSpacing}
                      onChange={e => handleChange('letterSpacing', Number(e.target.value))}
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>0px</span>
                      <span className="font-semibold text-orange-600">{form.letterSpacing}px</span>
                      <span>10px</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Audio Settings Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6 10l4-4v12l-4-4H4a1 1 0 01-1-1v-2a1 1 0 011-1h2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Audio Settings</h3>
                <p className="text-gray-600">Voice and reading preferences</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-semibold mb-3 text-gray-700">
                  Voice Selection
                  <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">Text-to-Speech</span>
                </label>
                <select
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  value={form.voice}
                  onChange={e => handleChange('voice', e.target.value)}
                >
                  <option value="Google UK English Female">UK English Female</option>
                  <option value="Google UK English Male">UK English Male</option>
                  <option value="Google US English Female">US English Female</option>
                  <option value="Google US English Male">US English Male</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-3 text-gray-700">Reading Speed</label>
                <div className="relative">
                  <input
                    type="range"
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={form.speechRate}
                    onChange={e => handleChange('speechRate', Number(e.target.value))}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Slow</span>
                    <span className="font-semibold text-blue-600">{form.speechRate}x</span>
                    <span>Fast</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-700">Auto-play Audio</p>
                    <p className="text-sm text-gray-600">Automatically read content aloud</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={form.autoPlay}
                      onChange={e => handleChange('autoPlay', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

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

export default PreferencesPage; 