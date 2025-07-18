// ============================================================================
// FILE: app/terms/page.tsx
// Description: Terms of Service page designed for dyslexic students
// ============================================================================
"use client";

import React from 'react';
import Link from 'next/link';
import { SunIcon } from '@/components/icons';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <SunIcon className="h-10 w-10 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-800">Brighten Terms of Service</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple rules for using our learning platform safely and effectively
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          
          {/* Welcome Message */}
          <div className="border-l-4 border-orange-500 pl-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Brighten!</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              These terms explain how to use Brighten safely and get the most out of your learning experience. 
              We've written them in simple, clear language so everyone can understand.
            </p>
          </div>

          {/* What Brighten Is */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">What Brighten Is For</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Brighten is an educational platform created specifically to help students with dyslexia learn better. 
                We use AI technology to make learning materials easier to read and understand.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-800">Our platform helps you:</h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Study Grade 10, 11, and 12 subjects</li>
                  <li>• Read content that's adapted for dyslexic learners</li>
                  <li>• Upload your own texts to be simplified</li>
                  <li>• Track your learning progress</li>
                  <li>• Access visual aids and learning tools</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Who Can Use Brighten */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Who Can Use Brighten</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Students (Ages 13+)</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Must be 13 years or older to create an account</li>
                  <li>• If under 18, need parent or guardian permission</li>
                  <li>• Should be studying or interested in learning</li>
                  <li>• Can use the platform for educational purposes</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Parents & Teachers</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Can supervise and support student accounts</li>
                  <li>• May request information about student progress</li>
                  <li>• Can contact us with questions or concerns</li>
                  <li>• Help students understand these terms</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How to Use Brighten Properly */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Use Brighten Properly</h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">✅ What You Should Do</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Use the platform for learning and studying</li>
                  <li>• Keep your login information safe and private</li>
                  <li>• Be respectful in any communications</li>
                  <li>• Follow your school's guidelines for online learning</li>
                  <li>• Ask for help when you need it</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">❌ What You Should Not Do</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Share your account with others</li>
                  <li>• Try to hack or damage the platform</li>
                  <li>• Upload inappropriate or harmful content</li>
                  <li>• Use the platform for anything other than learning</li>
                  <li>• Bully or harass other users</li>
                </ul>
              </div>
            </div>
          </div>

          {/* AI and Content */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Understanding AI-Generated Content</h2>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Our AI creates and simplifies learning content to help dyslexic students. 
                Here's what you should know about this content:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-indigo-800 mb-2">AI Content Is:</h3>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Designed to be easier to read and understand</li>
                    <li>• Created to support your learning goals</li>
                    <li>• Constantly being improved based on feedback</li>
                    <li>• Checked for accuracy and appropriateness</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-indigo-800 mb-2">Remember:</h3>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• AI is a tool to help you learn, not replace teachers</li>
                    <li>• Always double-check important facts with other sources</li>
                    <li>• If something doesn't make sense, ask for help</li>
                    <li>• Your teacher or parent can help verify information</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Accessibility Features */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Accessibility and Learning Support</h2>
            <div className="bg-orange-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                We're committed to making learning accessible for everyone, especially students with dyslexia.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-orange-800 mb-2">Available Features:</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Simplified language and shorter sentences</li>
                    <li>• Visual aids and diagrams</li>
                    <li>• Customizable text size and colors</li>
                    <li>• Audio support where available</li>
                    <li>• Progress tracking and achievements</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-orange-800 mb-2">Need More Help?</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Contact our support team anytime</li>
                    <li>• Ask your teacher or parent for assistance</li>
                    <li>• Check our help center for guides</li>
                    <li>• Request specific accessibility features</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Getting Help */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Getting Help and Support</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Learning can be challenging, and we're here to help you succeed. 
                Don't hesitate to reach out if you need support.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Ways to Get Help:</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Email us at <a href="mailto:support@brighten.edu" className="text-orange-600 hover:text-orange-800">support@brighten.edu</a></li>
                    <li>• Call us at <a href="tel:+254123456789" className="text-orange-600 hover:text-orange-800">+254 123 456 789</a></li>
                    <li>• Ask your teacher or parent to contact us</li>
                    <li>• Use the help center on our website</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">We Can Help With:</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Technical problems or login issues</li>
                    <li>• Understanding how to use features</li>
                    <li>• Adjusting accessibility settings</li>
                    <li>• Questions about your learning progress</li>
                    <li>• Feedback about the platform</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Changes to Terms */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to These Terms</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Sometimes we need to update these terms to make them better or add new features. 
                When we do, we'll let you know.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-800">What We'll Do:</h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Send you an email about important changes</li>
                  <li>• Show a notice when you log in</li>
                  <li>• Give you time to review the new terms</li>
                  <li>• Explain what changed in simple language</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-orange-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-orange-800 mb-4">Questions About These Terms?</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about these terms or need help understanding them, 
              please reach out to us. We're here to help you learn and succeed!
            </p>
            <div className="space-y-2">
              <p className="text-gray-700"><strong>Contact us:</strong></p>
              <ul className="text-gray-700 space-y-1">
                <li>• Email: <a href="mailto:support@brighten.edu" className="text-orange-600 hover:text-orange-800">support@brighten.edu</a></li>
                <li>• Phone: <a href="tel:+254123456789" className="text-orange-600 hover:text-orange-800">+254 123 456 789</a></li>
                <li>• Ask your teacher or parent to help you understand</li>
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

export default TermsPage; 