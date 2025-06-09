// ============================================================================
// FILE: components/ui/PasteTextModal.tsx
// Description: Modal component for pasting text.
// ============================================================================
"use client";

import React from 'react';

interface PasteTextModalProps {
  show: boolean;
  onClose: () => void;
  onPaste: () => void;
  text: string;
  setText: (text: string) => void;
}

const PasteTextModal: React.FC<PasteTextModalProps> = ({ show, onClose, onPaste, text, setText }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Paste Your Text</h3>
        <textarea
          className="w-full h-48 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
          placeholder="Paste your document or paragraph here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onPaste}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition duration-200"
          >
            Paste & Process
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasteTextModal;