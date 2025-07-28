// ============================================================================
// FILE: app/page.tsx
// Description: Enhanced Home page of the application with improved visuals and animations.
// ============================================================================
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { BookOpenIcon, CloudUploadIcon } from '@/components/icons';

// Import curriculum data safely  
import curriculumContent from '@/curriculum_content.json';

interface CurriculumTopic {
  topic: string;
  content: string;
}

interface CurriculumSubject {
  grade: number;  // Changed from string to number to match JSON
  subject: string;
  topics: CurriculumTopic[];
}

interface CurriculumData {
  curriculum: {
    [gradeKey: string]: {
      [subjectKey: string]: CurriculumSubject;
    };
  };
}

interface SubjectCard {
  id: string;
  title: string;
  topic: string;
  description: string;
  image: string;
  grade: number;
  lessons: number;
  isCurrentlyLearning: boolean;
  progress?: number;
  currentTopicIndex?: number;
  totalTopics?: number;
  // Add content property to match CurrentLesson interface
  content?: {
    original: string;
    simplified: string;
    visualPrompt: string;
  };
}

const HomePage: React.FC = () => {
  const { authState, currentEnrollment, getContinueLearningData, learningProgress, isProgressLoading, setCurrentEnrollment } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Animation effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const isAuthenticated = authState.isAuthenticated && !authState.isAnonymous;
  const userName = authState.user?.displayName || authState.user?.email?.split('@')[0] || 'Friend';
  const curriculumData = curriculumContent as unknown as CurriculumData;

  // Get Grade 10 subjects for unauthenticated users
  const getGrade10Subjects = (): SubjectCard[] => {
    if (!curriculumData?.curriculum?.grade_10) return [];
    
    const subjects: SubjectCard[] = [];
    const grade10Data = curriculumData.curriculum.grade_10;
    
    for (const [subjectKey, subjectData] of Object.entries(grade10Data)) {
      const data = subjectData as CurriculumSubject;
      const subjectImages = {
        mathematics: '/mathematics1.jpeg',
        science: '/science1.jpeg',
        english: '/english1.jpeg'
      };
      
      subjects.push({
        id: `grade_10_${subjectKey}`,
        title: data.subject,
        topic: data.topics[0]?.topic || 'Introduction',
        description: data.topics[0]?.content?.substring(0, 150) + '...' || 'Learn the fundamentals.',
        image: subjectImages[subjectKey as keyof typeof subjectImages] || '/science1.jpeg',
        grade: 10,
        lessons: data.topics?.length || 0,
        isCurrentlyLearning: false
      });
    }
    
    return subjects;
  };

  // Get recommended subjects for authenticated users (limited to 3)
  const getAllCurriculumSubjects = (): SubjectCard[] => {
    if (!curriculumData?.curriculum) return [];
    
    const subjects: SubjectCard[] = [];
    const subjectImages = {
      mathematics: '/mathematics1.jpeg',
      science: '/science1.jpeg',
      english: '/english1.jpeg'
    };
    
    // Get subjects from all grades
    for (const [gradeKey, gradeData] of Object.entries(curriculumData.curriculum || {})) {
      const gradeNumber = parseInt(gradeKey.replace('grade_', ''));
      
      for (const [subjectKey, subjectData] of Object.entries(gradeData)) {
        const data = subjectData as CurriculumSubject;
        subjects.push({
          id: `${gradeKey}_${subjectKey}`,
          title: data.subject,
          topic: data.topics[0]?.topic || 'Introduction',
          description: data.topics[0]?.content?.substring(0, 150) + '...' || 'Learn the fundamentals.',
          image: subjectImages[subjectKey as keyof typeof subjectImages] || '/science1.jpeg',
          grade: gradeNumber,
          lessons: data.topics?.length || 0,
          isCurrentlyLearning: currentEnrollment?.subject === subjectKey && currentEnrollment?.grade === gradeKey
        });
      }
    }
    
    // Return only the first 3 subjects for recommendations
    return subjects.slice(0, 3);
  };

  // Filter subjects based on search term
  const getFilteredSubjects = (): SubjectCard[] => {
    if (isAuthenticated) {
      // For authenticated users, show all curriculum subjects from all grades
      const allSubjects = getAllCurriculumSubjects();
      return allSubjects.filter(subject =>
        subject.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.topic.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // For unauthenticated users, show Grade 10 subjects
      const grade10Subjects = getGrade10Subjects();
      return grade10Subjects.filter(subject =>
        subject.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.topic.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  const filteredSubjects = getFilteredSubjects();

  const handleContinueLearning = () => {
    try {
      // If we have current enrollment, construct the lessonId and go directly to content
      if (currentEnrollment) {
        const { grade, subject, topic } = currentEnrollment;
        
        // Convert topic to the format used in lessonId (spaces to underscores, lowercase)
        const topicFormatted = topic.toLowerCase().replace(/\s+/g, '_');
        const lessonId = `${grade}_${subject}_${topicFormatted}`;
        const url = `/content/${lessonId}`;
        
        window.location.href = url;
        return;
      }
      
      // If we have continue learning data, use that
      const continueData = getContinueLearningData();
      if (continueData) {
        const url = `/content/${continueData.lessonId}`;
        window.location.href = url;
        return;
      }
      
      // Fallback to curriculum page
      window.location.href = '/curriculum';
    } catch (error) {
      console.error('Error in handleContinueLearning:', error);
      alert(`Error occurred: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleSubjectClick = (subject: SubjectCard) => {
    if (isAuthenticated) {
      // For the currently learning subject, continue learning
      if (subject.isCurrentlyLearning) {
        handleContinueLearning();
      } else {
        // For other subjects, navigate directly to the first topic
        try {
          // Parse the subject ID to get grade and subject info
          const parts = subject.id.split('_');
          if (parts.length >= 3) {
            const gradeKey = `${parts[0]}_${parts[1]}` as 'grade_10' | 'grade_11' | 'grade_12';
            const subjectKey = parts[2] as 'mathematics' | 'science' | 'english';
            
            // Get the subject data from curriculum
            const subjectData = curriculumData.curriculum[gradeKey]?.[subjectKey];
            if (subjectData && subjectData.topics.length > 0) {
              // Get the first topic
              const firstTopic = subjectData.topics[0];
              
              // Set current enrollment
              setCurrentEnrollment({
                grade: gradeKey,
                subject: subjectKey,
                topic: firstTopic.topic
              });
              
              // Construct lessonId for the first topic
              const topicFormatted = firstTopic.topic.toLowerCase().replace(/\s+/g, '_');
              const lessonId = `${gradeKey}_${subjectKey}_${topicFormatted}`;
              const url = `/content/${lessonId}`;
              
              window.location.href = url;
              return;
            }
          }
          
          // Fallback to original behavior if parsing fails
          window.location.href = `/content/${subject.id}`;
        } catch (error) {
          console.error('Error in handleSubjectClick:', error);
          // Fallback to curriculum page on error
          window.location.href = '/curriculum';
        }
      }
    } else {
      // For unauthenticated users, redirect to signup
      window.location.href = '/auth/signup';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        
        {/* Enhanced Welcome Banner */}
        <div className={`bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white p-8 md:p-12 rounded-2xl shadow-2xl mb-8 relative overflow-hidden transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Enhanced decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-400 rounded-full opacity-10 transform translate-x-1/4 translate-y-1/4"></div>
          <div className="absolute top-1/2 right-0 w-32 h-32 bg-orange-400 rounded-full opacity-15 transform translate-x-1/2 -translate-y-1/2 animate-bounce"></div>
          <div className="absolute left-0 top-0 w-40 h-40 bg-white opacity-5 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {isAuthenticated ? `Welcome back, ${userName}!` : 'Welcome to Brighten!'}
                </h1>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                    🚀 AI-Powered Learning
                  </span>
                  <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                    ✨ Dyslexia-Friendly
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              {isAuthenticated 
                ? 'Continue your learning journey with personalized content designed to help you succeed.' 
                : 'Transform your learning experience with AI-powered education tailored for dyslexic learners!'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <>
                  {(getContinueLearningData() || currentEnrollment) ? (
                    <button
                      onClick={handleContinueLearning}
                      className="group flex items-center justify-center px-8 py-4 bg-white text-orange-500 font-bold rounded-full shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 text-lg transform hover:scale-105"
                    >
                      <BookOpenIcon className="h-6 w-6 mr-3 group-hover:animate-pulse" /> 
                      Continue Learning
                    </button>
                  ) : (
                    <Link href="/curriculum" passHref>
                      <button className="group flex items-center justify-center px-8 py-4 bg-white text-orange-500 font-bold rounded-full shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 text-lg transform hover:scale-105">
                        <BookOpenIcon className="h-6 w-6 mr-3 group-hover:animate-pulse" /> Explore Curriculum
                      </button>
                    </Link>
                  )}
                  <Link href="/upload" passHref>
                    <button className="group flex items-center justify-center px-8 py-4 bg-orange-700 text-white font-bold rounded-full shadow-lg hover:bg-orange-800 hover:shadow-xl transition-all duration-300 text-lg border-2 border-orange-700 transform hover:scale-105">
                      <CloudUploadIcon className="h-6 w-6 mr-3 group-hover:animate-bounce" /> Upload New Text
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/signup" passHref>
                    <button className="group flex items-center justify-center px-8 py-4 bg-white text-orange-500 font-bold rounded-full shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 text-lg transform hover:scale-105">
                      <BookOpenIcon className="h-6 w-6 mr-3 group-hover:animate-pulse" /> Get Started Free
                    </button>
                  </Link>
                  <Link href="/auth/signin" passHref>
                    <button className="group flex items-center justify-center px-8 py-4 bg-orange-700 text-white font-bold rounded-full shadow-lg hover:bg-orange-800 hover:shadow-xl transition-all duration-300 text-lg border-2 border-orange-700 transform hover:scale-105">
                      Sign In
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* New: Feature highlights */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 text-white text-opacity-90">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-sm">📚</span>
                </div>
                <span className="text-sm font-medium">Comprehensive Curriculum</span>
              </div>
              <div className="flex items-center space-x-3 text-white text-opacity-90">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-sm">🧠</span>
                </div>
                <span className="text-sm font-medium">AI-Powered Simplification</span>
              </div>
              <div className="flex items-center space-x-3 text-white text-opacity-90">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-sm">👁️</span>
                </div>
                <span className="text-sm font-medium">Visual Learning Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Learning Progress Summary for Authenticated Users */}
        {isAuthenticated && (
          <div className={`bg-gradient-to-br from-white via-orange-50/30 to-blue-50/30 rounded-3xl shadow-2xl p-6 mb-8 border border-orange-200/50 backdrop-blur-sm transform transition-all duration-1000 delay-200 max-w-2xl mx-auto ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Compact Header Section */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Your Learning Progress
              </h2>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">Live Tracking</span>
              </div>
            </div>
            {isProgressLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="relative mb-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200"></div>
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 absolute inset-0"></div>
                  <div className="animate-spin rounded-full h-12 w-12 border-r-4 border-blue-500 absolute inset-0" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                </div>
                <div className="text-center">
                  <h3 className="text-base font-semibold text-gray-700 mb-1">Loading Progress</h3>
                  <p className="text-sm text-gray-500">Gathering insights...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Continue Learning Card */}
                {(getContinueLearningData() || currentEnrollment) && (
                  <div className="group relative">
                    {/* Gradient Border Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-orange-100">
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                            <BookOpenIcon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">Continue Learning</h3>
                            <p className="text-xs text-gray-500">Pick up where you left off</p>
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                      </div>

                      {/* Progress Display */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-600">Progress</span>
                          <span className="text-xl font-bold text-orange-600">
                            {getContinueLearningData()?.progress.progressPercentage || 0}%
                          </span>
                        </div>
                        
                        {/* Enhanced Progress Bar */}
                        <div className="relative">
                          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                            <div 
                              className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden" 
                              style={{ width: `${getContinueLearningData()?.progress.progressPercentage || 0}%` }}
                            >
                              <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                            </div>
                          </div>
                          <div className="absolute -top-1 -right-1">
                            <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                              ✓
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={handleContinueLearning}
                        className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-orange-600 hover:to-orange-700 group"
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <svg className="w-4 h-4 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.676-6.33-1.84C7.614 11.337 9.23 10 12 10s4.386 1.337 6.33 3.16A7.96 7.96 0 0112 15z" />
                          </svg>
                          <span>Resume Learning</span>
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              


                {/* Enhanced Learning Streak */}
                <div className="group relative">
                  {/* Gradient Border Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                     <div className="relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-blue-100">
                                         {/* Card Header */}
                     <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center space-x-2">
                         <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                           <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                             <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                           </svg>
                         </div>
                         <div>
                           <h3 className="text-lg font-bold text-gray-800">Learning Streak</h3>
                           <p className="text-xs text-gray-500">Consistency builds success</p>
                         </div>
                       </div>
                       <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                     </div>

                                         {/* Streak Display */}
                     <div className="text-center">
                       <div className="relative inline-block mb-3">
                         <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                           {learningProgress?.streakDays || 0}
                         </div>
                         <div className="absolute -top-1 -right-1">
                           <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                             <span className="text-white text-sm">🔥</span>
                           </div>
                         </div>
                       </div>
                       <p className="text-gray-600 font-medium text-sm">
                         {(learningProgress?.streakDays || 0) === 1 ? 'Day in a row' : 'Days in a row'}
                       </p>
                       
                       {/* Compact Streak Motivation */}
                       <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-100 mt-3">
                         <p className="text-xs text-blue-700 font-medium text-center">
                           {(learningProgress?.streakDays || 0) >= 7 ? '🎯 Amazing dedication!' : 
                            (learningProgress?.streakDays || 0) >= 3 ? '🎯 Great momentum!' : 
                            '🎯 Keep it up!'}
                         </p>
                       </div>
                     </div>
                  </div>
                </div>

                {/* Compact Motivational Footer */}
                <div className="text-center pt-6 border-t border-gray-200/50 mt-6">
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Active</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                      <span>Tracked</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
                      <span>Aligned</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs">
                    🌟 Building a brighter future
                  </p>
                </div>

              </div>
            )}
          </div>
        )}

        {/* Enhanced Curriculum Section */}
        <div className={`mb-8 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {isAuthenticated 
                  ? (currentEnrollment ? 'Your Learning & Top Recommendations' : 'Top 3 Recommended for You')
                  : 'Grade 10 Curriculum Preview'}
              </h2>
              {isAuthenticated ? (
                <p className="text-gray-600 mt-2">
                  {currentEnrollment 
                    ? 'Continue your current studies and explore these 3 subjects curated for you.'
                    : 'Top 3 hand-picked subjects to get you started. Browse the full curriculum to explore more.'
                  }
                </p>
              ) : (
                <p className="text-gray-600 mt-2">
                  Get a taste of our comprehensive curriculum. Sign up to access all grades and subjects!
                </p>
              )}
            </div>
            
            {/* Enhanced Search Input */}
            <div className="relative group">
              <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-64 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
              />
            </div>
          </div>

          {/* Enhanced Subject Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject: SubjectCard, index: number) => (
              <div 
                key={subject.id} 
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border group cursor-pointer transform hover:scale-105 ${subject.isCurrentlyLearning ? 'border-green-300 ring-2 ring-green-100' : 'border-gray-100'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={subject.image} 
                    alt={subject.title} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/50 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                      {subject.title}
                    </h3>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-medium shadow-lg">
                      {isAuthenticated ? `Grade ${subject.grade}` : 'Grade 10'}
                    </span>
                  </div>
                  {isAuthenticated && (
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-white rounded-full text-sm font-medium shadow-lg ${
                        subject.isCurrentlyLearning 
                          ? 'bg-green-500 animate-pulse' 
                          : 'bg-blue-500'
                      }`}>
                        {subject.isCurrentlyLearning ? 'Currently Learning' : 'Recommended'}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-orange-600 font-semibold text-lg">{subject.topic}</span>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="text-gray-500 text-sm">{subject.lessons} lessons</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {subject.description}
                  </p>
                  
                  {/* Progress Bar for Currently Learning Subject */}
                  {subject.isCurrentlyLearning && (subject.progress || 0) > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Your Progress</span>
                        <span className="text-sm font-medium text-green-600">{subject.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500 shadow-sm" 
                          style={{ width: `${subject.progress || 0}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Topic {(subject.currentTopicIndex || 0) + 1} of {subject.lessons}
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => handleSubjectClick(subject)}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                      subject.isCurrentlyLearning 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    {isAuthenticated 
                      ? (subject.isCurrentlyLearning ? 'Continue Learning' : 'Start Learning')
                      : 'Sign Up to Access'
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredSubjects.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.676-6.33-1.84C7.614 11.337 9.23 10 12 10s4.386 1.337 6.33 3.16A7.96 7.96 0 0112 15z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">
                {searchTerm ? 'No subjects found matching your search.' : 'No curriculum content available.'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
          
          {/* Enhanced Call to Action for Unauthenticated Users */}
          {!isAuthenticated && (
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-orange-100 via-orange-50 to-red-100 rounded-2xl p-8 border border-orange-200 shadow-lg">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Ready to unlock your full potential?
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of students who are improving their learning with our AI-powered platform. 
                  Access all grades, subjects, and personalized content designed specifically for dyslexic learners.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/auth/signup">
                    <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      Start Free Trial
                    </button>
                  </Link>
                  <Link href="/curriculum">
                    <button className="px-8 py-4 border-2 border-orange-500 text-orange-500 font-bold rounded-full hover:bg-orange-50 transition-all duration-300 transform hover:scale-105">
                      Browse Full Curriculum
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
          
          {/* Enhanced Stats Section for Authenticated Users */}
          {isAuthenticated && (
            <div className="mt-8">
              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
                <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  Your Learning Universe
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center transform hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">📚</span>
                    </div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
                    <div className="text-gray-600 font-medium">Grade Levels</div>
                    <div className="text-sm text-gray-500">Grades 10, 11, 12</div>
                  </div>
                  <div className="text-center transform hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div className="text-4xl font-bold text-indigo-600 mb-2">9</div>
                    <div className="text-gray-600 font-medium">Total Subjects</div>
                    <div className="text-sm text-gray-500">Math, Science, English</div>
                  </div>
                  <div className="text-center transform hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🌟</span>
                    </div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">90+</div>
                    <div className="text-gray-600 font-medium">Total Topics</div>
                    <div className="text-sm text-gray-500">Across all subjects</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Want to explore more? Access our complete curriculum library and discover new learning opportunities.
                  </p>
                  <Link href="/curriculum">
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      Browse All Subjects
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Quick Actions for Authenticated Users */}
        {isAuthenticated && (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Link href="/curriculum">
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                  <BookOpenIcon className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">Browse All Subjects</h3>
                <p className="text-gray-600 text-sm">Explore the complete curriculum</p>
              </div>
            </Link>
            
            <Link href="/upload">
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
                  <CloudUploadIcon className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">Upload Text</h3>
                <p className="text-gray-600 text-sm">Simplify your own content</p>
              </div>
            </Link>
            
            <Link href="/visualizations">
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-300">
                  <svg className="h-8 w-8 text-purple-600 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">Visualizations</h3>
                <p className="text-gray-600 text-sm">View learning visuals</p>
              </div>
            </Link>
            
            <Link href="/settings">
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-300">
                  <svg className="h-8 w-8 text-orange-600 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.524-1.783 2.679-1.783 3.203 0l.865 2.623a1 1 0 00.928.688l2.945-.279c1.85-.175 2.31.29 1.415 1.988l-2.096 1.724a1 1 0 00-.342 1.09l.7 2.84c.466 1.896-.946 3.25-2.615 2.768l-2.642-.965a1 1 0 00-1.153 0l-2.642.965c-1.669.482-3.081-.872-2.615-2.768l.7-2.84a1 1 0 00-.342-1.09L4.317 8.42c-.895-1.698-.436-2.163 1.415-1.988l2.945.279a1 1 0 00.928-.688l.865-2.623z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">Settings</h3>
                <p className="text-gray-600 text-sm">Customize your experience</p>
              </div>
            </Link>
          </div>
        )}

        {/* Basic section for unauthenticated users */}
        {!isAuthenticated && (
          <div className={`bg-white rounded-2xl shadow-lg p-6 mb-8 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Get Started with Brighten</h2>
              <p className="text-gray-600 mb-6">Please sign in to access your learning progress and personalized curriculum.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors">
                    Create Account
                  </button>
                </Link>
                <Link href="/auth/signin">
                  <button className="px-6 py-3 border border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-50 transition-colors">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;