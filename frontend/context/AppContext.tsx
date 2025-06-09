// ============================================================================
// FILE: context/AppContext.tsx
// Description: React Context for managing global state (user preferences,
// selected lesson, loading states, Firebase instances).
// MUST be a client component as it uses useState, useEffect, and Firebase client SDK.
// ============================================================================
"use client";

import React, { useState, useEffect, createContext } from 'react';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, Auth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, Firestore } from 'firebase/firestore';
import type { UserPreferences, CurriculumSubject, AppContextType } from '@/types'; // Import types

// Firebase config and initialization
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

let appInstance: FirebaseApp | undefined;
let dbInstance: Firestore | undefined;
let authInstance: Auth | undefined;

if (Object.keys(firebaseConfig).length > 0) {
  appInstance = initializeApp(firebaseConfig);
  dbInstance = getFirestore(appInstance);
  authInstance = getAuth(appInstance);
}

// Default user preferences
const defaultPreferences: UserPreferences = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  letterSpacing: 0,
  backgroundColor: '#FFFBEB',
  textColor: '#333333',
  highContrastMode: false,
  voice: 'female',
  speakingRate: 1,
  language: 'English',
};

// Create context with a default value that matches AppContextType
export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [selectedLesson, setSelectedLesson] = useState<CurriculumSubject | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(defaultPreferences);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
  const [showPasteTextModal, setShowPasteTextModal] = useState<boolean>(false);
  const [pasteTextContent, setPasteTextContent] = useState<string>('');
  const [loadingText, setLoadingText] = useState<string>('');

  // Firebase Auth and Firestore setup
  useEffect(() => {
    if (!authInstance || !dbInstance) {
      console.error("Firebase not initialized. Check __firebase_config.");
      setIsAuthReady(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
      if (user) {
        setUserId(user.uid);
        const userDocRef = doc(dbInstance, `artifacts/${appId}/users/${user.uid}/preferences/user_settings`);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setUserPreferences(docSnap.data() as UserPreferences);
        }
      } else {
        try {
          if (typeof __initial_auth_token !== 'undefined') {
            await signInWithCustomToken(authInstance, __initial_auth_token);
          } else {
            await signInAnonymously(authInstance);
          }
        } catch (error) {
          console.error("Error signing in:", error);
          setUserId(crypto.randomUUID());
        }
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  // Apply user preferences to body style
  useEffect(() => {
    document.body.style.fontFamily = userPreferences.fontFamily;
    document.body.style.fontSize = `${userPreferences.fontSize}px`;
    document.body.style.letterSpacing = `${userPreferences.letterSpacing}px`;
    document.body.style.backgroundColor = userPreferences.backgroundColor;
    document.body.style.color = userPreferences.textColor;
  }, [userPreferences]);

  // Show loading spinner while auth is not ready
  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-700">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span>Loading Brighten...</span>
        </div>
      </div>
    );
  }

  const contextValue: AppContextType = {
    selectedLesson,
    setSelectedLesson,
    userPreferences,
    setUserPreferences,
    userId,
    isAuthReady,
    showPasteTextModal,
    setShowPasteTextModal,
    pasteTextContent,
    setPasteTextContent,
    loadingText,
    setLoadingText,
    db: dbInstance,
    auth: authInstance,
    appId,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the AppContext with type safety
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};