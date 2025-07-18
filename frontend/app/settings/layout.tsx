"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserIcon, CogIcon, EyeIcon, BookOpenIcon, ChevronRightIcon } from '@/components/icons';
import { useAppContext } from '@/context/AppContext';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { authState } = useAppContext();

  const settingsNavItems = [
    {
      href: '/settings',
      label: 'Overview',
      icon: CogIcon,
      description: 'General settings overview',
      showForAll: true
    },
    {
      href: '/settings/preferences',
      label: 'Preferences',
      icon: EyeIcon,
      description: 'Customize your learning experience',
      showForAll: true
    },
    {
      href: '/settings/profile',
      label: 'Profile',
      icon: UserIcon,
      description: 'Manage your account',
      showForAll: false // Only for authenticated users
    },
    {
      href: '/settings/privacy',
      label: 'Privacy',
      icon: BookOpenIcon,
      description: 'Privacy and data settings',
      showForAll: true
    }
  ];

  const filteredNavItems = settingsNavItems.filter(item => 
    item.showForAll || (authState.isAuthenticated && !authState.isAnonymous)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <CogIcon className="h-8 w-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          </div>
          <p className="text-gray-600">
            Manage your account and personalize your Brighten learning experience.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Settings Menu</h3>
              </div>
              <nav className="p-2">
                {filteredNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 group ${
                        isActive
                          ? 'bg-orange-50 text-orange-700 border-l-4 border-orange-500'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon 
                          className={`h-5 w-5 ${
                            isActive ? 'text-orange-500' : 'text-gray-500 group-hover:text-gray-700'
                          }`} 
                        />
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-sm text-gray-500">{item.description}</div>
                        </div>
                      </div>
                      <ChevronRightIcon 
                        className={`h-4 w-4 ${
                          isActive ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-600'
                        }`} 
                      />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Quick Tips */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-800 mb-2">💡 Quick Tips</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• All preferences are automatically saved</li>
                <li>• Use preferences to optimize for dyslexia</li>
                <li>• Try different voices for better comprehension</li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout; 