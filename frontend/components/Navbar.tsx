// ============================================================================
// FILE: components/Navbar.tsx
// Description: Navigation bar component with authentication controls.
// ============================================================================
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/context/AppContext'; // Use the type-safe hook
import { HomeIcon, BookOpenIcon, CloudUploadIcon, EyeIcon, CogIcon, SunIcon, UserIcon } from '@/components/icons';

const Navbar = () => {
  const { authState, signOut } = useAppContext();
  const pathname = usePathname();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isActive = (path: string): boolean => {
    if (path === '/') return pathname === '/';
    if (path === '/curriculum') return pathname.startsWith('/content') || pathname === '/curriculum';
    return pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserDropdown(false);
      setShowMobileMenu(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const navigationLinks = [
    { href: '/', icon: HomeIcon, label: 'Home' },
    { href: '/curriculum', icon: BookOpenIcon, label: 'Curriculum' },
    { href: '/upload', icon: CloudUploadIcon, label: 'Upload & Simplify' },
    { href: '/about', icon: UserIcon, label: 'About Us' },
    { href: '/settings', icon: CogIcon, label: 'Settings' },
  ];

  // Add admin link if user is admin
  if (authState.isAdmin) {
    navigationLinks.splice(-1, 0, { 
      href: '/admin', 
      icon: () => (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ), 
      label: 'Admin' 
    });
  }

  return (
    <>
      <nav className="bg-white shadow-sm py-4 px-6 md:px-10 relative z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 cursor-pointer" onClick={closeMobileMenu}>
            <SunIcon className="h-8 w-8 text-orange-500" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Brighten</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link href={link.href} key={link.href} passHref>
                  <button className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                    isActive(link.href) 
                      ? 'bg-orange-500 text-white shadow-md' 
                      : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                  }`}>
                    <IconComponent className="h-5 w-5" />
                    <span>{link.label}</span>
                  </button>
                </Link>
              );
            })}
          </div>

          {/* User Profile & Authentication */}
          <div className="flex items-center space-x-4">
            {/* Authentication Controls */}
            {authState.isAuthenticated && !authState.isAnonymous ? (
              /* Authenticated User Dropdown */
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-200"
                >
                  {authState.user?.photoURL ? (
                    <img 
                      src={authState.user.photoURL} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <UserIcon className="h-6 w-6" />
                  )}
                  <span className="hidden sm:block text-sm font-medium">
                    {authState.user?.displayName || authState.user?.email?.split('@')[0] || 'User'}
                  </span>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-800">
                        {authState.user?.displayName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {authState.user?.email}
                      </p>
                    </div>
                    
                    <Link href="/settings" onClick={() => setShowUserDropdown(false)}>
                      <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <CogIcon className="h-4 w-4" />
                          <span>Settings</span>
                        </div>
                      </div>
                    </Link>
                    
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign out</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Guest User - Sign In/Up Buttons */
              <div className="hidden sm:flex items-center space-x-3">
                <Link href="/auth/signin">
                  <button className="px-4 py-2 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors duration-200">
                    Sign in
                  </button>
                </Link>
                <Link href="/auth/signup">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-full transition-colors duration-200 shadow-sm">
                    Sign up
                  </button>
                </Link>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {showMobileMenu ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50" 
            onClick={closeMobileMenu}
          />
          
          {/* Mobile Menu Panel */}
          <div className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-200 pt-20 pb-6 px-6">
            {/* Navigation Links */}
            <div className="space-y-2">
              {navigationLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link href={link.href} key={link.href} onClick={closeMobileMenu}>
                    <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive(link.href) 
                        ? 'bg-orange-500 text-white shadow-md' 
                        : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                    }`}>
                      <IconComponent className="h-5 w-5" />
                      <span>{link.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Authentication Section */}
            {!authState.isAuthenticated || authState.isAnonymous ? (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <Link href="/auth/signin" onClick={closeMobileMenu}>
                    <button className="w-full px-4 py-3 text-center font-medium text-orange-500 hover:text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200">
                      Sign in
                    </button>
                  </Link>
                  <Link href="/auth/signup" onClick={closeMobileMenu}>
                    <button className="w-full px-4 py-3 text-center font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors duration-200 shadow-sm">
                      Sign up
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                  {authState.user?.photoURL ? (
                    <img 
                      src={authState.user.photoURL} 
                      alt="Profile" 
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <UserIcon className="h-8 w-8 text-gray-500" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {authState.user?.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {authState.user?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full mt-3 px-4 py-3 text-center font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign out</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Click outside to close user dropdown */}
      {showUserDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserDropdown(false)}
        />
      )}
    </>
  );
};

export default Navbar;