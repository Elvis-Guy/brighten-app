// ============================================================================
// FILE: app/dyslexia-support/page.tsx
// Description: Dyslexia Support resources page designed for dyslexic students
// ============================================================================
"use client";

import React from 'react';
import Link from 'next/link';
import { SunIcon } from '@/components/icons';

const DyslexiaSupportPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <SunIcon className="h-10 w-10 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-800">Dyslexia Support</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Resources, tips, and strategies to help dyslexic learners succeed
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          
          {/* Welcome Message */}
          <div className="border-l-4 border-orange-500 pl-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">You&apos;re Not Alone</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Dyslexia is a learning difference that affects how your brain processes written words. 
              It doesn&apos;t mean you&apos;re not smart – many successful people have dyslexia! 
              With the right support and strategies, you can excel in learning.
            </p>
          </div>

          {/* Understanding Dyslexia */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Understanding Dyslexia</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">What Dyslexia Is</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• A difference in how your brain processes language</li>
                    <li>• Affects reading, writing, and spelling</li>
                    <li>• Has nothing to do with intelligence</li>
                    <li>• Is present from birth – it&apos;s not something you develop</li>
                    <li>• Affects about 1 in 10 people worldwide</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Common Signs</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Difficulty reading fluently</li>
                    <li>• Trouble with spelling</li>
                    <li>• Mixing up similar letters (b/d, p/q)</li>
                    <li>• Difficulty organizing thoughts in writing</li>
                    <li>• Problems with word retrieval</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Strengths of Dyslexic Learners */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Dyslexic Superpowers</h2>
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Dyslexic brains often have amazing strengths! Here are some superpowers many dyslexic people have:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">🎨</div>
                  <h3 className="font-semibold text-green-800 mb-2">Creative Thinking</h3>
                  <p className="text-gray-700 text-sm">
                    Great at thinking outside the box and coming up with innovative solutions
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">🔍</div>
                  <h3 className="font-semibold text-green-800 mb-2">Big Picture Thinking</h3>
                  <p className="text-gray-700 text-sm">
                    Excellent at seeing patterns and understanding how things connect
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">🧩</div>
                  <h3 className="font-semibold text-green-800 mb-2">Problem Solving</h3>
                  <p className="text-gray-700 text-sm">
                    Strong ability to solve complex problems in unique ways
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <h3 className="font-semibold text-green-800 mb-2">3D Thinking</h3>
                  <p className="text-gray-700 text-sm">
                    Great spatial awareness and ability to visualize in three dimensions
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">💪</div>
                  <h3 className="font-semibold text-green-800 mb-2">Resilience</h3>
                  <p className="text-gray-700 text-sm">
                    Strong determination and ability to overcome challenges
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">🗣️</div>
                  <h3 className="font-semibold text-green-800 mb-2">Communication</h3>
                  <p className="text-gray-700 text-sm">
                    Often excellent storytellers and verbal communicators
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Strategies */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Learning Strategies That Work</h2>
            <div className="bg-purple-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                These strategies can help make learning easier and more effective for dyslexic students:
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">📖 Reading Strategies</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Use a ruler or finger to track lines while reading</li>
                    <li>• Read aloud or use text-to-speech software</li>
                    <li>• Take frequent breaks to avoid fatigue</li>
                    <li>• Use colored overlays or change background colors</li>
                    <li>• Preview headings and pictures before reading</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">✍️ Writing Strategies</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Use graphic organizers to plan your writing</li>
                    <li>• Start with voice recordings, then write</li>
                    <li>• Focus on ideas first, spelling and grammar later</li>
                    <li>• Use spell-check and grammar tools</li>
                    <li>• Break writing tasks into smaller steps</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">🧠 Memory Strategies</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Use acronyms and mnemonic devices</li>
                    <li>• Create visual mind maps</li>
                    <li>• Connect new information to what you already know</li>
                    <li>• Use flashcards with pictures and words</li>
                    <li>• Review information multiple times</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Study Tips */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Study Tips for Success</h2>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Creating a Good Study Environment</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Find a quiet, well-lit space</li>
                    <li>• Remove distractions (phone, TV)</li>
                    <li>• Have all materials ready before starting</li>
                    <li>• Use comfortable seating</li>
                    <li>• Play soft background music if it helps</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Time Management</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Break study sessions into 20-30 minute chunks</li>
                    <li>• Take 5-10 minute breaks between sessions</li>
                    <li>• Use timers to stay on track</li>
                    <li>• Study the most difficult subjects when you&apos;re fresh</li>
                    <li>• Create a daily study schedule</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Using Technology</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Text-to-speech software</li>
                    <li>• Speech-to-text for writing</li>
                    <li>• Digital highlighters and note-taking apps</li>
                    <li>• Grammar and spell-check tools</li>
                    <li>• Audio recordings of lessons</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Self-Care</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Get enough sleep (8-9 hours)</li>
                    <li>• Eat regular, healthy meals</li>
                    <li>• Exercise regularly</li>
                    <li>• Practice stress management</li>
                    <li>• Celebrate your achievements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Building Confidence */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Building Confidence</h2>
            <div className="bg-orange-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Having dyslexia can sometimes feel challenging, but remember – you have unique strengths!
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Positive Self-Talk</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-red-600 text-sm font-semibold mb-1">Instead of saying:</p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• &quot;I&apos;m stupid&quot;</li>
                        <li>• &quot;I can&apos;t read&quot;</li>
                        <li>• &quot;I&apos;ll never get this&quot;</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-green-600 text-sm font-semibold mb-1">Try saying:</p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• &quot;My brain works differently&quot;</li>
                        <li>• &quot;I&apos;m learning to read better&quot;</li>
                        <li>• &quot;I&apos;ll find a way that works for me&quot;</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Famous People with Dyslexia</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Many successful people have dyslexia and have achieved amazing things:
                  </p>
                  <div className="grid md:grid-cols-2 gap-2 text-gray-700 text-sm">
                    <div>• Albert Einstein (Scientist)</div>
                    <div>• Steven Spielberg (Film Director)</div>
                    <div>• Richard Branson (Entrepreneur)</div>
                    <div>• Whoopi Goldberg (Actress)</div>
                    <div>• Tim Tebow (Athlete)</div>
                    <div>• Temple Grandin (Animal Scientist)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Getting Support */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Getting the Support You Need</h2>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-indigo-800 mb-2">At School</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Talk to your teachers about your needs</li>
                    <li>• Ask for accommodations (extra time, different formats)</li>
                    <li>• Use the school&apos;s learning support services</li>
                    <li>• Consider working with a reading specialist</li>
                    <li>• Join support groups with other dyslexic students</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-indigo-800 mb-2">At Home</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Create a supportive study environment</li>
                    <li>• Ask family members to be patient and encouraging</li>
                    <li>• Use assistive technology and apps</li>
                    <li>• Read together as a family</li>
                    <li>• Celebrate progress, no matter how small</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-indigo-800 mb-2">Professional Support</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Educational psychologist for assessment</li>
                    <li>• Reading specialist or tutor</li>
                    <li>• Occupational therapist for writing difficulties</li>
                    <li>• Counselor for emotional support</li>
                    <li>• Dyslexia organizations and support groups</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Helpful Resources */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Helpful Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Online Tools & Apps</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Immersive Reader (Microsoft)</li>
                  <li>• Voice Dream Reader</li>
                  <li>• Ginger Grammar Checker</li>
                  <li>• Dragon NaturallySpeaking</li>
                  <li>• Read&Write (texthelp)</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Organizations</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• International Dyslexia Association</li>
                  <li>• Decoding Dyslexia</li>
                  <li>• Learning Disabilities Association</li>
                  <li>• Made by Dyslexia</li>
                  <li>• Local dyslexia support groups</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact for Support */}
          <div className="bg-orange-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-orange-800 mb-4">Need More Support?</h2>
            <p className="text-gray-700 mb-4">
              Remember, asking for help is a sign of strength, not weakness. 
              We&apos;re here to support your learning journey!
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Contact Brighten Support</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Email: <a href="mailto:brightenseducation@gmail.com" className="text-orange-600 hover:text-orange-800">brightenseducation@gmail.com</a></li>
                  <li>• Phone: <a href="tel:+250786571189" className="text-orange-600 hover:text-orange-800">+250 786 571 189</a></li>
                  <li>• We understand dyslexia and are here to help</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Other Brighten Resources</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• <Link href="/help" className="text-orange-600 hover:text-orange-800">Help Center</Link></li>
                  <li>• <Link href="/teacher-resources" className="text-orange-600 hover:text-orange-800">Teacher Resources</Link></li>
                  <li>• <Link href="/parent-guide" className="text-orange-600 hover:text-orange-800">Parent Guide</Link></li>
                  <li>• <Link href="/settings/preferences" className="text-orange-600 hover:text-orange-800">Accessibility Settings</Link></li>
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

export default DyslexiaSupportPage; 