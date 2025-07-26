// ============================================================================
// FILE: app/about/page.tsx
// Description: Enhanced About Us page showcasing Brighten's mission and team.
// ============================================================================
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpenIcon, CloudUploadIcon, EyeIcon, SunIcon } from '@/components/icons';

const AboutPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Enhanced Hero Section */}
      <div className={`px-6 md:px-10 pt-10 pb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <SunIcon className="h-12 w-12 text-white" />
              </div>
              <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            About Brighten
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Transforming education through AI-powered learning that makes complex concepts simple, 
            engaging, and accessible for every student, especially those with dyslexia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Start Learning Today
              </button>
            </Link>
            <Link href="/curriculum">
              <button className="px-8 py-4 border-2 border-orange-500 text-orange-500 font-bold rounded-full hover:bg-orange-50 transition-all duration-300 transform hover:scale-105">
                Explore Curriculum
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Mission Section */}
      <div className="bg-white py-16 px-6 md:px-10 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Our Mission</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We believe that every student deserves access to quality education that adapts to their unique learning style. 
              Brighten leverages cutting-edge AI technology to break down educational barriers and create 
              personalized learning experiences that empower students to reach their full potential.
            </p>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className={`text-center p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '400ms' }}>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <BookOpenIcon className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Smart Curriculum</h3>
              <p className="text-gray-600 leading-relaxed">
                AI-curated lessons across subjects like Mathematics, Science, and English, 
                designed to match student learning levels, pace, and individual needs for optimal comprehension.
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <span className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm">Grades 10-12</span>
                <span className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm">90+ Topics</span>
              </div>
            </div>

            <div className={`text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '600ms' }}>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                  <CloudUploadIcon className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Text Simplification</h3>
              <p className="text-gray-600 leading-relaxed">
                Upload any educational material and our advanced AI instantly transforms complex 
                texts into easy-to-understand, age-appropriate content tailored for dyslexic learners.
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">Instant Processing</span>
                <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">Any Subject</span>
              </div>
            </div>

            <div className={`text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '800ms' }}>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                  <EyeIcon className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Visual Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Generate interactive diagrams, illustrations, and visual aids that help 
                students grasp complex concepts through multiple learning modalities and accessibility features.
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">Interactive</span>
                <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">Accessible</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Story Section */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Our Story</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-6 text-lg leading-relaxed">
                  Brighten was born from a simple yet powerful observation: too many brilliant students struggle not because they lack 
                  ability, but because educational content isn't presented in a way that resonates with their 
                  individual learning styles, particularly those with dyslexia.
                </p>
                <p className="mb-6 text-lg leading-relaxed">
                  Our diverse team of educators, technologists, and AI researchers came together with a shared vision: 
                  to democratize quality education by making it adaptive, engaging, and accessible to learners 
                  everywhere, regardless of their background, learning differences, or starting point.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, Brighten serves students across different educational levels, helping them unlock their 
                  potential through personalized, AI-enhanced learning experiences that adapt to their unique needs
                  and celebrate their individual strengths.
                </p>
              </div>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Impact</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">📚</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">1000+</div>
                      <div className="text-gray-600">Students Supported</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">🎯</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">95%</div>
                      <div className="text-gray-600">Improved Comprehension</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">⚡</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">24/7</div>
                      <div className="text-gray-600">AI-Powered Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Team Section */}
      <div className="bg-white py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Meet Our Team</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A passionate group of innovators dedicated to transforming education through technology and empathy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Enhanced Team Member 1 */}
            <div className={`text-center group transform transition-all duration-500 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '600ms' }}>
              <div className="bg-gradient-to-br from-white to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white text-3xl font-bold">EB</span>
                  </div>
                  <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full mx-auto animate-ping opacity-20 group-hover:opacity-30"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Elvis Bakunzi</h3>
                <p className="text-orange-500 font-medium mb-3">Lead Developer & Founder</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Passionate about creating technology that transforms education and empowers learners worldwide. 
                  Dedicated to building inclusive learning experiences.
                </p>
                <div className="mt-4 flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">Full-Stack Development</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">AI Integration</span>
                </div>
              </div>
            </div>

            {/* Enhanced Team Member 2 */}
            <div className={`text-center group transform transition-all duration-500 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '800ms' }}>
              <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white text-2xl font-bold">🤖</span>
                  </div>
                  <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full mx-auto animate-ping opacity-20 group-hover:opacity-30"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Research Team</h3>
                <p className="text-blue-500 font-medium mb-3">Technology Core</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Dedicated AI specialists working to make educational content more accessible, engaging, 
                  and personalized for students with diverse learning needs.
                </p>
                <div className="mt-4 flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Machine Learning</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">NLP</span>
                </div>
              </div>
            </div>

            {/* Enhanced Team Member 3 */}
            <div className={`text-center group transform transition-all duration-500 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '1000ms' }}>
              <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white text-2xl font-bold">👨‍🏫</span>
                  </div>
                  <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-green-300 to-green-500 rounded-full mx-auto animate-ping opacity-20 group-hover:opacity-30"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Education Advisors</h3>
                <p className="text-green-500 font-medium mb-3">Curriculum Experts</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Experienced educators ensuring our platform meets real classroom needs, learning objectives, 
                  and accessibility standards for all students.
                </p>
                <div className="mt-4 flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Curriculum Design</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Accessibility</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Values Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Our Core Values</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '800ms' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Inclusivity</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Every learner deserves access to quality education, regardless of their learning differences or challenges. 
                We design for accessibility first.
              </p>
            </div>
            
            <div className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '1000ms' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Innovation</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We continuously push the boundaries of what's possible in educational technology, 
                leveraging AI to create transformative learning experiences.
              </p>
            </div>
            
            <div className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '1200ms' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-xl">💪</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Empowerment</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We believe in empowering students to take control of their learning journey, 
                building confidence and independence through personalized education.
              </p>
            </div>
            
            <div className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '1400ms' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-xl">❤️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Compassion</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We approach every student's journey with empathy and understanding, 
                recognizing that learning is deeply personal and unique to each individual.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Contact Section */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white py-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Learning?</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Join our community of learners and educators who are revolutionizing education through AI-powered, 
              accessible learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/contact">
                <button className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Get In Touch
                </button>
              </Link>
              <Link href="/curriculum">
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-orange-500 transition-all duration-300 transform hover:scale-105">
                  Start Learning
                </button>
              </Link>
            </div>
            
            {/* Enhanced feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="flex items-center justify-center space-x-3 text-white text-opacity-90">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-lg">🎓</span>
                </div>
                <span className="font-medium">Expert-Designed Curriculum</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-white text-opacity-90">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-lg">⚡</span>
                </div>
                <span className="font-medium">Instant AI Processing</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-white text-opacity-90">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-lg">🌍</span>
                </div>
                <span className="font-medium">Accessible Worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;