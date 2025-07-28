// ============================================================================
// FILE: app/parent-guide/page.tsx
// Description: Parent Guide page for families supporting dyslexic children
// ============================================================================
"use client";

import React from 'react';
import Link from 'next/link';
import { SunIcon } from '@/components/icons';

const ParentGuidePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <SunIcon className="h-10 w-10 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-800">Parent Guide</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive guide for parents supporting their dyslexic children&apos;s learning journey
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          
          {/* Welcome Message */}
          <div className="border-l-4 border-orange-500 pl-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">You&apos;re Your Child&apos;s Best Advocate</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Parenting a child with dyslexia can feel overwhelming at times, but you&apos;re not alone. 
              With understanding, patience, and the right strategies, you can help your child 
              build confidence and achieve academic success. Remember, dyslexia is just a different 
              way of learning – not a limitation.
            </p>
          </div>

          {/* Understanding Your Child */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Understanding Your Dyslexic Child</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">What Your Child Experiences</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Words may appear to move or blur on the page</li>
                    <li>• Reading feels much harder than it should</li>
                    <li>• Writing down thoughts is frustrating</li>
                    <li>• They may feel different from their peers</li>
                    <li>• School tasks take much longer to complete</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Signs to Watch For</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Avoids reading activities</li>
                    <li>• Complaints of headaches during reading</li>
                    <li>• Difficulty with homework organization</li>
                    <li>• Low self-esteem about schoolwork</li>
                    <li>• Excellent verbal skills but poor written work</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Emotional Support */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Providing Emotional Support</h2>
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Your emotional support is crucial for your child&apos;s confidence and self-esteem. 
                Here&apos;s how to help them feel valued and capable:
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Building Confidence</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Focus on their strengths and talents</li>
                    <li>• Celebrate effort, not just results</li>
                    <li>• Remind them that everyone learns differently</li>
                    <li>• Share stories of successful people with dyslexia</li>
                    <li>• Avoid comparisons with siblings or classmates</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Language That Helps</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-red-600 text-sm font-semibold mb-1">Instead of saying:</p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• &quot;Try harder&quot;</li>
                        <li>• &quot;You&apos;re being lazy&quot;</li>
                        <li>• &quot;Just sound it out&quot;</li>
                        <li>• &quot;Everyone else can do it&quot;</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-green-600 text-sm font-semibold mb-1">Try saying:</p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• &quot;Let&apos;s find a different way&quot;</li>
                        <li>• &quot;You&apos;re working really hard&quot;</li>
                        <li>• &quot;Let&apos;s use a strategy&quot;</li>
                        <li>• &quot;Your brain works differently&quot;</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Home Learning Strategies */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Supporting Learning at Home</h2>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">📚 Reading Together</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Read aloud to your child regularly, even if they&apos;re older</li>
                    <li>• Take turns reading paragraphs or pages</li>
                    <li>• Use audiobooks while following along in text</li>
                    <li>• Choose books slightly below their grade level for confidence</li>
                    <li>• Discuss the story to check comprehension</li>
                    <li>• Don&apos;t correct every mistake – focus on meaning</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">✏️ Homework Help</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Create a consistent, quiet study space</li>
                    <li>• Break assignments into smaller chunks</li>
                    <li>• Use timers for focused work sessions</li>
                    <li>• Allow typed assignments when possible</li>
                    <li>• Help with organization and planning</li>
                    <li>• Communicate with teachers about workload</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">🧠 Memory and Organization</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Use visual calendars and color-coding</li>
                    <li>• Create mnemonics and memory tricks together</li>
                    <li>• Practice routines until they become automatic</li>
                    <li>• Use checklists for daily tasks</li>
                    <li>• Teach your child to ask for help when needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Technology and Tools */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Helpful Technology and Tools</h2>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Technology can be a game-changer for dyslexic children. Here are some tools that can help:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Reading Support</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• <strong>Voice Dream Reader:</strong> High-quality text-to-speech</li>
                    <li>• <strong>Learning Ally:</strong> Human-narrated audiobooks</li>
                    <li>• <strong>Immersive Reader:</strong> Built into Microsoft products</li>
                    <li>• <strong>ClaroRead:</strong> Reading and study support</li>
                    <li>• <strong>BeeLine Reader:</strong> Color gradients for easier reading</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Writing Support</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• <strong>Dragon NaturallySpeaking:</strong> Speech-to-text software</li>
                    <li>• <strong>Grammarly:</strong> Grammar and spell checking</li>
                    <li>• <strong>Google Docs Voice Typing:</strong> Free dictation tool</li>
                    <li>• <strong>WordQ:</strong> Word prediction and speech feedback</li>
                    <li>• <strong>Draft:Builder:</strong> Essay writing support</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Organization</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• <strong>Google Calendar:</strong> Visual scheduling</li>
                    <li>• <strong>Todoist:</strong> Task management</li>
                    <li>• <strong>Forest:</strong> Focus and time management</li>
                    <li>• <strong>MindMeister:</strong> Mind mapping</li>
                    <li>• <strong>Evernote:</strong> Note organization</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Math Support</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• <strong>ModMath:</strong> Graph paper on devices</li>
                    <li>• <strong>Photomath:</strong> Step-by-step math solutions</li>
                    <li>• <strong>Khan Academy:</strong> Free math tutorials</li>
                    <li>• <strong>Number Pieces:</strong> Visual math manipulatives</li>
                    <li>• <strong>Calculator apps:</strong> For complex calculations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Working with School */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Advocating at School</h2>
            <div className="bg-orange-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                You are your child&apos;s best advocate. Here&apos;s how to work effectively with your child&apos;s school:
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Building Relationships</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Introduce yourself to teachers at the beginning of the year</li>
                    <li>• Share information about your child&apos;s strengths and challenges</li>
                    <li>• Maintain regular communication with teachers</li>
                    <li>• Be proactive rather than reactive</li>
                    <li>• Express appreciation for teacher efforts</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Requesting Accommodations</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Request formal assessment if not already done</li>
                    <li>• Understand 504 Plans vs. IEPs</li>
                    <li>• Ask for specific accommodations your child needs</li>
                    <li>• Ensure accommodations are being implemented</li>
                    <li>• Document all communications in writing</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Common School Accommodations</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Extended time on tests and assignments</li>
                    <li>• Alternative test formats (oral, multiple choice)</li>
                    <li>• Use of assistive technology</li>
                    <li>• Reduced homework load</li>
                    <li>• Note-taking assistance</li>
                    <li>• Preferential seating</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Self-Care for Parents */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Taking Care of Yourself</h2>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Supporting a child with dyslexia can be emotionally and physically demanding. 
                Remember to take care of yourself too:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-indigo-800 mb-2">Managing Your Own Stress</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Accept that progress takes time</li>
                    <li>• Celebrate small victories</li>
                    <li>• Connect with other parents in similar situations</li>
                    <li>• Take breaks when you need them</li>
                    <li>• Seek professional support when needed</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-indigo-800 mb-2">Finding Support</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Join local dyslexia support groups</li>
                    <li>• Connect with online parent communities</li>
                    <li>• Attend workshops and conferences</li>
                    <li>• Consider family counseling if needed</li>
                    <li>• Remember you&apos;re doing your best</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Using Brighten at Home */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Using Brighten to Support Home Learning</h2>
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Brighten can be a valuable tool to support your child&apos;s learning at home. 
                Here&apos;s how to make the most of it:
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Getting Started</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Help your child set up their account and preferences</li>
                    <li>• Explore the platform together initially</li>
                    <li>• Set up a regular time for using Brighten</li>
                    <li>• Start with subjects your child enjoys most</li>
                    <li>• Monitor progress but don&apos;t micromanage</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Supporting Their Learning</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Help them upload difficult texts for simplification</li>
                    <li>• Discuss what they&apos;re learning</li>
                    <li>• Encourage them to use audio features</li>
                    <li>• Celebrate their achievements on the platform</li>
                    <li>• Contact teachers about progress shown</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Resources and Support */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Additional Resources</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Books for Parents</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• &quot;Overcoming Dyslexia&quot; by Sally Shaywitz</li>
                    <li>• &quot;The Dyslexic Advantage&quot; by Brock Eide</li>
                    <li>• &quot;Dyslexia: A Complete Guide for Parents&quot; by Gavin Reid</li>
                    <li>• &quot;The Everything Parent&apos;s Guide to Children with Dyslexia&quot;</li>
                    <li>• &quot;When Your Child Struggles&quot; by Wynford Dore</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Organizations</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• International Dyslexia Association</li>
                    <li>• Decoding Dyslexia (advocacy group)</li>
                    <li>• Learning Disabilities Association</li>
                    <li>• Made by Dyslexia</li>
                    <li>• Local parent support groups</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Websites and Blogs</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Understood.org (comprehensive resource)</li>
                    <li>• DyslexiaHelp.umich.edu</li>
                    <li>• Reading Rockets (reading resources)</li>
                    <li>• LD Online (learning differences)</li>
                    <li>• Dyslexic Logic (parent blog)</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Professional Support</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Educational psychologists</li>
                    <li>• Specialized tutors (Orton-Gillingham trained)</li>
                    <li>• Reading specialists</li>
                    <li>• Occupational therapists</li>
                    <li>• Family counselors</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-orange-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-orange-800 mb-4">We&apos;re Here to Help</h2>
            <p className="text-gray-700 mb-4">
              Parenting a child with dyslexia is a journey, and you don&apos;t have to navigate it alone. 
              We&apos;re here to support both you and your child every step of the way.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Contact Brighten Support</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Email: <a href="mailto:brightenseducation@gmail.com" className="text-orange-600 hover:text-orange-800">brightenseducation@gmail.com</a></li>
                  <li>• Phone: <a href="tel:+250786571189" className="text-orange-600 hover:text-orange-800">+250 786 571 189</a></li>
                  <li>• We understand the challenges you face</li>
                  <li>• Ask us about parent workshops and resources</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Other Brighten Resources</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• <Link href="/help" className="text-orange-600 hover:text-orange-800">Help Center</Link></li>
                  <li>• <Link href="/dyslexia-support" className="text-orange-600 hover:text-orange-800">Dyslexia Support Resources</Link></li>
                  <li>• <Link href="/teacher-resources" className="text-orange-600 hover:text-orange-800">Teacher Resources (to share)</Link></li>
                  <li>• <Link href="/settings/preferences" className="text-orange-600 hover:text-orange-800">Platform Settings Guide</Link></li>
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

export default ParentGuidePage; 