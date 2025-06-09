// ============================================================================
// FILE: app/page.tsx
// Description: Home page of the application.
// ============================================================================
"use client";

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { BookOpenIcon, CloudUploadIcon } from '@/components/icons';
import { curriculumContent } from '@/data/curriculumData';
import type { CurriculumSubject } from '@/types';

const HomePage: React.FC = () => {
  const { setSelectedLesson } = useAppContext();

  return (
    <div className="p-6 md:p-10">
      {/* Welcome Banner */}
      <div className="bg-orange-500 text-white p-6 md:p-10 rounded-xl shadow-lg mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-600 rounded-full opacity-20 transform -translate-x-1/3 translate-y-1/3"></div>
        <h2 className="text-4xl font-bold mb-2">Welcome back, Amara!</h2>
        <p className="text-lg mb-6">Continue your learning journey with content designed just for you.</p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/content/science" passHref>
            <button
              onClick={() => setSelectedLesson(curriculumContent.science)}
              className="flex items-center justify-center px-8 py-4 bg-white text-orange-500 font-bold rounded-full shadow-md hover:bg-gray-100 transition duration-300 text-lg"
            >
              <BookOpenIcon className="h-6 w-6 mr-2" /> Continue Learning
            </button>
          </Link>
          <Link href="/upload" passHref>
            <button
              className="flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full shadow-md hover:bg-white hover:text-orange-500 transition duration-300 text-lg"
            >
              <CloudUploadIcon className="h-6 w-6 mr-2" /> Upload New Text
            </button>
          </Link>
        </div>
      </div>

      {/* Curriculum Section */}
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Grade 5 Curriculum</h3>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <button className="px-5 py-2 bg-gray-100 text-gray-700 rounded-full flex items-center space-x-2 hover:bg-gray-200 transition duration-200">
            <span>Filter</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search subjects..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.values(curriculumContent).map((subject: CurriculumSubject) => (
          <div key={subject.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <img src={subject.image} alt={subject.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h4 className="text-2xl font-bold text-gray-800 mb-2">{subject.title}</h4>
              <p className="text-gray-600 mb-4">{subject.lessons} lessons</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-orange-400 h-2.5 rounded-full"
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mb-4">{subject.progress}% Complete</p>
              <p className="text-gray-700 mb-6">{subject.description}</p>
              <Link href={`/content/${subject.id}`} passHref>
                <button
                  onClick={() => setSelectedLesson(subject)}
                  className="w-full px-6 py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition duration-300 text-lg"
                >
                  Continue Learning
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;