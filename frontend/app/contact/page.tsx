// ============================================================================
// FILE: app/contact/page.tsx
// Description: Contact Us page with multiple contact methods and support information
// ============================================================================
"use client";

import React from 'react';
import Link from 'next/link';
import { SunIcon } from '@/components/icons';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <SunIcon className="h-10 w-10 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;re here to help you succeed! Get in touch with our support team for any questions or assistance.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          
          {/* Welcome Message */}
          <div className="border-l-4 border-orange-500 pl-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">We&apos;re Here to Help!</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Whether you&apos;re a student, parent, or teacher, our team is dedicated to supporting your 
              learning journey. Don&apos;t hesitate to reach out – we understand the unique challenges 
              of dyslexia and are here to provide the help you need.
            </p>
          </div>

          {/* Quick Contact */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Get In Touch Quickly</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-orange-50 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-orange-500 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-orange-800">Email Support</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Send us an email and we&apos;ll get back to you within 24 hours.
                </p>
                <a 
                  href="mailto:brightenseducation@gmail.com" 
                  className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-800 font-semibold"
                >
                  <span>brightenseducation@gmail.com</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-green-500 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.134l-1.498.999a1 1 0 00-.472 1.295l.02.02a1 1 0 00.315.606l1.498 1.498a1 1 0 001.295.472l.999-1.498a1 1 0 011.134-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-800">Phone Support</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Call us directly for immediate assistance with urgent issues.
                </p>
                <a 
                  href="tel:+250786571189" 
                  className="inline-flex items-center space-x-2 text-green-600 hover:text-green-800 font-semibold"
                >
                  <span>+250 786 571 189</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Support Hours */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Support Hours</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">📧 Email Support</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Available 24/7</li>
                    <li>• Response within 24 hours</li>
                    <li>• Priority response for urgent issues</li>
                    <li>• Detailed written explanations</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">📞 Phone Support</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Monday - Friday: 8:00 AM - 6:00 PM EAT</li>
                    <li>• Saturday: 9:00 AM - 2:00 PM EAT</li>
                    <li>• Emergency support available</li>
                    <li>• Voicemail checked regularly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* What We Can Help With */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Can Help You</h2>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">🎓 For Students</h3>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Help with account setup and navigation</li>
                      <li>• Understanding how to use features</li>
                      <li>• Technical troubleshooting</li>
                      <li>• Learning strategy suggestions</li>
                      <li>• Progress tracking questions</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">👨‍🏫 For Teachers</h3>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Classroom integration guidance</li>
                      <li>• Student account management</li>
                      <li>• Curriculum alignment support</li>
                      <li>• Professional development requests</li>
                      <li>• Bulk account setup assistance</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">👪 For Parents</h3>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Supporting your child at home</li>
                      <li>• Understanding progress reports</li>
                      <li>• Setting up parental oversight</li>
                      <li>• Connecting with schools</li>
                      <li>• General dyslexia support questions</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">🛠️ Technical Issues</h3>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Login and password problems</li>
                      <li>• Content not loading properly</li>
                      <li>• Audio/video feature issues</li>
                      <li>• Mobile device compatibility</li>
                      <li>• Browser-specific problems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Before You Contact Us */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Before You Contact Us</h2>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                To help us assist you more quickly, you might find answers in these resources:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">📚 Self-Help Resources</h3>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li>
                      <Link href="/help" className="text-orange-600 hover:text-orange-800 font-medium">
                        • Help Center - Step-by-step guides
                      </Link>
                    </li>
                    <li>
                      <Link href="/dyslexia-support" className="text-orange-600 hover:text-orange-800 font-medium">
                        • Dyslexia Support - Learning strategies
                      </Link>
                    </li>
                    <li>
                      <Link href="/teacher-resources" className="text-orange-600 hover:text-orange-800 font-medium">
                        • Teacher Resources - Classroom tools
                      </Link>
                    </li>
                    <li>
                      <Link href="/parent-guide" className="text-orange-600 hover:text-orange-800 font-medium">
                        • Parent Guide - Family support tips
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">🔧 Quick Fixes</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Try refreshing your browser page</li>
                    <li>• Clear your browser cache and cookies</li>
                    <li>• Check your internet connection</li>
                    <li>• Try a different web browser</li>
                    <li>• Restart your device</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Send Us a Message</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Prefer to send us a detailed message? Use the form below and we&apos;ll get back to you soon.
              </p>
              <div className="bg-white p-6 rounded-lg">
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      I am a... <span className="text-red-500">*</span>
                    </label>
                    <select 
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Please select...</option>
                      <option value="student">Student</option>
                      <option value="parent">Parent/Guardian</option>
                      <option value="teacher">Teacher/Educator</option>
                      <option value="administrator">School Administrator</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="What is your message about?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      required
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Please describe your question or issue in detail. Include any error messages or specific problems you're experiencing."
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <input 
                      type="checkbox" 
                      id="privacy-agree"
                      className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="privacy-agree" className="text-sm text-gray-700">
                      I agree to the{" "}
                      <Link href="/privacy" className="text-orange-600 hover:text-orange-800">
                        Privacy Policy
                      </Link>{" "}
                      and consent to my information being used to respond to my inquiry.
                    </label>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full md:w-auto px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Other Ways to Connect */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Other Ways to Connect</h2>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="bg-indigo-500 p-3 rounded-full w-fit mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.136-1.333h2.864v-5h-3.972c-3.122 0-4.728 1.865-4.728 4.667v2.333z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-indigo-800 mb-2">Facebook</h3>
                  <p className="text-gray-700 text-sm">
                    Follow us for updates and community discussions
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="bg-indigo-500 p-3 rounded-full w-fit mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.594 0-6.494 2.902-6.494 6.494 0 .509.058 1.007.173 1.487-5.405-.271-10.196-2.868-13.404-6.817-.559.954-.881 2.072-.881 3.292 0 2.254 1.14 4.248 2.873 5.424-.847-.026-1.649-.26-2.35-.647-.029.761.248 1.479.794 2.05-.756.193-1.479.317-2.13.364.692 1.815 2.844 3.15 5.275 3.471-1.077.294-2.219.452-3.402.452-.264 0-.524-.023-.779-.067 1.378 4.301 5.399 7.425 10.165 7.425 12.13 0 18.781-10.038 18.781-18.781 0-.357-.012-.71-.031-1.056.911-.654 1.7-1.477 2.323-2.41Z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-indigo-800 mb-2">Twitter</h3>
                  <p className="text-gray-700 text-sm">
                    Get quick updates and educational tips
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="bg-indigo-500 p-3 rounded-full w-fit mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.251-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.85s.012-3.583.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.073 4.948.073s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-indigo-800 mb-2">Instagram</h3>
                  <p className="text-gray-700 text-sm">
                    Visual learning tips and success stories
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <div className="flex items-start space-x-3">
              <div className="bg-red-500 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-red-800 mb-2">Emergency or Urgent Issues</h3>
                <p className="text-gray-700 text-sm mb-2">
                  If you&apos;re experiencing a critical issue that prevents you from accessing important 
                  learning materials for an exam or assignment due within 24 hours:
                </p>
                <p className="text-gray-700 text-sm">
                  Call us directly at{" "}
                  <a href="tel:+250786571189" className="text-red-600 hover:text-red-800 font-semibold">
                    +250 786 571 189
                  </a>{" "}
                  and mention &quot;URGENT&quot; in your message.
                </p>
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

export default ContactPage; 