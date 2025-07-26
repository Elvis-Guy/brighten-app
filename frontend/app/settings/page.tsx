// ============================================================================
// FILE: app/settings/page.tsx
// Description: Enhanced page for user personalization settings.
// ============================================================================
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { UserIcon, EyeIcon, BookOpenIcon, ArrowRightIcon } from '@/components/icons';

const SettingsOverviewPage: React.FC = () => {
  const { authState, userPreferences } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const settingsCards = [
    {
      href: '/settings/preferences',
      title: 'Learning Preferences',
      icon: EyeIcon,
      description: 'Customize fonts, colors, audio settings, and accessibility options for optimal learning',
      color: 'orange',
      stats: [
        `Font: ${userPreferences.fontFamily.split(',')[0]}`,
        `Voice: ${userPreferences.voice}`,
        `Size: ${userPreferences.fontSize}px`
      ],
      features: ['Font Customization', 'Audio Settings', 'Color Themes', 'Reading Speed']
    },
    {
      href: '/settings/profile',
      title: 'Account Profile',
      icon: UserIcon,
      description: 'Manage your account details, change password, and configure account settings',
      color: 'blue',
      show: authState.isAuthenticated && !authState.isAnonymous,
      stats: [
        authState.user?.email ? `Email: ${authState.user.email.substring(0, 20)}...` : 'No email',
        authState.user?.displayName || 'No display name',
        authState.isAdmin ? 'Administrator' : 'Student'
      ],
      features: ['Personal Info', 'Security', 'Notifications', 'Account Status']
    },
    {
      href: '/settings/privacy',
      title: 'Privacy & Data',
      icon: BookOpenIcon,
      description: 'Control your privacy settings, data preferences, and learning analytics',
      color: 'green',
      stats: [
        'Data sync: ' + (authState.isAnonymous ? 'Local only' : 'Cloud enabled'),
        'Account type: ' + (authState.isAnonymous ? 'Guest' : 'Registered'),
        'Auto-save: Enabled'
      ],
      features: ['Data Control', 'Privacy Settings', 'Analytics', 'Export Data']
    }
  ];

  const visibleCards = settingsCards.filter(card => card.show !== false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="p-6 md:p-10 max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className={`mb-12 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.524-1.783 2.679-1.783 3.203 0l.865 2.623a1 1 0 00.928.688l2.945-.279c1.85-.175 2.31.29 1.415 1.988l-2.096 1.724a1 1 0 00-.342 1.09l.7 2.84c.466 1.896-.946 3.25-2.615 2.768l-2.642-.965a1 1 0 00-1.153 0l-2.642.965c-1.669.482-3.081-.872-2.615-2.768l.7-2.84a1 1 0 00-.342-1.09L4.317 8.42c-.895-1.698-.436-2.163 1.415-1.988l2.945.279a1 1 0 00.928-.688l.865-2.623z" />
                </svg>
              </div>
              <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Settings Overview
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Welcome to your personalized settings dashboard. Customize your learning experience and manage your account 
            to get the most out of Brighten's AI-powered education platform.
          </p>
        </div>

        {/* Enhanced Quick Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <EyeIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-orange-800 text-lg">Learning Optimized</div>
                <div className="text-sm text-orange-600">Customized for dyslexia-friendly learning</div>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-xs font-medium">Font Adjusted</span>
              <span className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-xs font-medium">Audio Ready</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                <UserIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-blue-800 text-lg">
                  {authState.isAnonymous ? 'Guest Account' : 'Registered User'}
                </div>
                <div className="text-sm text-blue-600">
                  {authState.isAnonymous ? 'Create account to sync settings' : 'Settings synchronized across devices'}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-medium">
                {authState.isAnonymous ? 'Local Storage' : 'Cloud Sync'}
              </span>
              <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-medium">Secure</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <BookOpenIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-green-800 text-lg">Privacy Protected</div>
                <div className="text-sm text-green-600">Your data is secure and controlled by you</div>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-medium">GDPR Compliant</span>
              <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-medium">Encrypted</span>
            </div>
          </div>
        </div>

        {/* Enhanced Settings Cards */}
        <div className="space-y-8">
          {visibleCards.map((card, index) => {
            const Icon = card.icon;
            const colorClasses = {
              orange: {
                bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
                border: 'border-orange-200',
                icon: 'from-orange-500 to-red-500',
                iconText: 'text-white',
                text: 'text-orange-800',
                subtext: 'text-orange-600',
                button: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600',
                feature: 'bg-orange-200 text-orange-800'
              },
              blue: {
                bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
                border: 'border-blue-200',
                icon: 'from-blue-500 to-indigo-500',
                iconText: 'text-white',
                text: 'text-blue-800',
                subtext: 'text-blue-600',
                button: 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600',
                feature: 'bg-blue-200 text-blue-800'
              },
              green: {
                bg: 'bg-gradient-to-br from-green-50 to-green-100',
                border: 'border-green-200',
                icon: 'from-green-500 to-teal-500',
                iconText: 'text-white',
                text: 'text-green-800',
                subtext: 'text-green-600',
                button: 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600',
                feature: 'bg-green-200 text-green-800'
              }
            };

            const colors = colorClasses[card.color as keyof typeof colorClasses];

            return (
              <div
                key={card.href}
                className={`${colors.bg} ${colors.border} border rounded-2xl p-8 hover:shadow-xl transition-all duration-500 transform hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ animationDelay: `${(index + 3) * 200}ms` }}
              >
                <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${colors.icon} rounded-full flex items-center justify-center shadow-lg`}>
                        <Icon className={`h-8 w-8 ${colors.iconText}`} />
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold ${colors.text}`}>{card.title}</h3>
                        <p className={`text-sm ${colors.subtext} font-medium`}>Essential settings for your learning journey</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-6 leading-relaxed text-lg">{card.description}</p>
                    
                    {/* Current Settings Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                      {card.stats.map((stat, index) => (
                        <div key={index} className="text-sm text-gray-600 bg-white/70 rounded-lg px-4 py-2 border border-white/50">
                          {stat}
                        </div>
                      ))}
                    </div>

                    {/* Feature List */}
                    <div className="mb-6">
                      <h4 className={`text-sm font-semibold ${colors.text} mb-3`}>Available Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {card.features.map((feature, index) => (
                          <span key={index} className={`px-3 py-1 ${colors.feature} rounded-full text-xs font-medium`}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-4">
                    <Link
                      href={card.href}
                      className={`${colors.button} text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold`}
                    >
                      <span>Configure</span>
                      <ArrowRightIcon className="h-5 w-5" />
                    </Link>
                    
                    {/* Quick Actions */}
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-2">Quick actions</p>
                      <div className="flex space-x-2">
                        <button className="w-8 h-8 bg-white bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200">
                          <span className="text-sm">⚡</span>
                        </button>
                        <button className="w-8 h-8 bg-white bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200">
                          <span className="text-sm">🔄</span>
                        </button>
                        <button className="w-8 h-8 bg-white bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200">
                          <span className="text-sm">💾</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Guest User Notice */}
        {(authState.isAnonymous || !authState.isAuthenticated) && (
          <div className={`mt-12 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-2xl p-8 shadow-lg transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <UserIcon className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-blue-800 mb-3">Unlock Your Full Potential</h4>
                <p className="text-blue-700 mb-6 leading-relaxed text-lg">
                  You're currently using Brighten as a guest user. Your preferences are saved locally, 
                  but creating an account will sync your settings across all devices and unlock additional features 
                  like progress tracking, personalized learning paths, and advanced analytics.
                </p>
                
                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">☁️</span>
                    </div>
                    <span className="text-blue-800 font-medium">Cloud sync across devices</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">📊</span>
                    </div>
                    <span className="text-blue-800 font-medium">Advanced learning analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🎯</span>
                    </div>
                    <span className="text-blue-800 font-medium">Personalized learning paths</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🏆</span>
                    </div>
                    <span className="text-blue-800 font-medium">Achievement tracking</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/auth/signup">
                    <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                      Create Free Account
                    </button>
                  </Link>
                  <Link href="/auth/signin">
                    <button className="bg-white text-blue-500 border-2 border-blue-500 px-6 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300 text-center font-semibold transform hover:scale-105">
                      Sign In
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New: Help & Support Section */}
        <div className={`mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Help?</h3>
            <p className="text-gray-600">Get the most out of your Brighten experience with our support resources.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/contact">
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-pointer group transform hover:scale-105">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 transition-colors">
                  <span className="text-white text-xl">💬</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Contact Support</h4>
                <p className="text-gray-600 text-sm">Get help from our friendly support team</p>
              </div>
            </Link>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-pointer group transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                <span className="text-white text-xl">📚</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">User Guide</h4>
              <p className="text-gray-600 text-sm">Learn how to use all features effectively</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-pointer group transform hover:scale-105">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors">
                <span className="text-white text-xl">🎥</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Video Tutorials</h4>
              <p className="text-gray-600 text-sm">Watch step-by-step guides and tips</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsOverviewPage;