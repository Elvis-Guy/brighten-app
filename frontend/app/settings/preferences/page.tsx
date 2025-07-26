// ============================================================================
// FILE: app/settings/preferences/page.tsx
// Description: Preferences settings page (dyslexia-friendly, save/cancel, preview)
// ============================================================================
"use client";
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';

const dyslexiaFonts = [
  { name: 'OpenDyslexic', css: 'OpenDyslexic, Arial, sans-serif' },
  { name: 'Lexend', css: 'Lexend, Arial, sans-serif' },
  { name: 'Atkinson Hyperlegible', css: 'Atkinson Hyperlegible, Arial, sans-serif' },
  { name: 'Arial', css: 'Arial, sans-serif' },
  { name: 'Verdana', css: 'Verdana, sans-serif' },
  { name: 'Comic Sans MS', css: 'Comic Sans MS, Arial, sans-serif' },
];

const voices = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
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
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-orange-700">Learning Preferences</h2>
      <div className="bg-white rounded-xl shadow p-6 space-y-6 border border-orange-100">
        <div>
          <label className="block font-semibold mb-1">Font Family <span className="text-xs text-gray-400">(Dyslexia-friendly)</span></label>
          <select
            className="w-full border rounded px-3 py-2"
            value={form.fontFamily.split(',')[0]}
            onChange={e => handleChange('fontFamily', dyslexiaFonts.find(f => f.name === e.target.value)?.css || e.target.value)}
          >
            {dyslexiaFonts.map(f => (
              <option key={f.name} value={f.name}>{f.name}</option>
            ))}
          </select>
          <div className="mt-2 p-2 rounded bg-gray-50 border text-gray-700" style={{ fontFamily: form.fontFamily }}>
            Font preview: The quick brown fox jumps over the lazy dog.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Font Size</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              min={12}
              max={32}
              value={form.fontSize}
              onChange={e => handleChange('fontSize', Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Letter Spacing</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              min={0}
              max={10}
              value={form.letterSpacing}
              onChange={e => handleChange('letterSpacing', Number(e.target.value))}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Background Color</label>
            <input
              type="color"
              className="w-16 h-10 border rounded"
              value={form.backgroundColor}
              onChange={e => handleChange('backgroundColor', e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Text Color</label>
            <input
              type="color"
              className="w-16 h-10 border rounded"
              value={form.textColor}
              onChange={e => handleChange('textColor', e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={form.highContrastMode}
            onChange={e => handleChange('highContrastMode', e.target.checked)}
            id="high-contrast"
          />
          <label htmlFor="high-contrast" className="font-semibold">High Contrast Mode</label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Voice</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={form.voice}
              onChange={e => handleChange('voice', e.target.value)}
            >
              {voices.map(v => (
                <option key={v.value} value={v.value}>{v.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Speaking Rate</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              min={0.5}
              max={2}
              step={0.1}
              value={form.speakingRate}
              onChange={e => handleChange('speakingRate', Number(e.target.value))}
            />
          </div>
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            className={`px-6 py-2 rounded-lg font-semibold shadow ${dirty ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
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
      </div>
    </div>
  );
};

export default PreferencesPage; 