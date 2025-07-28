// ============================================================================
// FILE: app/help/page.tsx
// Description: Help Center page designed for dyslexic students
// ============================================================================
"use client";

import React from 'react';
import Link from 'next/link';
import { SunIcon } from '@/components/icons';

const HelpCenterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <SunIcon className="h-10 w-10 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-800">Help Center</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get help with using Brighten and make the most of your learning experience
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          
          {/* Quick Start Guide */}
          <div className="border-l-4 border-orange-500 pl-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Getting Started</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              New to Brighten? Here&apos;s how to get started and make learning easier and more enjoyable.
            </p>
          </div>

          {/* Account Setup */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Setting Up Your Account</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Creating Your Account</h3>
                  <ol className="text-gray-700 text-sm space-y-1">
                    <li>1. Click &quot;Sign Up&quot; on the home page</li>
                    <li>2. Enter your email and create a password</li>
                    <li>3. Choose your grade level (10, 11, or 12)</li>
                    <li>4. Select your preferred subjects</li>
                    <li>5. Complete your profile setup</li>
                  </ol>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Personalizing Your Experience</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Set your reading preferences</li>
                    <li>• Choose text size and colors</li>
                    <li>• Turn on audio support if needed</li>
                    <li>• Select your learning goals</li>
                    <li>• Customize accessibility settings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Using Curriculum */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Using the Curriculum</h2>
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Our curriculum is designed to be easy to navigate and understand for dyslexic learners.
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Finding Lessons</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Go to the &quot;Curriculum&quot; page from the main menu</li>
                    <li>• Choose your subject (Math, Science, or English)</li>
                    <li>• Pick your grade level</li>
                    <li>• Browse topics or use the search feature</li>
                    <li>• Click on any lesson to start learning</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Reading Lessons</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Content is simplified for easier reading</li>
                    <li>• Use the text-to-speech feature if available</li>
                    <li>• Take breaks when you need them</li>
                    <li>• Review visual aids and diagrams</li>
                    <li>• Complete practice questions at your own pace</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Feature */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload & Simplify Feature</h2>
            <div className="bg-purple-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Have text that&apos;s too difficult to read? Our AI can make it easier to understand.
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">How to Upload Text</h3>
                  <ol className="text-gray-700 text-sm space-y-1">
                    <li>1. Go to the &quot;Upload & Simplify&quot; page</li>
                    <li>2. Copy and paste your text into the box</li>
                    <li>3. Or upload a document file</li>
                    <li>4. Click &quot;Simplify Text&quot;</li>
                    <li>5. Wait for the AI to process your content</li>
                    <li>6. Read the simplified version</li>
                  </ol>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">What Gets Simplified</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Complex sentences become shorter and clearer</li>
                    <li>• Difficult words are replaced with simpler ones</li>
                    <li>• Information is broken into smaller chunks</li>
                    <li>• Key points are highlighted</li>
                    <li>• Visual aids may be suggested</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Common Questions */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">🔑 I forgot my password. What should I do?</h3>
                <p className="text-gray-700 text-sm">
                  Click &quot;Forgot Password&quot; on the sign-in page. Enter your email address, 
                  and we&apos;ll send you instructions to reset your password.
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">📱 Can I use Brighten on my phone or tablet?</h3>
                <p className="text-gray-700 text-sm">
                  Yes! Brighten works on computers, tablets, and smartphones. 
                  Just open your web browser and go to the Brighten website.
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">🎯 How do I track my learning progress?</h3>
                <p className="text-gray-700 text-sm">
                  Your progress is automatically saved as you complete lessons. 
                  Check your dashboard to see which topics you&apos;ve finished and your achievements.
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">🔊 How do I turn on audio support?</h3>
                <p className="text-gray-700 text-sm">
                  Go to Settings → Preferences → Audio Settings. 
                  Turn on &quot;Text-to-Speech&quot; to have content read aloud to you.
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">📚 What if I need help with a specific subject?</h3>
                <p className="text-gray-700 text-sm">
                  Contact your teacher or ask a parent to help. 
                  You can also email us with specific questions about lesson content.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Troubleshooting */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Fixing Technical Problems</h2>
            <div className="bg-red-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Having trouble with the website? Here are some simple solutions to try first.
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Website Not Loading</h3>
                  <ol className="text-gray-700 text-sm space-y-1">
                    <li>1. Check your internet connection</li>
                    <li>2. Refresh the page (press F5 or Ctrl+R)</li>
                    <li>3. Clear your browser cache and cookies</li>
                    <li>4. Try a different web browser</li>
                    <li>5. Restart your device</li>
                  </ol>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Content Not Displaying Correctly</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Update your web browser to the latest version</li>
                    <li>• Disable browser extensions temporarily</li>
                    <li>• Check if JavaScript is enabled</li>
                    <li>• Try using an incognito/private browsing window</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Audio Not Working</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Check your device volume settings</li>
                    <li>• Make sure headphones/speakers are connected</li>
                    <li>• Allow microphone/audio permissions in your browser</li>
                    <li>• Test audio on other websites to check if it&apos;s a device issue</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Getting More Help */}
          <div className="bg-orange-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-orange-800 mb-4">Still Need Help?</h2>
            <p className="text-gray-700 mb-4">
              Can&apos;t find the answer to your question? We&apos;re here to help you succeed!
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Contact Our Support Team</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Email: <a href="mailto:brightenseducation@gmail.com" className="text-orange-600 hover:text-orange-800">brightenseducation@gmail.com</a></li>
                  <li>• Phone: <a href="tel:+250786571189" className="text-orange-600 hover:text-orange-800">+250 786 571 189</a></li>
                  <li>• We typically respond within 24 hours</li>
                  <li>• Include screenshots if you&apos;re having technical issues</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Other Resources</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• <Link href="/dyslexia-support" className="text-orange-600 hover:text-orange-800">Dyslexia Support Resources</Link></li>
                  <li>• <Link href="/teacher-resources" className="text-orange-600 hover:text-orange-800">Teacher Resources</Link></li>
                  <li>• <Link href="/parent-guide" className="text-orange-600 hover:text-orange-800">Parent Guide</Link></li>
                  <li>• Ask your teacher or parent for help</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Last updated: July 2025 • 
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

export default HelpCenterPage; 