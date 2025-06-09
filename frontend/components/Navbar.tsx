// ============================================================================
// FILE: components/Navbar.tsx
// Description: Navigation bar component.
// ============================================================================
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/context/AppContext'; // Use the type-safe hook
import { HomeIcon, BookOpenIcon, CloudUploadIcon, EyeIcon, CogIcon, SunIcon, UserIcon } from '@/components/icons';

const Navbar = () => {
  const { userId } = useAppContext();
  const pathname = usePathname();

  const isActive = (path: string): boolean => {
    if (path === '/') return pathname === '/';
    if (path === '/curriculum') return pathname.startsWith('/content') || pathname === '/curriculum';
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center rounded-b-xl">
      <div className="flex items-center space-x-2">
        <SunIcon className="h-8 w-8 text-orange-500" />
        <h1 className="text-3xl font-bold text-gray-800">Brighten</h1>
      </div>
      <div className="hidden md:flex space-x-8">
        <Link href="/" passHref>
          <button className={`flex items-center space-x-2 text-lg font-semibold ${isActive('/') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'} transition duration-200`}>
            <HomeIcon /> <span>Home</span>
          </button>
        </Link>
        <Link href="/curriculum" passHref>
          <button className={`flex items-center space-x-2 text-lg font-semibold ${isActive('/curriculum') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'} transition duration-200`}>
            <BookOpenIcon /> <span>Curriculum</span>
          </button>
        </Link>
        <Link href="/upload" passHref>
          <button className={`flex items-center space-x-2 text-lg font-semibold ${isActive('/upload') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'} transition duration-200`}>
            <CloudUploadIcon /> <span>Upload & Simplify</span>
          </button>
        </Link>
        <Link href="/visualizations" passHref>
          <button className={`flex items-center space-x-2 text-lg font-semibold ${isActive('/visualizations') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'} transition duration-200`}>
            <EyeIcon /> <span>Visualizations</span>
          </button>
        </Link>
        <Link href="/settings" passHref>
          <button className={`flex items-center space-x-2 text-lg font-semibold ${isActive('/settings') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'} transition duration-200`}>
            <CogIcon /> <span>Settings</span>
          </button>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {userId && <span className="text-sm text-gray-500 hidden md:block">User ID: {userId}</span>}
        <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition duration-200">
          <UserIcon className="h-6 w-6" />
        </button>
        <button className="md:hidden p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;