"use client";

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { BookOpenIcon, UserIcon } from '@/components/icons';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authState } = useAppContext();

  // Check if user is authenticated and not anonymous
  const isAuthenticated = authState.isAuthenticated && !authState.isAnonymous;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
            <BookOpenIcon className="h-10 w-10 text-orange-600" />
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Premium Content
          </h2>
          
          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            This content is available to registered users only. Join our community to access comprehensive curriculum content designed for your learning success.
          </p>
          
          {/* Benefits */}
          <div className="text-left mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              What you'll get:
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                Complete curriculum access
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                AI-powered text simplification
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                Visual learning aids
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                Personalized learning experience
              </li>
            </ul>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/auth/signup" className="flex-1">
              <button className="w-full flex items-center justify-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors duration-200 shadow-md hover:shadow-lg">
                <UserIcon className="h-5 w-5 mr-2" />
                Sign Up Free
              </button>
            </Link>
            
            <Link href="/auth/signin" className="flex-1">
              <button className="w-full flex items-center justify-center px-6 py-3 border border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-50 transition-colors duration-200">
                Sign In
              </button>
            </Link>
          </div>
          
          {/* Guest Access Notice */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Browsing as a guest? Some features are limited.{' '}
              <Link href="/" className="text-orange-500 hover:text-orange-600 font-medium">
                Return to home
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute; 