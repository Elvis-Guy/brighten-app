// ============================================================================
// FILE: components/ui/QuizComponent.tsx
// Description: Interactive quiz component for topic assessment
// ============================================================================
"use client";

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import type { Quiz, QuizAttempt, QuizResult } from '@/types';

interface QuizComponentProps {
  quiz: Quiz;
  onComplete: (result: QuizResult) => void;
  onCancel?: () => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ quiz, onComplete, onCancel }) => {
  const { authState } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(quiz.questions.length).fill(-1));
  const [startTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit ? quiz.timeLimit * 60 : null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft === null) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev !== null && prev > 0) {
          return prev - 1;
        } else {
          // Auto-submit when time runs out
          if (prev === 0) {
            handleSubmit();
          }
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const allQuestionsAnswered = answers.every(answer => answer !== -1);

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateGrade = (percentage: number): string => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    
    // Calculate score
    let correctCount = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;
    const grade = calculateGrade(score);

    // Create quiz attempt
    const attempt: QuizAttempt = {
      id: `attempt_${Date.now()}`,
      quizId: quiz.id,
      userId: authState.user?.uid || 'anonymous',
      answers,
      score,
      timeSpent,
      passed,
      completedAt: endTime.toISOString(),
      startedAt: startTime.toISOString(),
    };

    // Create quiz result
    const result: QuizResult = {
      attempt,
      quiz,
      correctAnswers: quiz.questions.map(q => q.correctAnswer),
      totalQuestions: quiz.questions.length,
      correctCount,
      grade,
    };

    // Store result in localStorage for now (later can sync to Firebase)
    try {
      const existingResults = JSON.parse(localStorage.getItem('brighten_quiz_results') || '[]');
      existingResults.push(result);
      localStorage.setItem('brighten_quiz_results', JSON.stringify(existingResults));
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }

    onComplete(result);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getQuestionColor = (index: number) => {
    if (answers[index] !== -1) return 'bg-green-500';
    if (index === currentQuestionIndex) return 'bg-orange-500';
    return 'bg-gray-300';
  };

  if (showReview) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Review Your Answers</h2>
          <div className="flex justify-center space-x-8 text-sm">
            <span className="text-gray-600">
              Answered: {answers.filter(a => a !== -1).length}/{quiz.questions.length}
            </span>
            {timeLeft !== null && (
              <span className="text-orange-600">
                Time Left: {formatTime(timeLeft)}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {quiz.questions.map((question, index) => (
            <div
              key={index}
              onClick={() => {
                setCurrentQuestionIndex(index);
                setShowReview(false);
              }}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                answers[index] !== -1 
                  ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                  : 'bg-red-50 border-red-200 hover:bg-red-100'
              }`}
            >
              <div className="font-semibold text-sm mb-2">Question {index + 1}</div>
              <div className="text-xs text-gray-600 truncate">{question.question}</div>
              <div className="mt-2">
                {answers[index] !== -1 ? (
                  <span className="text-green-600 text-xs">✓ Answered</span>
                ) : (
                  <span className="text-red-600 text-xs">○ Not answered</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setShowReview(false)}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Continue Quiz
          </button>
          <button
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered || isSubmitting}
            className={`px-6 py-3 rounded-lg transition-colors ${
              allQuestionsAnswered && !isSubmitting
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{quiz.title}</h2>
          <p className="text-gray-600">{quiz.description}</p>
        </div>
        <div className="text-right">
          {timeLeft !== null && (
            <div className={`text-2xl font-bold ${timeLeft < 300 ? 'text-red-500' : 'text-orange-500'}`}>
              {formatTime(timeLeft)}
            </div>
          )}
          <div className="text-sm text-gray-600 mt-1">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm text-gray-600">
            {Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Navigation Dots */}
      <div className="flex justify-center space-x-2 mb-8">
        {quiz.questions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestionIndex(index)}
            className={`w-8 h-8 rounded-full text-white text-sm font-medium transition-colors ${getQuestionColor(index)}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Current Question */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800 flex-1">
            {currentQuestion.question}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ml-4 ${
            currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
            currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {currentQuestion.difficulty}
          </span>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                answers[currentQuestionIndex] === index
                  ? 'border-orange-500 bg-orange-50 text-orange-800'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                  answers[currentQuestionIndex] === index
                    ? 'border-orange-500 bg-orange-500'
                    : 'border-gray-300'
                }`}>
                  {answers[currentQuestionIndex] === index && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-lg transition-colors ${
              currentQuestionIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setShowReview(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Review Answers
          </button>
        </div>

        <div className="flex space-x-4">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
          
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={answers[currentQuestionIndex] === -1 || isSubmitting}
              className={`px-6 py-3 rounded-lg transition-colors ${
                answers[currentQuestionIndex] !== -1 && !isSubmitting
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={answers[currentQuestionIndex] === -1}
              className={`px-6 py-3 rounded-lg transition-colors ${
                answers[currentQuestionIndex] !== -1
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent; 