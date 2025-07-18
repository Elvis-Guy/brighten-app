// ============================================================================
// FILE: app/settings/page.tsx
// Description: Page for user personalization settings.
// ============================================================================
"use client";

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { UserIcon, CogIcon, EyeIcon, BookOpenIcon, ChevronRightIcon, ArrowRightIcon } from '@/components/icons';

const SettingsOverviewPage: React.FC = () => {
  const { authState, userPreferences } = useAppContext();

  const settingsCards = [
    {
      href: '/settings/preferences',
      title: 'Learning Preferences',
      icon: EyeIcon,
      description: 'Customize fonts, colors, audio settings, and accessibility options',
      color: 'orange',
      stats: [
        `Font: ${userPreferences.fontFamily.split(',')[0]}`,
        `Voice: ${userPreferences.voice}`,
        `Size: ${userPreferences.fontSize}px`
      ]
    },
    {
      href: '/settings/profile',
      title: 'Account Profile',
      icon: UserIcon,
      description: 'Manage your account details, change password, and account settings',
      color: 'blue',
      show: authState.isAuthenticated && !authState.isAnonymous,
      stats: [
        authState.user?.email ? `Email: ${authState.user.email.substring(0, 20)}...` : 'No email',
        authState.user?.displayName || 'No display name',
        authState.isAdmin ? 'Administrator' : 'Student'
      ]
    },
    {
      href: '/settings/privacy',
      title: 'Privacy & Data',
      icon: BookOpenIcon,
      description: 'Control your privacy settings and data preferences',
      color: 'green',
      stats: [
        'Data sync: ' + (authState.isAnonymous ? 'Local only' : 'Cloud enabled'),
        'Account type: ' + (authState.isAnonymous ? 'Guest' : 'Registered'),
        'Auto-save: Enabled'
      ]
    }
  ];

  const visibleCards = settingsCards.filter(card => card.show !== false);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Settings Overview</h2>
        <p className="text-gray-600">
          Welcome to your settings dashboard. Manage your account and personalize your learning experience.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <EyeIcon className="h-6 w-6 text-orange-500" />
            <div>
              <div className="font-semibold text-orange-800">Preferences Set</div>
              <div className="text-sm text-orange-600">Customized for dyslexia</div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <UserIcon className="h-6 w-6 text-blue-500" />
            <div>
              <div className="font-semibold text-blue-800">
                {authState.isAnonymous ? 'Guest User' : 'Registered User'}
              </div>
              <div className="text-sm text-blue-600">
                {authState.isAnonymous ? 'Create account to sync' : 'Account synced'}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <BookOpenIcon className="h-6 w-6 text-green-500" />
            <div>
              <div className="font-semibold text-green-800">Privacy Secure</div>
              <div className="text-sm text-green-600">Data protected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Cards */}
      <div className="space-y-6">
        {visibleCards.map((card) => {
          const Icon = card.icon;
          const colorClasses = {
            orange: {
              bg: 'bg-orange-50',
              border: 'border-orange-200',
              icon: 'text-orange-500',
              text: 'text-orange-800',
              button: 'bg-orange-500 hover:bg-orange-600'
            },
            blue: {
              bg: 'bg-blue-50',
              border: 'border-blue-200',
              icon: 'text-blue-500',
              text: 'text-blue-800',
              button: 'bg-blue-500 hover:bg-blue-600'
            },
            green: {
              bg: 'bg-green-50',
              border: 'border-green-200',
              icon: 'text-green-500',
              text: 'text-green-800',
              button: 'bg-green-500 hover:bg-green-600'
            }
          };

          const colors = colorClasses[card.color as keyof typeof colorClasses];

          return (
            <div
              key={card.href}
              className={`${colors.bg} ${colors.border} border rounded-xl p-6 hover:shadow-md transition-shadow duration-200`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon className={`h-7 w-7 ${colors.icon}`} />
                    <h3 className={`text-xl font-semibold ${colors.text}`}>{card.title}</h3>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{card.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                    {card.stats.map((stat, index) => (
                      <div key={index} className="text-sm text-gray-600 bg-white/50 rounded px-3 py-1">
                        {stat}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Link
                  href={card.href}
                  className={`ml-4 ${colors.button} text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2`}
                >
                  <span>Configure</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guest User Notice */}
      {(authState.isAnonymous || !authState.isAuthenticated) && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <UserIcon className="h-8 w-8 text-blue-500 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold text-blue-800 mb-2">Using Brighten as Guest</h4>
              <p className="text-blue-700 mb-4">
                You're currently using Brighten as a guest user. Your preferences are saved locally, 
                but creating an account will sync your settings across all devices and unlock additional features.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/auth/signup" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-center"
                >
                  Create Account
                </Link>
                <Link 
                  href="/auth/signin" 
                  className="bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-center"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsOverviewPage;