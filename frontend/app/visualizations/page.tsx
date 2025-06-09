// ============================================================================
// FILE: app/visualizations/page.tsx
// Description: Page for browsing generated visualizations.
// ============================================================================
"use client";

import React from 'react';

const VisualizationsPage: React.FC = () => (
  <div className="p-6 md:p-10">
    <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Visualizations</h2>
    <p className="text-gray-600 mb-6">
      Here you can browse through all the concept illustrations and explanatory drawings generated for your lessons and uploaded texts.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Placeholder for saved visualizations */}
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 flex flex-col items-center justify-center h-64">
        <img src="https://placehold.co/300x200/FEECE2/6B4F4F?text=Water+Cycle+Visual" alt="Water Cycle" className="w-full h-40 object-contain mb-2 rounded" />
        <p className="text-lg font-semibold text-gray-800">Water Cycle Diagram</p>
        <p className="text-sm text-gray-500">From Science Lesson</p>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 flex flex-col items-center justify-center h-64">
        <img src="https://placehold.co/300x200/E0F7FA/00796B?text=Fraction+Visual" alt="Fractions" className="w-full h-40 object-contain mb-2 rounded" />
        <p className="text-lg font-semibold text-gray-800">Fractions Explained</p>
        <p className="text-sm text-gray-500">From Math Lesson</p>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 flex flex-col items-center justify-center h-64">
        <img src="https://placehold.co/300x200/D1C4E9/512DA8?text=Custom+Upload+Visual" alt="Custom Upload" className="w-full h-40 object-contain mb-2 rounded" />
        <p className="text-lg font-semibold text-gray-800">My Custom Text Visual</p>
        <p className="text-sm text-gray-500">From Uploaded Document</p>
      </div>
    </div>
  </div>
);

export default VisualizationsPage;