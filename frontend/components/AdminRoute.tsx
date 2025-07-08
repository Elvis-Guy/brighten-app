// ============================================================================
// FILE: components/AdminRoute.tsx
// Description: Protected route component for admin-only pages.
// ============================================================================
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';

interface AdminRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  fallbackPath?: string;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ 
  children, 
  requiredPermission,
  fallbackPath = '/' 
}) => {
  const { authState, adminPermissions, checkAdminPermission } = useAppContext();
  const router = useRouter();

  // Show loading while authentication state is being determined
  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span className="text-gray-700">Loading...</span>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!authState.isAuthenticated || authState.isAnonymous) {
    router.push('/auth/signin');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to access the admin panel.</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Check if user has admin privileges
  if (!authState.isAdmin) {
    router.push(fallbackPath);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have administrator privileges. Please contact your system administrator if you need access.
          </p>
          <button
            onClick={() => router.push(fallbackPath)}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Check specific permission if required
  if (requiredPermission && !checkAdminPermission(requiredPermission as any)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0h-2m9-10a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Insufficient Permissions</h2>
          <p className="text-gray-600 mb-6">
            You don't have the required permissions to access this feature. Contact your administrator for access.
          </p>
          <button
            onClick={() => router.push('/admin')}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Admin Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Render children if all checks pass
  return <>{children}</>;
};

export default AdminRoute; 