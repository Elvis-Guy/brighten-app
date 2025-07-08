// ============================================================================
// FILE: app/content/[lessonId]/page.tsx
// Description: Dynamic page for displaying lesson content.
// ============================================================================
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { SpeakerWaveIcon, RefreshIcon, ChevronLeftIcon } from '@/components/icons';
import { curriculumContent } from '@/data/curriculumData';
import curriculumData from '@/curriculum_content.json';
import { callGeminiAPI, generateVisualization } from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import type { CurrentLesson } from '@/types';

interface ContentPageProps {
  params: Promise<{
    lessonId: string;
  }>;
}

const ContentPage: React.FC<ContentPageProps> = ({ params }) => {
  const router = useRouter();
  const [lessonId, setLessonId] = useState<string | null>(null);
  const { selectedLesson, setSelectedLesson, userPreferences, setLoadingText, currentEnrollment, updateLessonProgress, markLessonComplete, learningProgress } = useAppContext();
  
  // Progress tracking states
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [isLessonCompleted, setIsLessonCompleted] = useState<boolean>(false);

  // Handle async params
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setLessonId(resolvedParams.lessonId);
    };
    getParams();
  }, [params]);

  // Load lesson data if directly accessing this page or if context is not yet populated
  useEffect(() => {
    if (lessonId && !selectedLesson) {
      // First try to load from old curriculum content
      const oldLessonData = curriculumContent[lessonId];
      if (oldLessonData) {
        setSelectedLesson(oldLessonData as CurrentLesson);
        return;
      }

      // If not found in old data, try to reconstruct from curriculum JSON
      // Parse lesson ID to extract grade, subject, and topic
      const parts = lessonId.split('_');
      if (parts.length >= 3) {
        const gradeKey = `${parts[0]}_${parts[1]}` as 'grade_10' | 'grade_11' | 'grade_12';
        const subjectKey = parts[2] as 'mathematics' | 'science' | 'english';
        const topicName = parts.slice(3).join('_').replace(/_/g, ' ');

        const subjectData = curriculumData.curriculum[gradeKey]?.[subjectKey];
        if (subjectData) {
          const topic = subjectData.topics.find(t => 
            t.topic.toLowerCase().replace(/\s+/g, '_') === topicName.toLowerCase()
          );
          
          if (topic) {
            const lesson: CurrentLesson = {
              id: lessonId,
              title: subjectData.subject,
              lessons: subjectData.topics.length,
              progress: 0,
              topic: topic.topic,
              description: `${subjectData.subject} - ${topic.topic}`,
              image: `/public/${subjectKey}1.jpeg`,
              content: {
                original: topic.content,
                simplified: topic.content,
                visualPrompt: `Create a visual representation of ${topic.topic} in ${subjectData.subject} for ${subjectData.grade}th grade students.`
              },
              grade: subjectData.grade,
              subjectKey: subjectKey,
              gradeKey: gradeKey
            };
            setSelectedLesson(lesson);
            return;
          }
        }
      }

      console.warn(`Lesson with ID "${lessonId}" not found. Redirecting to curriculum.`);
      router.push('/curriculum');
    }
  }, [lessonId, selectedLesson, setSelectedLesson, router]);

  // Track lesson access and initialize progress
  useEffect(() => {
    if (lessonId && selectedLesson) {
      setSessionStartTime(new Date());
      
      // Check if lesson is already completed
      const existingProgress = learningProgress?.lessonsInProgress[lessonId];
      setIsLessonCompleted(existingProgress?.completed || false);
      
      // Update lesson progress to mark as accessed
      updateLessonProgress(lessonId, {
        progressPercentage: existingProgress?.progressPercentage || 10, // Minimum 10% for just accessing
        currentSection: 'reading'
      });
    }
  }, [lessonId, selectedLesson, updateLessonProgress]);

  // Track time spent when component unmounts or lesson changes
  useEffect(() => {
    return () => {
      if (sessionStartTime && lessonId) {
        const timeSpent = Math.round((new Date().getTime() - sessionStartTime.getTime()) / (1000 * 60)); // Minutes
        updateLessonProgress(lessonId, {
          timeSpentMinutes: (learningProgress?.lessonsInProgress[lessonId]?.timeSpentMinutes || 0) + timeSpent
        });
      }
    };
  }, [sessionStartTime, lessonId, updateLessonProgress, learningProgress]);

  // Auto-save progress every 30 seconds
  useEffect(() => {
    if (!sessionStartTime || !lessonId) return;

    const interval = setInterval(() => {
      const timeSpent = Math.round((new Date().getTime() - sessionStartTime.getTime()) / (1000 * 60));
      const currentProgress = learningProgress?.lessonsInProgress[lessonId]?.progressPercentage || 10;
      
      updateLessonProgress(lessonId, {
        timeSpentMinutes: (learningProgress?.lessonsInProgress[lessonId]?.timeSpentMinutes || 0) + 1, // Add 1 minute for active time
        progressPercentage: Math.max(currentProgress, 25) // Minimum 25% for staying engaged
      });
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [sessionStartTime, lessonId, updateLessonProgress, learningProgress]);

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
      
      // Track progress for listening activity
      if (lessonId) {
        const currentProgress = learningProgress?.lessonsInProgress[lessonId]?.progressPercentage || 10;
        updateLessonProgress(lessonId, {
          progressPercentage: Math.max(currentProgress, 40), // 40% for listening
          currentSection: 'listening'
        });
      }
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
      
      // Track progress for simplification activity
      if (lessonId) {
        const currentProgress = learningProgress?.lessonsInProgress[lessonId]?.progressPercentage || 10;
        updateLessonProgress(lessonId, {
          progressPercentage: Math.max(currentProgress, 60), // 60% for generating simplified text
          currentSection: 'simplification'
        });
      }
    }
  };

  const handleGenerateVisualization = async () => {
    await generateVisualization(selectedLesson.content.visualPrompt, setLoadingText, setSelectedLesson, console.warn);
    
    // Track progress for visualization activity
    if (lessonId) {
      const currentProgress = learningProgress?.lessonsInProgress[lessonId]?.progressPercentage || 10;
      updateLessonProgress(lessonId, {
        progressPercentage: Math.max(currentProgress, 80), // 80% for generating visualization
        currentSection: 'visualization'
      });
    }
  };

  const handleBackToCurriculum = () => {
    router.push('/curriculum');
  };

  const handleMarkComplete = async () => {
    if (lessonId) {
      await markLessonComplete(lessonId);
      setIsLessonCompleted(true);
    }
  };

  // Get current lesson progress data
  const currentLessonProgress = learningProgress?.lessonsInProgress[lessonId || ''];
  const progressPercentage = currentLessonProgress?.progressPercentage || 0;
  const timeSpent = currentLessonProgress?.timeSpentMinutes || 0;

  return (
    <ProtectedRoute>
      <div className="p-6 md:p-10">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToCurriculum}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-2" />
              Back to Curriculum
            </button>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{selectedLesson.title}</h2>
              <p className="text-gray-600">
                {selectedLesson.topic}
                {selectedLesson.grade && ` • Grade ${selectedLesson.grade}`}
                {selectedLesson.lessons && ` • ${selectedLesson.lessons} topics available`}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 mb-8 border border-orange-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Learning Progress</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Progress: {progressPercentage}%</span>
                <span>•</span>
                <span>Time spent: {timeSpent} min</span>
                {currentLessonProgress?.lastAccessedAt && (
                  <>
                    <span>•</span>
                    <span>Last accessed: {new Date(currentLessonProgress.lastAccessedAt).toLocaleDateString()}</span>
                  </>
                )}
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="flex space-x-3">
              {!isLessonCompleted && progressPercentage >= 50 && (
                <button
                  onClick={handleMarkComplete}
                  className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200 font-medium"
                >
                  Mark as Complete
                </button>
              )}
              {isLessonCompleted && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Completed</span>
                </div>
              )}
            </div>
          </div>
        </div>

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
              {selectedLesson.content.original.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-3">{paragraph}</p>
              ))}
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
                <p key={idx} className="mb-3">{paragraph}</p>
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
    </ProtectedRoute>
  );
};

export default ContentPage;