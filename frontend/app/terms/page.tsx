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
              We&apos;ve written them in simple, clear language so everyone can understand.
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
                  <li>• Read content that&apos;s adapted for dyslexic learners</li>
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
                  <li>• Follow your school&apos;s guidelines for online learning</li>
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
                Here&apos;s what you should know about this content:
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
                    <li>• If something doesn&apos;t make sense, ask for help</li>
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
                We&apos;re committed to making learning accessible for everyone, especially students with dyslexia.
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

          {/* Intellectual Property */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Who Owns What</h2>
            <div className="bg-purple-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                It&apos;s important to understand who owns the different types of content on Brighten.
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Brighten Content (We Own)</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• All lesson materials, quizzes, and educational content</li>
                    <li>• The website design, code, and technology</li>
                    <li>• Brighten logo, name, and branding</li>
                    <li>• AI-generated content created by our platform</li>
                  </ul>
                  <p className="text-gray-700 text-sm mt-2">
                    © 2025 Brighten Education. All rights reserved.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Your Content (You Own)</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Text and documents you upload for simplification</li>
                    <li>• Your learning notes and progress data</li>
                    <li>• Any original work you create using our tools</li>
                  </ul>
                  <p className="text-gray-700 text-sm mt-2">
                    You keep ownership, but give us permission to process and display it to help you learn.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Termination */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Rules and Consequences</h2>
            <div className="bg-red-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                To keep Brighten safe and educational for everyone, we sometimes need to take action when rules are broken.
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">When Accounts May Be Suspended</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Uploading inappropriate, harmful, or offensive content</li>
                    <li>• Trying to hack, damage, or misuse the platform</li>
                    <li>• Sharing account information with others</li>
                    <li>• Using Brighten for non-educational purposes</li>
                    <li>• Bullying or harassing other users</li>
                    <li>• Repeatedly violating these terms</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Our Process</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• First warning: We&apos;ll explain what went wrong and how to fix it</li>
                    <li>• Temporary suspension: Short break to review the rules</li>
                    <li>• Permanent termination: Only for serious or repeated violations</li>
                    <li>• For students under 18: We&apos;ll contact parents/guardians</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Your Right to Appeal</h3>
                  <p className="text-gray-700 text-sm">
                    If you think we made a mistake, you can contact us at 
                    <a href="mailto:appeals@brighten.edu" className="text-orange-600 hover:text-orange-800 ml-1">
                      appeals@brighten.edu
                    </a> 
                    to explain your side of the story.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Important Legal Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                While we work hard to provide the best learning experience, there are some legal protections 
                we need to explain in simple terms.
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">What This Means for You</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Brighten is a learning tool, not a replacement for teachers or schools</li>
                    <li>• We provide educational content &quot;as is&quot; and work to keep it accurate</li>
                    <li>• Always check important facts with your teacher or other reliable sources</li>
                    <li>• We&apos;re not responsible for your academic grades or test scores</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Our Responsibility Limits</h3>
                  <p className="text-gray-700 text-sm">
                    To the fullest extent permitted by law, Brighten&apos;s liability for any issues 
                    is limited to the amount you paid (if any) in the past 12 months. This means 
                    we focus on fixing problems rather than paying large financial claims.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">What We Will Do</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Fix technical problems as quickly as possible</li>
                    <li>• Correct any educational content errors we find</li>
                    <li>• Provide support and help when you need it</li>
                    <li>• Continuously improve the platform based on feedback</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Governing Law */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Legal Rules and Dispute Resolution</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                If there&apos;s ever a legal disagreement, here&apos;s how it would be handled.
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Which Laws Apply</h3>
                  <p className="text-gray-700 text-sm">
                    These Terms of Service are governed by the laws of Rwanda, where Brighten is based. 
                    This means Rwandan laws help determine what&apos;s fair and legal.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Solving Disagreements</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• First: We&apos;ll try to solve any problems by talking them through</li>
                    <li>• If needed: We&apos;ll use mediation (a neutral person helps us agree)</li>
                    <li>• Last resort: Binding arbitration under Rwanda Commercial Arbitration Rules</li>
                    <li>• For students under 18: Parents/guardians must be involved in any legal process</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Our Preference</h3>
                  <p className="text-gray-700 text-sm">
                    We much prefer to solve problems by talking and working together. 
                    Legal processes are expensive and time-consuming for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Getting Help */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Getting Help and Support</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Learning can be challenging, and we&apos;re here to help you succeed. 
                Don&apos;t hesitate to reach out if you need support.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Ways to Get Help:</h3>
                  <ul className="text-gray-700 space-y-1">
                                    <li>• Email us at <a href="mailto:brightenseducation@gmail.com" className="text-orange-600 hover:text-orange-800">brightenseducation@gmail.com</a></li>
                <li>• Call us at <a href="tel:+250786571189" className="text-orange-600 hover:text-orange-800">+250 786 571 189</a></li>
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
                Sometimes we need to update these terms to make them better, add new features, or follow new laws. 
                When we do, we&apos;ll let you know clearly.
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">How We&apos;ll Tell You About Changes</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Send you an email about important changes at least 30 days before they take effect</li>
                    <li>• Show a clear notice when you log in to your account</li>
                    <li>• Post updates on our website with explanations in simple language</li>
                    <li>• For students under 18: We&apos;ll also notify parents/guardians</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">What Happens After Changes</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• You&apos;ll have 30 days to review the new terms</li>
                    <li>• Continued use of Brighten after changes means you accept the new terms</li>
                    <li>• If you don&apos;t agree with changes, you can close your account</li>
                    <li>• We&apos;ll help you download your learning data before closing your account</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Questions About Changes?</h3>
                  <p className="text-gray-700 text-sm">
                    If you don&apos;t understand any changes, contact us at 
                    <a href="mailto:terms@brighten.edu" className="text-orange-600 hover:text-orange-800 ml-1">
                      terms@brighten.edu
                    </a> 
                    and we&apos;ll explain them in simpler terms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-orange-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-orange-800 mb-4">Questions About These Terms?</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about these terms or need help understanding them, 
              please reach out to us. We&apos;re here to help you learn and succeed!
            </p>
                          <div className="space-y-2">
                <p className="text-gray-700"><strong>Contact us:</strong></p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Email: <a href="mailto:brightenseducation@gmail.com" className="text-orange-600 hover:text-orange-800">brightenseducation@gmail.com</a></li>
                  <li>• Phone: <a href="tel:+250786571189" className="text-orange-600 hover:text-orange-800">+250 786 571 189</a></li>
                  <li>• Ask your teacher or parent to help you understand</li>
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

export default TermsPage; 