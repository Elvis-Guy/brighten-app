// ============================================================================
// FILE: app/content/[lessonId]/page.tsx
// Description: Dynamic page for displaying lesson content.
// ============================================================================
"use client";

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { SpeakerWaveIcon, RefreshIcon } from '@/components/icons';
import { curriculumContent } from '@/data/curriculumData';
import { callGeminiAPI, generateVisualization } from '@/lib/api';
import type { CurriculumSubject } from '@/types';

interface ContentPageProps {
  params: {
    lessonId: string;
  };
}

const ContentPage: React.FC<ContentPageProps> = ({ params }) => {
  const router = useRouter();
  const { lessonId } = params; // Get lessonId from router params
  const { selectedLesson, setSelectedLesson, userPreferences, setLoadingText } = useAppContext();

  // Load lesson data if directly accessing this page or if context is not yet populated
  useEffect(() => {
    if (lessonId && !selectedLesson) {
      const lessonData = curriculumContent[lessonId];
      if (lessonData) {
        setSelectedLesson(lessonData);
      } else {
        console.warn(`Lesson with ID "${lessonId}" not found. Redirecting to home.`);
        router.push('/');
      }
    }
  }, [lessonId, selectedLesson, setSelectedLesson, router]);


  if (!selectedLesson) {
    return (
      <div className="p-6 md:p-10 text-center text-gray-600">
        Loading lesson or lesson not found...
      </div>
    );
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(voice =>
        (userPreferences.voice === 'female' && voice.name.toLowerCase().includes('female')) ||
        (userPreferences.voice === 'male' && voice.name.toLowerCase().includes('male'))
      );
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.rate = userPreferences.speakingRate;
      utterance.lang = userPreferences.language === 'English' ? 'en-US' : 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Text-to-speech not supported in this browser.");
    }
  };

  const handleGenerateSimplifiedText = async () => {
    const simplified = await callGeminiAPI(selectedLesson.content.original, 'text', null, setLoadingText, console.warn);
    if (simplified && typeof simplified === 'string') {
      setSelectedLesson(prev => {
        if (prev) {
          return {
            ...prev,
            content: { ...prev.content, simplified: simplified }
          };
        }
        return null;
      });
    }
  };

  const handleGenerateVisualization = async () => {
    await generateVisualization(selectedLesson.content.visualPrompt, setLoadingText, setSelectedLesson, console.warn);
  };

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{selectedLesson.title}</h2>
      <p className="text-gray-600 mb-8">{selectedLesson.topic} - Lesson {selectedLesson.lessons}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Original Text */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Original Text</h3>
            <button
              onClick={() => speakText(selectedLesson.content.original)}
              className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition duration-200 flex items-center space-x-1"
            >
              <SpeakerWaveIcon className="h-5 w-5" />
              <span className="text-sm hidden sm:inline">Listen</span>
            </button>
          </div>
          <div className="text-gray-700 leading-relaxed max-h-96 overflow-y-auto custom-scrollbar" style={{ fontSize: `${userPreferences.fontSize}px`, lineHeight: userPreferences.fontSize > 18 ? '1.8' : '1.5' }}>
            {selectedLesson.content.original}
          </div>
        </div>

        {/* Simplified Text */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Simplified Text</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => speakText(selectedLesson.content.simplified)}
                className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition duration-200 flex items-center space-x-1"
              >
                <SpeakerWaveIcon className="h-5 w-5" />
                <span className="text-sm hidden sm:inline">Listen</span>
              </button>
              <button
                onClick={handleGenerateSimplifiedText}
                className="p-2 bg-orange-100 rounded-full text-orange-600 hover:bg-orange-200 transition duration-200 flex items-center space-x-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-sm hidden sm:inline">Simplify</span>
              </button>
            </div>
          </div>
          <div className="text-gray-700 leading-relaxed max-h-96 overflow-y-auto custom-scrollbar" style={{ fontSize: `${userPreferences.fontSize}px`, lineHeight: userPreferences.fontSize > 18 ? '1.8' : '1.5' }}>
            {selectedLesson.content.simplified.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-2">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Representation */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Visual Representation</h3>
          <button
            onClick={handleGenerateVisualization}
            className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full flex items-center space-x-2 hover:bg-orange-200 transition duration-200 text-sm font-semibold"
          >
            <RefreshIcon className="h-5 w-5" />
            <span>Generate New Visual</span>
          </button>
        </div>
        <div className="flex justify-center items-center h-80 bg-gray-50 rounded-lg overflow-hidden">
          {selectedLesson.visual ? (
            <img src={selectedLesson.visual} alt="Concept Visualization" className="max-h-full max-w-full object-contain" />
          ) : (
            <img src="https://placehold.co/600x400/E0F7FA/00796B?text=Visual+Representation" alt="Placeholder Visual" className="max-h-full max-w-full object-contain" />
          )}
        </div>
        <p className="text-center text-gray-500 text-sm mt-4">
          {selectedLesson.content.visualPrompt || "AI-generated illustration related to the content."}
        </p>
      </div>
    </div>
  );
};

export default ContentPage;