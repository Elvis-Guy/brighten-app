// ============================================================================
// FILE: app/content/[lessonId]/page.tsx
// Description: Dynamic page for displaying lesson content.
// ============================================================================
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { RefreshIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import { curriculumContent } from '@/data/curriculumData';
import curriculumData from '@/curriculum_content.json';
import { callLocalSimplificationAPI, generateVisualizationHF } from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import TextToSpeech from '@/components/ui/TextToSpeech';
import type { CurrentLesson } from '@/types';

interface ContentPageProps {
  params: Promise<{
    lessonId: string;
  }>;
}

const ContentPage: React.FC<ContentPageProps> = ({ params }) => {
  const router = useRouter();
  const [lessonId, setLessonId] = useState<string | null>(null);
  const { selectedLesson, setSelectedLesson, userPreferences, setLoadingText, currentEnrollment, updateLessonProgress, markLessonComplete, learningProgress, setCurrentEnrollment } = useAppContext();
  
  // Progress tracking states
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [isLessonCompleted, setIsLessonCompleted] = useState<boolean>(false);

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

  const navigateToTopic = (targetLessonId: string, targetTopic: any) => {
    const info = getCurrentTopicInfo();
    if (!info) return;
    
    // Update current enrollment
    setCurrentEnrollment({
      grade: info.gradeKey,
      subject: info.subjectKey,
      topic: targetTopic.topic
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
        const timeSpent = Math.round((new Date().getTime() - sessionStartTime.getTime()) / (1000 * 60)); // Minutes
        // Capture current time spent at effect creation time to avoid infinite loops
        const currentTimeSpent = learningProgress?.lessonsInProgress[lessonId]?.timeSpentMinutes || 0;
        updateLessonProgress(lessonId, {
          timeSpentMinutes: currentTimeSpent + timeSpent
        });
      }
    };
  }, [sessionStartTime, lessonId]); // Removed updateLessonProgress and learningProgress from dependencies

  // Auto-save progress every 10 minutes (reduced frequency to prevent quota exhaustion)
  useEffect(() => {
    if (!sessionStartTime || !lessonId) return;

    const interval = setInterval(() => {
      const timeSpent = Math.round((new Date().getTime() - sessionStartTime.getTime()) / (1000 * 60));
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
    const simplified = await callLocalSimplificationAPI(selectedLesson.content.original, setLoadingText, console.warn);
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
    await generateVisualizationHF(selectedLesson.content.visualPrompt, setLoadingText, setSelectedLesson, console.warn);
    
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

  // Function to format text with proper paragraphs and bullet points
  const formatText = (text: string) => {
    if (!text) return [];
    
    // Test with the user's specific example
    const userExample = `Polynomial functions are expressions with variables raised to non-negative integer powers combined through addition, subtraction, and multiplication. The degree of a polynomial determines fundamental characteristics including end behavior, maximum number of turning points, potential number for zeros. Factoring techniques help identify zeroes and their multiplicities, while the remainder theorem and factor theorem help solve problems. Key tools: • Rational root theorem helps identify potential rational zos • Synthetic root: helps find potential zooms and find them • Key concepts: Population growth and economic relationships • Economic relationships: population growth, economic growth • Social relations: social relationships These tools help us understand complex phenomena and understand them.`;
    
    if (text.includes('Key tools:') || text.includes('Polynomial functions')) {
    }
    
    // First, handle inline bullet points by converting them to proper newlines
    let formattedText = text;
    
    // Handle the specific pattern like "Key tools: • Item1 • Item2 • Item3"
    // Replace colon followed by bullet with newline structure
    formattedText = formattedText.replace(/:\s*•\s*/g, ':\n• ');
    
    // Replace remaining inline bullets with newlines
    formattedText = formattedText.replace(/\s+•\s+/g, '\n• ');
    
    // Function to split text into paragraphs after every 3 sentences
    const createParagraphsFromSentences = (text: string) => {
      // Split by sentences (period followed by space or end of string)
      const sentences = text.split(/\.(?:\s+|$)/).filter(sentence => sentence.trim().length > 0);
      
      const paragraphs = [];
      for (let i = 0; i < sentences.length; i += 3) {
        // Take up to 3 sentences for each paragraph
        const paragraphSentences = sentences.slice(i, i + 3);
        const paragraph = paragraphSentences.join('. ').trim();
        if (paragraph) {
          // Add period back if it doesn't end with one
          const finalParagraph = paragraph.endsWith('.') ? paragraph : paragraph + '.';
          paragraphs.push(finalParagraph);
        }
      }
      return paragraphs;
    };

    // Split into paragraphs first (by double newlines)
    const initialParagraphs = formattedText.split(/\n\s*\n/);
    const result: React.ReactElement[] = [];
    
    initialParagraphs.forEach((paragraph, paraIndex) => {
      const lines = paragraph.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check if it's a bullet point (starts with bullet, dash, asterisk, or number)
        if (line.match(/^[•\-*]\s/) || line.match(/^\d+\.\s/)) {
          // It's a bullet point
          const bulletText = line.replace(/^[•\-*]\s*/, '').replace(/^\d+\.\s*/, '');
          result.push(
            <div key={`${paraIndex}-${i}`} className="flex items-start space-x-3 mb-2">
              <span className="mt-1.5 text-orange-500 font-bold text-sm">•</span>
              <span className="flex-1">{bulletText}</span>
            </div>
          );
        } else if (line.trim().length > 0) {
          // Check if this line contains inline bullets that we should split
          if (line.includes('•')) {
            // Split by bullet points and process each part
            const parts = line.split('•').filter(part => part.trim().length > 0);
            
            // First part is regular text - split into 3-sentence paragraphs
            if (parts.length > 0 && parts[0].trim()) {
              const textParagraphs = createParagraphsFromSentences(parts[0].trim());
              textParagraphs.forEach((textPara, textIndex) => {
                result.push(
                  <p key={`${paraIndex}-${i}-main-${textIndex}`} className="mb-4">
                    {textPara}
                  </p>
                );
              });
            }
            
            // Remaining parts are bullet points
            for (let j = 1; j < parts.length; j++) {
              const bulletText = parts[j].trim();
              if (bulletText) {
                result.push(
                  <div key={`${paraIndex}-${i}-bullet-${j}`} className="flex items-start space-x-3 mb-2">
                    <span className="mt-1.5 text-orange-500 font-bold text-sm">•</span>
                    <span className="flex-1">{bulletText}</span>
                  </div>
                );
              }
            }
          } else {
            // Regular paragraph - split into 3-sentence chunks
            const textParagraphs = createParagraphsFromSentences(line);
            textParagraphs.forEach((textPara, textIndex) => {
              result.push(
                <p key={`${paraIndex}-${i}-${textIndex}`} className="mb-4">
                  {textPara}
                </p>
              );
            });
          }
        }
      }
    });
    
    return result;
  };

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
              {formatText(selectedLesson.content.original)}
            </div>
          </div>

          {/* Simplified Text */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Simplified Text</h3>
              <div className="flex space-x-2">
                <TextToSpeech 
                  text={selectedLesson.content.simplified || ''}
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
                formatText(selectedLesson.content.simplified)
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                  <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-lg font-medium mb-2">No simplified text yet</p>
                  <p className="text-sm text-center">Click the "Simplify Text" button above to generate an easier-to-read version of the original text.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visual Representation */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Visual Representation</h3>
            <button
              onClick={handleGenerateVisualization}
              className="px-6 py-2 bg-orange-500 text-white rounded-full flex items-center space-x-2 hover:bg-orange-600 transition duration-200 text-sm font-semibold"
            >
              <RefreshIcon className="h-5 w-5" />
              <span>Generate Visual</span>
            </button>
          </div>
          <div className="flex justify-center items-center h-80 bg-gray-50 rounded-lg overflow-hidden">
            {selectedLesson.visual ? (
              <img src={selectedLesson.visual} alt="Concept Visualization" className="max-h-full max-w-full object-contain" />
            ) : (
              <img src="https://placehold.co/600x400/E0F7FA/00796B?text=Visual+Representation" alt="Placeholder Visual" className="max-h-full max-w-full object-contain" />
            )}
          </div>
          <div className="mt-4">
            <p className="text-center text-gray-500 text-sm">
              {selectedLesson.content.visualPrompt || "AI-generated illustration related to the content."}
            </p>
            
            {/* API Information */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">🎨 AI Image Generation</h4>
              <div className="text-xs text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mt-0.5 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium text-orange-700">Powered by Hugging Face</span>
                    <br />Educational-focused • High contrast for dyslexia support
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                ✨ Images are automatically optimized for learning with simple, clear designs and high contrast colors.
              </p>
            </div>
          </div>
        </div>

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