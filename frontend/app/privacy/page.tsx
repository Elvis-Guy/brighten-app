// ============================================================================
// FILE: app/privacy/page.tsx
// Description: Privacy Policy page designed for dyslexic students
// ============================================================================
"use client";

import React from 'react';
import Link from 'next/link';
import { SunIcon } from '@/components/icons';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <SunIcon className="h-10 w-10 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-800">Brighten Privacy Policy</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            How we protect your information while helping you learn better
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          
          {/* Introduction */}
          <div className="border-l-4 border-orange-500 pl-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Promise to You</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              At Brighten, we understand that students with dyslexia need a safe and supportive learning environment. 
              This means protecting your personal information while providing you with the best educational experience possible.
            </p>
          </div>

          {/* What We Collect */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">What Information We Collect</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Learning Information</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Your progress through lessons and topics</li>
                  <li>• How long you spend on each lesson</li>
                  <li>• Which learning methods work best for you</li>
                  <li>• Your reading preferences and accessibility needs</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Account Information</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Your name and email address</li>
                  <li>• Your grade level and subjects you're studying</li>
                  <li>• Your language and accessibility preferences</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">To Help You Learn Better</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Customize lessons for your learning style</li>
                  <li>• Track your progress and celebrate achievements</li>
                  <li>• Suggest topics that match your interests</li>
                  <li>• Provide content that's easier to read and understand</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">To Improve Our Platform</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Make our AI content more dyslexia-friendly</li>
                  <li>• Improve reading tools and accessibility features</li>
                  <li>• Develop better learning materials</li>
                  <li>• Fix bugs and technical issues</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Student & Parent Rights */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Rights as a Student</h2>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">You Can Always:</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Ask to see what information we have about you</li>
                    <li>• Request changes to your personal information</li>
                    <li>• Delete your account and all your data</li>
                    <li>• Ask your parents or teachers to help you understand this policy</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">For Students Under 18:</h3>
                  <p className="text-gray-700">
                    If you're under 18, your parents or guardians have given permission for you to use Brighten. 
                    They can contact us anytime to ask about your information or request changes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Protect Your Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Security Measures</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Encrypted data storage</li>
                    <li>• Secure login systems</li>
                    <li>• Regular security updates</li>
                    <li>• Limited access to your information</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">We Never:</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Sell your information to other companies</li>
                    <li>• Share your learning data without permission</li>
                    <li>• Use your information for advertising</li>
                    <li>• Keep your data longer than necessary</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* AI and Learning */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">AI and Your Learning</h2>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                We use artificial intelligence (AI) to help create learning content that's easier for dyslexic students to understand. 
                This AI looks at how you learn best and creates materials just for you.
              </p>
              <div className="space-y-2">
                <p className="text-gray-700"><strong>What this means:</strong></p>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Lessons are written in simpler, clearer language</li>
                  <li>• Content is broken into smaller, easier chunks</li>
                  <li>• Visual aids and examples are added to help you understand</li>
                  <li>• Reading difficulty is adjusted to match your level</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-orange-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-orange-800 mb-4">Questions or Concerns?</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this privacy policy or how we handle your information, 
              please don't hesitate to reach out to us. We're here to help!
            </p>
            <div className="space-y-2">
              <p className="text-gray-700"><strong>Contact us:</strong></p>
              <ul className="text-gray-700 space-y-1">
                <li>• Email: <a href="mailto:privacy@brighten.edu" className="text-orange-600 hover:text-orange-800">privacy@brighten.edu</a></li>
                <li>• Phone: <a href="tel:+254123456789" className="text-orange-600 hover:text-orange-800">+254 123 456 789</a></li>
                <li>• Or ask your teacher or parent to help you contact us</li>
              </ul>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Last updated: January 2025 • 
              <Link href="/" className="text-orange-600 hover:text-orange-800 ml-1">
                Back to Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage; 