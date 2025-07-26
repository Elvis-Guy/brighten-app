// ============================================================================
// FILE: components/ui/QuizResults.tsx
// Description: Quiz results display with detailed feedback and analytics
// ============================================================================
"use client";

import React from 'react';
import type { QuizResult } from '@/types';

interface QuizResultsProps {
  result: QuizResult;
  onRetakeQuiz?: () => void;
  onContinueLearning?: () => void;
  onBackToContent?: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  result, 
  onRetakeQuiz, 
  onContinueLearning, 
  onBackToContent 
}) => {
  const { attempt, quiz, correctAnswers, totalQuestions, correctCount, grade } = result;
  const percentage = attempt.score;
  const timeSpentMinutes = Math.round(attempt.timeSpent / 60);
  const passed = attempt.passed;

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-100';
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'C': return 'text-yellow-600 bg-yellow-100';
      case 'D': return 'text-orange-600 bg-orange-100';
      case 'F': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding work! You've mastered this topic.";
    if (percentage >= 80) return "Great job! You have a strong understanding.";
    if (percentage >= 70) return "Good work! You're on the right track.";
    if (percentage >= 60) return "Not bad! Review the material and try again.";
    return "Keep practicing! Don't give up, you'll get there.";
  };

  const getPerformanceIcon = () => {
    if (percentage >= 90) return "🏆";
    if (percentage >= 80) return "🌟";
    if (percentage >= 70) return "👍";
    if (percentage >= 60) return "📚";
    return "💪";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">{getPerformanceIcon()}</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
        <p className="text-lg text-gray-600">{getPerformanceMessage()}</p>
      </div>

      {/* Score Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
          <div className="text-4xl font-bold text-orange-600 mb-2">{percentage}%</div>
          <div className="text-gray-600">Final Score</div>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
          <div className={`text-4xl font-bold mb-2 px-4 py-2 rounded-full ${getGradeColor(grade)}`}>
            {grade}
          </div>
          <div className="text-gray-600">Grade</div>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
          <div className="text-4xl font-bold text-green-600 mb-2">
            {correctCount}/{totalQuestions}
          </div>
          <div className="text-gray-600">Correct Answers</div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="text-center mb-8">
        <span className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${
          passed 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {passed ? '✅ Passed' : '❌ Not Passed'}
          <span className="ml-2 text-sm">
            (Required: {quiz.passingScore}%)
          </span>
        </span>
      </div>

      {/* Quiz Details */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quiz Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Quiz Title:</span>
            <span className="font-medium">{quiz.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time Spent:</span>
            <span className="font-medium">{timeSpentMinutes} minutes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Questions:</span>
            <span className="font-medium">{totalQuestions}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Completed At:</span>
            <span className="font-medium">
              {new Date(attempt.completedAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Question Breakdown */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Review</h3>
        <div className="space-y-4">
          {quiz.questions.map((question, index) => {
            const userAnswer = attempt.answers[index];
            const correctAnswer = correctAnswers[index];
            const isCorrect = userAnswer === correctAnswer;
            
            return (
              <div key={index} className={`p-4 rounded-lg border ${
                isCorrect 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <span className="font-medium text-gray-800">
                    Question {index + 1}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-3 text-sm">{question.question}</p>
                
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className={`p-2 rounded ${
                    userAnswer === correctAnswer 
                      ? 'bg-green-100 text-green-800' 
                      : userAnswer !== -1 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-gray-100 text-gray-600'
                  }`}>
                    <strong>Your Answer:</strong> {
                      userAnswer !== -1 
                        ? `${String.fromCharCode(65 + userAnswer)}. ${question.options[userAnswer]}`
                        : 'No answer selected'
                    }
                  </div>
                  
                  {userAnswer !== correctAnswer && (
                    <div className="p-2 rounded bg-green-100 text-green-800">
                      <strong>Correct Answer:</strong> {String.fromCharCode(65 + correctAnswer)}. {question.options[correctAnswer]}
                    </div>
                  )}
                  
                  {question.explanation && (
                    <div className="p-2 rounded bg-blue-50 text-blue-800">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Study Recommendations */}
      {!passed && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">
            📚 Study Recommendations
          </h3>
          <div className="text-yellow-700 space-y-2 text-sm">
            <p>• Review the topic content again, focusing on areas where you missed questions</p>
            <p>• Use the text-to-speech feature to help reinforce learning</p>
            <p>• Take notes on key concepts and practice explaining them in your own words</p>
            <p>• Try the quiz again when you feel more confident</p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {onBackToContent && (
          <button
            onClick={onBackToContent}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back to Content
          </button>
        )}
        
        {onRetakeQuiz && attempt.score < quiz.passingScore && (
          <button
            onClick={onRetakeQuiz}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Retake Quiz
          </button>
        )}
        
        {onContinueLearning && passed && (
          <button
            onClick={onContinueLearning}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Continue Learning
          </button>
        )}
      </div>

      {/* Encouragement Message */}
      <div className="text-center mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-blue-800 font-medium">
          {passed 
            ? "🎉 Congratulations! You're ready for the next topic." 
            : "💪 Keep learning! Every attempt makes you stronger."
          }
        </p>
      </div>
    </div>
  );
};

export default QuizResults; 