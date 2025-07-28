// ============================================================================
// FILE: app/content/[lessonId]/page.tsx
// Description: Dynamic page for displaying lesson content.
// ============================================================================
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import { curriculumContent } from '@/data/curriculumData';
import curriculumData from '@/curriculum_content.json';
import { callSimplificationAPI } from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import TextToSpeech from '@/components/ui/TextToSpeech';
import APIDebugger from '@/components/ui/APIDebugger';
import QuizComponent from '@/components/ui/QuizComponent';
import QuizResults from '@/components/ui/QuizResults';
import { getQuizByTopic } from '@/data/sampleQuizzes';
import type { CurrentLesson, Quiz, QuizResult } from '@/types';

interface ContentPageProps {
  params: Promise<{
    lessonId: string;
  }>;
}

function topicToImageFilename(topic: string) {
  return `/educational_images/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '')}.png`;
}

const ContentPage: React.FC<ContentPageProps> = ({ params }) => {
  const router = useRouter();
  const [lessonId, setLessonId] = useState<string | null>(null);
  const { selectedLesson, setSelectedLesson, userPreferences, setLoadingText, updateLessonProgress, markLessonComplete, learningProgress, setCurrentEnrollment } = useAppContext();
  
  // Progress tracking states
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [isLessonCompleted, setIsLessonCompleted] = useState<boolean>(false);
  
  // Quiz states
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  // Topic navigation logic
  const getCurrentTopicInfo = () => {
    if (!lessonId || !selectedLesson) return null;
    
    const parts = lessonId.split('_');
    if (parts.length >= 3) {
      const gradeKey = `${parts[0]}_${parts[1]}` as 'grade_10' | 'grade_11' | 'grade_12';
      const subjectKey = parts[2] as 'mathematics' | 'science' | 'english';
      const topicName = parts.slice(3).join('_').replace(/_/g, ' ');

      const subjectData = curriculumData.curriculum[gradeKey]?.[subjectKey];
      if (subjectData) {
        const currentTopicIndex = subjectData.topics.findIndex(t => 
          t.topic.toLowerCase().replace(/\s+/g, '_') === topicName.toLowerCase().replace(/\s+/g, '_')
        );
        
        if (currentTopicIndex !== -1) {
          return {
            gradeKey,
            subjectKey,
            subjectData,
            currentTopicIndex,
            currentTopic: subjectData.topics[currentTopicIndex],
            totalTopics: subjectData.topics.length
          };
        }
      }
    }
    return null;
  };

  const getNextTopic = () => {
    const info = getCurrentTopicInfo();
    if (!info) return null;
    
    const nextIndex = info.currentTopicIndex + 1;
    if (nextIndex < info.totalTopics) {
      return {
        topic: info.subjectData.topics[nextIndex],
        index: nextIndex,
        lessonId: `${info.gradeKey}_${info.subjectKey}_${info.subjectData.topics[nextIndex].topic.toLowerCase().replace(/\s+/g, '_')}`
      };
    }
    return null;
  };

  const getPreviousTopic = () => {
    const info = getCurrentTopicInfo();
    if (!info) return null;
    
    const prevIndex = info.currentTopicIndex - 1;
    if (prevIndex >= 0) {
      return {
        topic: info.subjectData.topics[prevIndex],
        index: prevIndex,
        lessonId: `${info.gradeKey}_${info.subjectKey}_${info.subjectData.topics[prevIndex].topic.toLowerCase().replace(/\s+/g, '_')}`
      };
    }
    return null;
  };

  const navigateToTopic = (targetLessonId: string, targetTopic: Record<string, unknown>) => {
    const info = getCurrentTopicInfo();
    if (!info) return;
    
    // Update current enrollment
    setCurrentEnrollment({
      grade: info.gradeKey,
      subject: info.subjectKey,
      topic: targetTopic.topic as string
    });
    
    // Navigate to the new topic
    window.location.href = `/content/${targetLessonId}`;
  };

  const handleNextTopic = () => {
    const nextTopic = getNextTopic();
    if (nextTopic) {
      navigateToTopic(nextTopic.lessonId, nextTopic.topic);
    }
  };

  const handlePreviousTopic = () => {
    const previousTopic = getPreviousTopic();
    if (previousTopic) {
      navigateToTopic(previousTopic.lessonId, previousTopic.topic);
    }
  };

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
        
        // Parse lessonId to set current enrollment for old curriculum data too
        const parts = lessonId.split('_');
        if (parts.length >= 3) {
          const gradeKey = `${parts[0]}_${parts[1]}`;
          const subjectKey = parts[2];
          const topicName = parts.slice(3).join('_').replace(/_/g, ' ');
          
          setCurrentEnrollment({
            grade: gradeKey,
            subject: subjectKey,
            topic: topicName
          });
        }
        
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
            t.topic.toLowerCase().replace(/\s+/g, '_') === topicName.toLowerCase().replace(/\s+/g, '_')
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
                simplified: "",
                visualPrompt: subjectData.subject === 'Mathematics' ? 
                  `${topic.topic} graph` : 
                  subjectData.subject === 'Science' ? 
                  `${topic.topic} diagram` : 
                  `${topic.topic} concept`
              },
              grade: subjectData.grade,
              subjectKey: subjectKey,
              gradeKey: gradeKey
            };
            setSelectedLesson(lesson);
            
            // Set current enrollment to ensure Continue Learning works
            setCurrentEnrollment({
              grade: gradeKey,
              subject: subjectKey,
              topic: topic.topic
            });
            
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
      
      // Check if lesson is already completed (use learningProgress at effect time)
      const existingProgress = learningProgress?.lessonsInProgress[lessonId];
      setIsLessonCompleted(existingProgress?.completed || false);
      
      // Only update progress if not already tracked to avoid spam
      if (!existingProgress || existingProgress.progressPercentage < 10) {
        updateLessonProgress(lessonId, {
          progressPercentage: 10, // Minimum 10% for just accessing
          currentSection: 'reading'
        });
      }
    }
  }, [lessonId, selectedLesson, updateLessonProgress]);

  // Track time spent when component unmounts or lesson changes
  useEffect(() => {
    return () => {
      if (sessionStartTime && lessonId) {
        // const timeSpent = Math.round((new Date().getTime() - sessionStartTime.getTime()) / (1000 * 60)); // Minutes
        // Capture current time spent at effect creation time to avoid infinite loops
        const currentTimeSpent = learningProgress?.lessonsInProgress[lessonId]?.timeSpentMinutes || 0;
        updateLessonProgress(lessonId, {
          timeSpentMinutes: currentTimeSpent + 1 // Add 1 minute as a simple increment
        });
      }
    };
  }, [sessionStartTime, lessonId]); // Removed updateLessonProgress and learningProgress from dependencies

  // Auto-save progress every 10 minutes (reduced frequency to prevent quota exhaustion)
  useEffect(() => {
    if (!sessionStartTime || !lessonId) return;

    const interval = setInterval(() => {
      // const timeSpent = Math.round((new Date().getTime() - sessionStartTime.getTime()) / (1000 * 60));
      // Capture values at interval time, not from state dependencies
      const currentProgressData = learningProgress?.lessonsInProgress[lessonId];
      const currentProgress = currentProgressData?.progressPercentage || 10;
      const currentTimeSpent = currentProgressData?.timeSpentMinutes || 0;
      
      updateLessonProgress(lessonId, {
        timeSpentMinutes: currentTimeSpent + 10, // Add 10 minutes for active time
        progressPercentage: Math.max(currentProgress, 25) // Minimum 25% for staying engaged
      });
    }, 600000); // Every 10 minutes (reduced from 2 minutes)

    return () => clearInterval(interval);
  }, [sessionStartTime, lessonId]); // Removed updateLessonProgress and learningProgress from dependencies

  if (!selectedLesson) {
    return (
      <div className="p-6 md:p-10 text-center text-gray-600">
        Loading lesson or lesson not found...
      </div>
    );
  }



  const handleGenerateSimplifiedText = async () => {
    // Import the smart API caller
    const { callBestAvailableAPI } = await import('@/lib/api');
    
    const simplifiedObj = await callBestAvailableAPI(selectedLesson.content.original, setLoadingText, (message) => {
      console.warn(message);
      // You could show a toast notification here instead of console.warn
    });
    
    if (simplifiedObj && typeof simplifiedObj === 'object') {
      setSelectedLesson(prev => {
        if (prev) {
          return {
            ...prev,
            content: { ...prev.content, simplified: simplifiedObj }
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



  /*
  const handleGenerateVisualization = async () => {
    console.log("🎨 GENERATE VISUAL BUTTON CLICKED!");
    console.log("📝 Visual prompt:", selectedLesson?.content?.visualPrompt);
    console.log("✅ About to call generateVisualizationHF...");
    
    try {
      await generateVisualizationHF(selectedLesson.content.visualPrompt, setLoadingText, setSelectedLesson, console.warn);
      console.log("✅ generateVisualizationHF completed successfully");
    } catch (error) {
      console.error("❌ Error in handleGenerateVisualization:", error);
    }
    
    // Track progress for visualization activity
    if (lessonId) {
      const currentProgress = learningProgress?.lessonsInProgress[lessonId]?.progressPercentage || 10;
      updateLessonProgress(lessonId, {
        progressPercentage: Math.max(currentProgress, 80), // 80% for generating visualization
        currentSection: 'visualization'
      });
    }
  };
  */

  const handleBackToCurriculum = () => {
    router.push('/curriculum');
  };

  const handleMarkComplete = async () => {
    if (lessonId) {
      await markLessonComplete(lessonId);
      setIsLessonCompleted(true);
    }
  };

  // Function to format text with proper paragraphs and bullet points
  const formatText = (text: string) => {
    if (!text) return [];

    // Preprocess for bullet points as before
    let formattedText = text;
    formattedText = formattedText.replace(/:\s*•\s*/g, ':\n• ');
    formattedText = formattedText.replace(/\s+•\s+/g, '\n• ');

    // Split into sentences (period, exclamation, or question mark followed by space or end)
    const sentences = formattedText.match(/[^.!?\n]+[.!?]?/g) || [];

    // Color palette for blocks
    const colors = [
      'bg-orange-50',
      'bg-blue-50',
      'bg-green-50',
      'bg-yellow-50',
      'bg-purple-50',
      'bg-pink-50',
      'bg-teal-50',
    ];

    // Render each sentence as a colored block
    return sentences.map((sentence, idx) => {
      const trimmed = sentence.trim();
      if (!trimmed) return null;
      // Bullet point detection
      if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\.\s/.test(trimmed)) {
        return (
          <div key={idx} className={`flex items-start space-x-3 mb-2 ${colors[idx % colors.length]} rounded-lg px-4 py-2`}>
            <span className="mt-1.5 text-orange-500 font-bold text-sm">•</span>
            <span className="flex-1">{trimmed.replace(/^[•\-*]\s*/, '').replace(/^\d+\.\s*/, '')}</span>
          </div>
        );
      }
      return (
        <div key={idx} className={`mb-2 px-4 py-2 rounded-lg ${colors[idx % colors.length]}`}>
          {trimmed}
        </div>
      );
    });
  };

  // Add a plain formatter for original text
  const formatTextPlain = (text: string) => {
    if (!text) return null;
    // Split by double newlines for paragraphs
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    return paragraphs.map((para, idx) => (
      <p key={idx} className="mb-4">{para.trim()}</p>
    ));
  };

  // Quiz Handler Functions
  const handleStartQuiz = () => {
    const topicInfo = getCurrentTopicInfo();
    if (!topicInfo?.currentTopic) return;

    const quiz = getQuizByTopic(topicInfo.currentTopic.topic);
    if (quiz) {
      setCurrentQuiz(quiz);
      setShowQuiz(true);
      setShowQuizResults(false);
      setQuizResult(null);
    } else {
      alert('No quiz available for this topic yet. Keep learning!');
    }
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setShowQuiz(false);
    setShowQuizResults(true);
    
    // Update lesson progress based on quiz performance
    if (lessonId) {
      const currentProgress = learningProgress?.lessonsInProgress[lessonId]?.progressPercentage || 0;
      const quizBonus = result.attempt.passed ? 20 : 10; // More progress for passing
      updateLessonProgress(lessonId, {
        progressPercentage: Math.min(100, Math.max(currentProgress, 80 + quizBonus)),
        currentSection: 'quiz_completed',
        quizScores: [...(learningProgress?.lessonsInProgress[lessonId]?.quizScores || []), result.attempt.score]
      });
    }
  };

  const handleRetakeQuiz = () => {
    setShowQuizResults(false);
    setQuizResult(null);
    setShowQuiz(true);
  };

  const handleContinueAfterQuiz = () => {
    setShowQuizResults(false);
    // If quiz passed, suggest next topic or mark as complete
    if (quizResult?.attempt.passed) {
      alert('Great job! You can now move to the next topic or continue exploring.');
    }
  };



  /*
  // Helper function to detect bullet points - made more robust
  const isBulletPoint = (line: string) => {
    const trimmed = line.trim();
    // Check for various bullet point patterns
    return /^[-•*]\s/.test(trimmed) || 
           /^\d+\.\s/.test(trimmed) || 
           /^•\s/.test(trimmed) ||
           /^-\s/.test(trimmed) ||
           /^\*\s/.test(trimmed);
  };
  */

  // Get current lesson progress data
  const currentLessonProgress = learningProgress?.lessonsInProgress[lessonId || ''];
  const progressPercentage = currentLessonProgress?.progressPercentage || 0;
  // const timeSpent = currentLessonProgress?.timeSpentMinutes || 0;

  return (
    <ProtectedRoute>
      <div className="p-6 md:p-10">
        {/* Temporary API Debugger - Remove after fixing server */}
        <APIDebugger />
        
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
                {getCurrentTopicInfo() && (
                  <span> • Topic {getCurrentTopicInfo()!.currentTopicIndex + 1} of {getCurrentTopicInfo()!.totalTopics}</span>
                )}
              </p>
            </div>
          </div>
          
          {/* Topic Navigation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePreviousTopic}
              disabled={!getPreviousTopic()}
              className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                getPreviousTopic()
                  ? 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              title={getPreviousTopic() ? `Previous: ${getPreviousTopic()?.topic.topic}` : 'No previous topic'}
            >
              <ChevronLeftIcon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            
            <button
              onClick={handleNextTopic}
              disabled={!getNextTopic()}
              className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                getNextTopic()
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              title={getNextTopic() ? `Next: ${getNextTopic()?.topic.topic}` : 'No next topic'}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRightIcon className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>

        {/* Quiz Section */}
        {currentQuiz && showQuiz && (
          <div className="mb-8">
            <QuizComponent
              quiz={currentQuiz}
              onComplete={handleQuizComplete}
              onCancel={() => setShowQuiz(false)}
            />
          </div>
        )}

        {/* Quiz Results Section */}
        {quizResult && showQuizResults && (
          <div className="mb-8">
            <QuizResults
              result={quizResult}
              onRetakeQuiz={handleRetakeQuiz}
              onContinueLearning={handleContinueAfterQuiz}
              onBackToContent={() => setShowQuizResults(false)}
            />
          </div>
        )}

        {/* Progress Section */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 mb-8 border border-orange-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Learning Progress</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Progress: {progressPercentage}%</span>
                {currentLessonProgress?.lastAccessedAt && (
                  <>
                    <span>•</span>
                    <span>Last accessed: {new Date(currentLessonProgress.lastAccessedAt).toLocaleDateString()}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              {/* Quiz Button */}
              {!showQuiz && !showQuizResults && (
                <button
                  onClick={handleStartQuiz}
                  className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 font-medium"
                >
                  Take Quiz
                </button>
              )}
              
              {!isLessonCompleted && (
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
              <TextToSpeech 
                text={selectedLesson.content.original}
                onStart={() => {
                  // Track progress for listening activity
                  if (lessonId) {
                    const currentProgress = learningProgress?.lessonsInProgress[lessonId]?.progressPercentage || 10;
                    updateLessonProgress(lessonId, {
                      progressPercentage: Math.max(currentProgress, 40),
                      currentSection: 'listening'
                    });
                  }
                }}
              />
            </div>
            <div className="text-gray-700 leading-relaxed max-h-96 overflow-y-auto custom-scrollbar" style={{ fontSize: `${userPreferences.fontSize}px`, lineHeight: userPreferences.fontSize > 18 ? '1.8' : '1.5' }}>
              {formatTextPlain(selectedLesson.content.original)}
            </div>
          </div>

          {/* Simplified Text */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Simplified Text</h3>
              <div className="flex space-x-2">
                <TextToSpeech 
                  text={(() => {
                    const simplifiedObj = selectedLesson.content.simplified;
                    if (typeof simplifiedObj === 'string') {
                      return simplifiedObj;
                    } else if (simplifiedObj && typeof simplifiedObj === 'object') {
                      return (
                        (simplifiedObj as Record<string, unknown>).text ||
                        (simplifiedObj as Record<string, unknown>).simplified ||
                        (simplifiedObj as Record<string, unknown>).simplified_text ||
                        ''
                      ) as string;
                    }
                    return '';
                  })()}
                  disabled={!selectedLesson.content.simplified}
                  onStart={() => {
                    // Track progress for listening to simplified text
                    if (lessonId) {
                      const currentProgress = learningProgress?.lessonsInProgress[lessonId]?.progressPercentage || 10;
                      updateLessonProgress(lessonId, {
                        progressPercentage: Math.max(currentProgress, 50),
                        currentSection: 'simplified-listening'
                      });
                    }
                  }}
                />
                <button
                  onClick={handleGenerateSimplifiedText}
                  className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition duration-200 flex items-center space-x-2 font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Simplify Text</span>
                </button>
              </div>
            </div>
            <div className="text-gray-700 leading-relaxed max-h-96 overflow-y-auto custom-scrollbar" style={{ fontSize: `${userPreferences.fontSize}px`, lineHeight: userPreferences.fontSize > 18 ? '1.8' : '1.5' }}>
              {selectedLesson.content.simplified ? (
                            (() => {
              const simplifiedObj = selectedLesson.content.simplified;
              let simplifiedText = '';
              if (typeof simplifiedObj === 'string') {
                simplifiedText = simplifiedObj;
              } else if (simplifiedObj && typeof simplifiedObj === 'object') {
                simplifiedText = (
                  (simplifiedObj as Record<string, unknown>).text ||
                  (simplifiedObj as Record<string, unknown>).simplified ||
                  (simplifiedObj as Record<string, unknown>).simplified_text ||
                  ''
                ) as string;
              }
              return formatText(simplifiedText);
            })()
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                  <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-lg font-medium mb-2">No simplified text yet</p>
                  <p className="text-sm text-center">Click the &quot;Simplify Text&quot; button above to generate an easier-to-read version of the original text.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visual Representation */}
        {selectedLesson && !(selectedLesson.id.startsWith('uploaded-') || selectedLesson.id.startsWith('pasted-')) && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Visual Representation</h3>
            </div>
            <div className="flex justify-center items-center h-80 bg-gray-50 rounded-lg overflow-hidden">
              {(() => {
                const topicInfo = getCurrentTopicInfo();
                const topicName = topicInfo?.currentTopic?.topic || '';
                const imgSrc = topicToImageFilename(topicName);
                return (
                  <img
                    src={imgSrc}
                    alt={topicName + ' visual representation'}
                    className="max-h-full max-w-full object-contain"
                    onError={e => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/E0F7FA/00796B?text=Visual+Representation';
                    }}
                  />
                );
              })()}
            </div>
            <div className="mt-4">
              <p className="text-center text-gray-500 text-sm">
                Visual representation for this topic.
              </p>
            </div>
          </div>
        )}

        {/* Bottom Topic Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Previous Topic */}
            <div className="flex-1">
              {getPreviousTopic() ? (
                <button
                  onClick={handlePreviousTopic}
                  className="w-full sm:w-auto flex items-center justify-center sm:justify-start px-6 py-4 bg-orange-100 text-orange-600 rounded-xl hover:bg-orange-200 transition-colors group"
                >
                  <ChevronLeftIcon className="h-5 w-5 mr-3 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <div className="text-sm font-medium">Previous Topic</div>
                    <div className="text-lg font-bold">{getPreviousTopic()?.topic.topic}</div>
                  </div>
                </button>
              ) : (
                <div className="flex items-center justify-center sm:justify-start px-6 py-4 bg-gray-50 text-gray-400 rounded-xl">
                  <ChevronLeftIcon className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="text-sm font-medium">Previous Topic</div>
                    <div className="text-lg font-bold">None available</div>
                  </div>
                </div>
              )}
            </div>

            {/* Current Topic Info */}
            <div className="text-center px-4">
              <div className="text-sm text-gray-500 mb-1">Current Progress</div>
              <div className="text-2xl font-bold text-gray-800">
                {getCurrentTopicInfo() ? (
                  `${getCurrentTopicInfo()!.currentTopicIndex + 1} / ${getCurrentTopicInfo()!.totalTopics}`
                ) : '1 / 1'}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {selectedLesson.title}
              </div>
            </div>

            {/* Next Topic */}
            <div className="flex-1 flex justify-end">
              {getNextTopic() ? (
                <button
                  onClick={handleNextTopic}
                  className="w-full sm:w-auto flex items-center justify-center sm:justify-end px-6 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors group"
                >
                  <div className="text-right">
                    <div className="text-sm font-medium">Next Topic</div>
                    <div className="text-lg font-bold">{getNextTopic()?.topic.topic}</div>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <div className="flex items-center justify-center sm:justify-end px-6 py-4 bg-gray-50 text-gray-400 rounded-xl">
                  <div className="text-right">
                    <div className="text-sm font-medium">Next Topic</div>
                    <div className="text-lg font-bold">Course Complete!</div>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 ml-3" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ContentPage;