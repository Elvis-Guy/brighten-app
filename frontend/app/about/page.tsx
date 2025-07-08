// ============================================================================
// FILE: app/about/page.tsx
// Description: About Us page showcasing Brighten's mission and team.
// ============================================================================
"use client";

import React from 'react';
import { BookOpenIcon, CloudUploadIcon, EyeIcon, SunIcon } from '@/components/icons';

const AboutPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
    {/* Hero Section */}
    <div className="px-6 md:px-10 pt-10 pb-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <SunIcon className="h-16 w-16 text-orange-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          About Brighten
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Transforming education through AI-powered learning that makes complex concepts simple, 
          engaging, and accessible for every student.
        </p>
      </div>
    </div>

    {/* Mission Section */}
    <div className="bg-white py-16 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We believe that every student deserves access to quality education that adapts to their learning style. 
            Brighten leverages cutting-edge AI technology to break down educational barriers and create 
            personalized learning experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center p-6 bg-orange-50 rounded-xl">
            <div className="flex justify-center mb-4">
              <BookOpenIcon className="h-12 w-12 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Smart Curriculum</h3>
            <p className="text-gray-600">
              AI-curated lessons across subjects like Mathematics, Science, and English, 
              designed to match student learning levels and pace.
            </p>
          </div>

          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <div className="flex justify-center mb-4">
              <CloudUploadIcon className="h-12 w-12 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Text Simplification</h3>
            <p className="text-gray-600">
              Upload any educational material and our AI instantly transforms complex 
              texts into easy-to-understand, age-appropriate content.
            </p>
          </div>

          <div className="text-center p-6 bg-green-50 rounded-xl">
            <div className="flex justify-center mb-4">
              <EyeIcon className="h-12 w-12 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Visual Learning</h3>
            <p className="text-gray-600">
              Generate interactive diagrams, illustrations, and visual aids that help 
              students grasp concepts through multiple learning modalities.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Story Section */}
    <div className="bg-gray-50 py-16 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Story</h2>
        <div className="prose prose-lg max-w-none text-gray-600">
          <p className="mb-6">
            Brighten was born from a simple observation: too many students struggle not because they lack 
            ability, but because educational content isn't presented in a way that resonates with their 
            individual learning styles.
          </p>
          <p className="mb-6">
            Our team of educators, technologists, and AI researchers came together with a shared vision: 
            to democratize quality education by making it adaptive, engaging, and accessible to learners 
            everywhere, regardless of their background or starting point.
          </p>
          <p>
            Today, Brighten serves students across different educational levels, helping them unlock their 
            potential through personalized, AI-enhanced learning experiences that adapt to their unique needs.
          </p>
        </div>
      </div>
    </div>

    {/* Team Section */}
    <div className="bg-white py-16 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">EB</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Elvis Bakunzi</h3>
            <p className="text-orange-500 font-medium mb-2">Lead Developer</p>
            <p className="text-gray-600 text-sm">
              Passionate about creating technology that transforms education and empowers learners worldwide.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">AI</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Research Team</h3>
            <p className="text-blue-500 font-medium mb-2">Technology Core</p>
            <p className="text-gray-600 text-sm">
              Dedicated AI specialists working to make educational content more accessible and engaging.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">ED</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Education Advisors</h3>
            <p className="text-green-500 font-medium mb-2">Curriculum Experts</p>
            <p className="text-gray-600 text-sm">
              Experienced educators ensuring our platform meets real classroom needs and learning objectives.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Contact Section */}
    <div className="bg-orange-500 text-white py-16 px-6 md:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
        <p className="text-xl mb-8 opacity-90">
          Have questions about Brighten? We'd love to hear from you and help you on your learning journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="mailto:hello@brighten.edu" 
            className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Contact Us
          </a>
          <a 
            href="/curriculum" 
            className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-500 transition-all duration-200"
          >
            Start Learning
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;