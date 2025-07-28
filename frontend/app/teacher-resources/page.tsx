// ============================================================================
// FILE: app/teacher-resources/page.tsx
// Description: Teacher Resources page for educators supporting dyslexic students
// ============================================================================
"use client";

import React from 'react';
import Link from 'next/link';
import { SunIcon } from '@/components/icons';

const TeacherResourcesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <SunIcon className="h-10 w-10 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-800">Teacher Resources</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tools, strategies, and guidance for supporting dyslexic students in your classroom
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          
          {/* Welcome Message */}
          <div className="border-l-4 border-orange-500 pl-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Supporting Every Student&apos;s Success</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Thank you for your dedication to helping dyslexic students succeed. 
              With the right strategies and understanding, you can create an inclusive classroom 
              where every student feels supported and empowered to learn.
            </p>
          </div>

          {/* Understanding Dyslexia for Teachers */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Understanding Dyslexia in the Classroom</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Key Facts About Dyslexia</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Affects 10-15% of the population</li>
                    <li>• Is neurological, not related to intelligence</li>
                    <li>• Primarily impacts reading, writing, and spelling</li>
                    <li>• Often comes with unique strengths and talents</li>
                    <li>• Requires different teaching approaches, not less learning</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Common Classroom Behaviors</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Avoids reading aloud</li>
                    <li>• Takes longer to complete written work</li>
                    <li>• Strong verbal skills but weak written expression</li>
                    <li>• Difficulty following multi-step instructions</li>
                    <li>• May appear inattentive but is actually struggling</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Classroom Strategies */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Effective Classroom Strategies</h2>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">📚 Reading Support Strategies</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Before Reading:</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Preview vocabulary and concepts</li>
                        <li>• Provide background knowledge</li>
                        <li>• Set clear reading purposes</li>
                        <li>• Use graphic organizers</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">During Reading:</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Allow use of colored overlays</li>
                        <li>• Provide audio versions when possible</li>
                        <li>• Encourage partner reading</li>
                        <li>• Break text into smaller chunks</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">✍️ Writing Support Strategies</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Allow verbal responses or dictation</li>
                    <li>• Provide writing templates and graphic organizers</li>
                    <li>• Focus on content over spelling initially</li>
                    <li>• Offer alternative ways to demonstrate knowledge</li>
                    <li>• Use word banks and sentence starters</li>
                    <li>• Allow use of spell-check and grammar tools</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">🗣️ Instruction Delivery</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Use multi-sensory teaching approaches</li>
                    <li>• Provide clear, step-by-step instructions</li>
                    <li>• Repeat important information</li>
                    <li>• Use visual aids and real-world examples</li>
                    <li>• Allow extra processing time</li>
                    <li>• Check understanding frequently</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Accommodations and Modifications */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Accommodations and Modifications</h2>
            <div className="bg-purple-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                These adjustments can help level the playing field for dyslexic students:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Testing Accommodations</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Extended time (typically 1.5x to 2x)</li>
                    <li>• Separate, quiet testing environment</li>
                    <li>• Text-to-speech for reading passages</li>
                    <li>• Oral responses instead of written</li>
                    <li>• Use of word processor with spell-check</li>
                    <li>• Larger print or different fonts</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Daily Classroom Accommodations</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Preferential seating (front of class)</li>
                    <li>• Written copies of board notes</li>
                    <li>• Audio recordings of lessons</li>
                    <li>• Reduced written homework load</li>
                    <li>• Alternative assignment formats</li>
                    <li>• Use of assistive technology</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Tools */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Helpful Technology Tools</h2>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Reading Support Tools</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Text-to-Speech:</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Microsoft Immersive Reader</li>
                        <li>• Natural Reader</li>
                        <li>• Voice Dream Reader</li>
                        <li>• Read&Write by Texthelp</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Reading Comprehension:</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Snap&Read Universal</li>
                        <li>• ClaroRead</li>
                        <li>• Learning Ally Audiobooks</li>
                        <li>• Bookshare accessible books</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Writing Support Tools</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Speech-to-Text:</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Dragon NaturallySpeaking</li>
                        <li>• Google Voice Typing</li>
                        <li>• Apple Dictation</li>
                        <li>• Microsoft Dictate</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Writing Organization:</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Inspiration/Kidspiration</li>
                        <li>• Draft:Builder</li>
                        <li>• Ginger Grammar Checker</li>
                        <li>• Grammarly</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Creating an Inclusive Environment */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Creating an Inclusive Classroom Environment</h2>
            <div className="bg-orange-50 p-6 rounded-lg">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Building Student Confidence</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Focus on strengths and celebrate progress</li>
                    <li>• Provide private feedback on areas of difficulty</li>
                    <li>• Offer choices in how students demonstrate learning</li>
                    <li>• Create opportunities for peer collaboration</li>
                    <li>• Model growth mindset language</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Classroom Management Tips</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Use visual schedules and clear routines</li>
                    <li>• Provide warning before transitions</li>
                    <li>• Break large tasks into smaller steps</li>
                    <li>• Use timers and visual cues</li>
                    <li>• Offer frequent movement breaks</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Peer Awareness</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Educate class about learning differences</li>
                    <li>• Emphasize that everyone learns differently</li>
                    <li>• Promote acceptance and inclusion</li>
                    <li>• Discourage labeling or negative comments</li>
                    <li>• Celebrate diverse learning styles</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Working with Parents */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Collaborating with Parents and Families</h2>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-indigo-800 mb-2">Communication Strategies</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Share specific examples of student progress</li>
                    <li>• Discuss both challenges and strengths</li>
                    <li>• Provide homework modification suggestions</li>
                    <li>• Recommend resources for home support</li>
                    <li>• Schedule regular check-ins</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-indigo-800 mb-2">Supporting Home Learning</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Suggest dyslexia-friendly homework strategies</li>
                    <li>• Recommend appropriate reading materials</li>
                    <li>• Share technology tools for home use</li>
                    <li>• Provide clear assignment expectations</li>
                    <li>• Offer family literacy activities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Development */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Professional Development Resources</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Training Organizations</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• International Dyslexia Association (IDA)</li>
                    <li>• Orton-Gillingham Academy</li>
                    <li>• Wilson Language Training</li>
                    <li>• Learning Disabilities Association</li>
                    <li>• Council for Exceptional Children</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Recommended Reading</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• &quot;Overcoming Dyslexia&quot; by Sally Shaywitz</li>
                    <li>• &quot;The Dyslexic Advantage&quot; by Brock Eide</li>
                    <li>• &quot;When the Brain Can&apos;t Hear&quot; by Teri Bellis</li>
                    <li>• &quot;Reading, Writing, and Dyslexia&quot; by Paula Tallal</li>
                    <li>• IDA Fact Sheets and Position Papers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Using Brighten in Your Classroom */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Using Brighten in Your Classroom</h2>
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Brighten can be a valuable tool to support your dyslexic students. Here&apos;s how to integrate it effectively:
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Curriculum Integration</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Use simplified content for struggling readers</li>
                    <li>• Assign specific topics that align with your curriculum</li>
                    <li>• Have students upload complex texts for simplification</li>
                    <li>• Use visual aids and diagrams provided</li>
                    <li>• Monitor student progress through the platform</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Classroom Management with Brighten</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Set up class accounts with appropriate grade levels</li>
                    <li>• Create assignments using platform content</li>
                    <li>• Review student work and progress regularly</li>
                    <li>• Use platform data to inform instruction</li>
                    <li>• Collaborate with parents on home access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Support and Contact */}
          <div className="bg-orange-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-orange-800 mb-4">Support for Educators</h2>
            <p className="text-gray-700 mb-4">
              We&apos;re here to support you in creating the best learning environment for your dyslexic students. 
              Don&apos;t hesitate to reach out for assistance or additional resources.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Contact Brighten Support</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Email: <a href="mailto:brightenseducation@gmail.com" className="text-orange-600 hover:text-orange-800">brightenseducation@gmail.com</a></li>
                  <li>• Phone: <a href="tel:+250786571189" className="text-orange-600 hover:text-orange-800">+250 786 571 189</a></li>
                  <li>• Request training sessions for your school</li>
                  <li>• Get help with platform implementation</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Additional Resources</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• <Link href="/help" className="text-orange-600 hover:text-orange-800">Platform Help Center</Link></li>
                  <li>• <Link href="/dyslexia-support" className="text-orange-600 hover:text-orange-800">Dyslexia Support Resources</Link></li>
                  <li>• <Link href="/parent-guide" className="text-orange-600 hover:text-orange-800">Parent Guide</Link></li>
                  <li>• Professional development workshops</li>
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

export default TeacherResourcesPage; 