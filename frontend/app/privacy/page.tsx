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

          {/* Definitions Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Simple Definitions</h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <p className="text-gray-700 mb-4">
                Let&apos;s explain some important words we use in this policy:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Personal Data</h3>
                  <p className="text-gray-700 text-sm">
                    Information about you, like your name, email, learning progress, or what subjects you study.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">AI-Generated Content</h3>
                  <p className="text-gray-700 text-sm">
                    Learning materials created by our computer AI to be easier for dyslexic students to read.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Cookies</h3>
                  <p className="text-gray-700 text-sm">
                    Small files that help our website remember your preferences and keep you logged in.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Data Processing</h3>
                  <p className="text-gray-700 text-sm">
                    How we collect, store, use, and protect your information to help you learn better.
                  </p>
                </div>
              </div>
            </div>
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
                  <li>• Your grade level and subjects you&apos;re studying</li>
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
                  <li>• Provide content that&apos;s easier to read and understand</li>
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
                    If you&apos;re under 18, your parents or guardians have given permission for you to use Brighten. 
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

          {/* Data Retention */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How Long We Keep Your Information</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                We only keep your information as long as it&apos;s needed to help you learn and follow education laws.
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Learning Records</h3>
                  <p className="text-gray-700 text-sm">
                    We keep your learning progress and account information for up to 3 years after account deletion, 
                    to comply with educational record laws, then permanently delete it.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Uploaded Content</h3>
                  <p className="text-gray-700 text-sm">
                    Text you upload for simplification is processed immediately and deleted within 30 days 
                    unless you save it to your account.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Technical Data</h3>
                  <p className="text-gray-700 text-sm">
                    Website usage logs and error reports are kept for 1 year to improve our service, 
                    then automatically deleted.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Third-Party Services */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Other Services We Work With</h2>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                To provide the best learning experience, we work with trusted technology partners. 
                Here&apos;s who they are and what they do:
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Google Firebase (Data Storage)</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Safely stores your account information and learning progress.
                  </p>
                  <a href="https://firebase.google.com/support/privacy" 
                     className="text-orange-600 hover:text-orange-800 text-sm" 
                     target="_blank" rel="noopener noreferrer">
                    View their privacy policy →
                  </a>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">OpenAI (AI Content Generation)</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Helps create and simplify learning content for dyslexic students.
                  </p>
                  <a href="https://openai.com/privacy" 
                     className="text-orange-600 hover:text-orange-800 text-sm" 
                     target="_blank" rel="noopener noreferrer">
                    View their privacy policy →
                  </a>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Vercel (Website Hosting)</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Hosts our website and ensures it loads quickly for you.
                  </p>
                  <a href="https://vercel.com/legal/privacy-policy" 
                     className="text-orange-600 hover:text-orange-800 text-sm" 
                     target="_blank" rel="noopener noreferrer">
                    View their privacy policy →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Cookies & Tracking */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Cookies and Website Tracking</h2>
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                We use cookies (small data files) to make your experience better. Here&apos;s what we use:
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Essential Cookies (Required)</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Keep you logged in safely</li>
                    <li>• Remember your accessibility preferences</li>
                    <li>• Save your learning progress</li>
                    <li>• Protect against security threats</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">What We Don&apos;t Use</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• No advertising cookies</li>
                    <li>• No social media tracking</li>
                    <li>• No selling data to advertisers</li>
                    <li>• No unnecessary tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* International Data Transfers */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">International Data Protection</h2>
            <div className="bg-purple-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Some of our technology partners store data in different countries to provide you with fast, reliable service.
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">How We Protect Your Data Globally</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• We use Standard Contractual Clauses approved by data protection authorities</li>
                    <li>• All partners must meet strict security and privacy standards</li>
                    <li>• Your data is encrypted when stored or transferred anywhere</li>
                    <li>• We only work with trusted, certified technology providers</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Your Rights Stay the Same</h3>
                  <p className="text-gray-700 text-sm">
                    No matter where your data is processed, you always have the same rights to access, 
                    correct, or delete your information.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Breach Notification */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">If Something Goes Wrong</h2>
            <div className="bg-red-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                We work hard to keep your information safe, but if there&apos;s ever a security problem, 
                here&apos;s what we&apos;ll do:
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Our Promise to You</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• We will notify affected users within 72 hours of discovering any data breach</li>
                    <li>• We&apos;ll explain exactly what happened in simple, clear language</li>
                    <li>• We&apos;ll tell you what information might have been affected</li>
                    <li>• We&apos;ll provide clear steps to protect yourself</li>
                    <li>• We&apos;ll work with authorities to investigate and prevent future issues</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">How We&apos;ll Contact You</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Email notification to your account email address</li>
                    <li>• Notice displayed when you log into your account</li>
                    <li>• Information posted on our website</li>
                    <li>• For students under 18, we&apos;ll also contact parents/guardians</li>
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
                We use artificial intelligence (AI) to help create learning content that&apos;s easier for dyslexic students to understand. 
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
              please don&apos;t hesitate to reach out to us. We&apos;re here to help!
            </p>
                          <div className="space-y-2">
                <p className="text-gray-700"><strong>Contact us:</strong></p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Email: <a href="mailto:brightenseducation@gmail.com" className="text-orange-600 hover:text-orange-800">brightenseducation@gmail.com</a></li>
                  <li>• Phone: <a href="tel:+250786571189" className="text-orange-600 hover:text-orange-800">+250 786 571 189</a></li>
                  <li>• Or ask your teacher or parent to help you contact us</li>
                </ul>
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

export default PrivacyPage; 