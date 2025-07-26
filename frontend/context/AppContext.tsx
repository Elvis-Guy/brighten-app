// ============================================================================
// FILE: context/AppContext.tsx
// Description: React Context for managing global state (user preferences,
// selected lesson, loading states, Firebase instances).
// MUST be a client component as it uses useState, useEffect, and Firebase client SDK.
// ============================================================================
"use client";

import React, { useState, useEffect, createContext, useContext, useCallback, useRef } from 'react';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged, 
  Auth,
  updateProfile,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, Firestore, collection, addDoc, updateDoc, deleteDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import type { UserPreferences, CurrentLesson, AppContextType, User, AuthState, LearningProgress, LessonProgress, AdminPermissions, CurriculumGrade, CurriculumSubjectAdmin, CurriculumTopicAdmin } from '@/types'; // Import types

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase only if config is available
let appInstance: FirebaseApp | undefined;
let dbInstance: Firestore | undefined;
let authInstance: Auth | undefined;

// Check if all required Firebase config values are present
const isFirebaseConfigValid = Object.values(firebaseConfig).every(value => value && value !== '');

if (isFirebaseConfigValid) {
  try {
    appInstance = initializeApp(firebaseConfig);
    dbInstance = getFirestore(appInstance);
    authInstance = getAuth(appInstance);
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
} else {
  console.warn("Firebase configuration is incomplete. Some features may not work.");
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

// Default learning progress
const defaultLearningProgress: LearningProgress = {
  currentLessonId: null,
  lastAccessedAt: new Date().toISOString(),
  totalTimeSpentMinutes: 0,
  lessonsCompleted: [],
  lessonsInProgress: {},
  currentEnrollment: null,
  achievements: [],
  streakDays: 0,
  lastActiveDate: new Date().toISOString().split('T')[0], // Today's date
};

// Create context with a default value that matches AppContextType
export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [selectedLesson, setSelectedLesson] = useState<CurrentLesson | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isPreferencesLoaded, setIsPreferencesLoaded] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
  const [isUserAnonymous, setIsUserAnonymous] = useState<boolean>(true);
  const [showPasteTextModal, setShowPasteTextModal] = useState<boolean>(false);
  const [pasteTextContent, setPasteTextContent] = useState<string>('');
  const [loadingText, setLoadingText] = useState<string>('');
  
  // Debounced Firebase sync with quota protection
  const firebaseSyncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSyncedDataRef = useRef<string>('');
  const isSyncingRef = useRef<boolean>(false);
  const lastSyncTimeRef = useRef<number>(0);
  const quotaExhaustedRef = useRef<boolean>(false);
  
  // localStorage throttling
  const lastLocalSaveRef = useRef<{[key: string]: number}>({});
  const localSaveThrottleMs = 5000; // Throttle localStorage saves to every 5 seconds per key
  
  // Throttled localStorage save function
  const saveToLocalStorageThrottled = useCallback((key: string, data: any) => {
    const now = Date.now();
    const lastSave = lastLocalSaveRef.current[key] || 0;
    
    if (now - lastSave >= localSaveThrottleMs) {
      localStorage.setItem(key, JSON.stringify(data));
      lastLocalSaveRef.current[key] = now;
      console.log(`💾 LocalStorage saved for key: ${key}`);
    } else {
      console.log(`⏱️ LocalStorage save throttled for key: ${key}`);
    }
  }, [localSaveThrottleMs]);
  
  // New state for current enrollment
  const [currentEnrollment, setCurrentEnrollment] = useState<{
    grade: string;
    subject: string;
    topic: string;
  } | null>(null);
  
  // Learning Progress state
  const [learningProgress, setLearningProgress] = useState<LearningProgress | null>(null);
  const [isProgressLoading, setIsProgressLoading] = useState<boolean>(true);
  
  // Admin state
  const [adminPermissions, setAdminPermissions] = useState<AdminPermissions | null>(null);
  
  // Authentication state
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isAnonymous: false,
    isLoading: true,
    isAdmin: false,
    isSuperAdmin: false
  });

  // Convert Firebase user to our User type
  const mapFirebaseUser = (firebaseUser: any): User => ({
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    isAnonymous: firebaseUser.isAnonymous,
    createdAt: firebaseUser.metadata?.creationTime
  });

  // Check if user has admin role
  const checkUserRole = async (user: any): Promise<{ role: string; permissions: AdminPermissions | null }> => {
    if (!dbInstance || !user) {
      return { role: 'student', permissions: null };
    }

    try {
      const userDocRef = doc(dbInstance, `users/${user.uid}`);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role || 'student';
        
        // Define default permissions based on role
        const defaultPermissions: AdminPermissions = {
          canCreateGrades: role === 'super_admin',
          canEditGrades: role === 'admin' || role === 'super_admin',
          canDeleteGrades: role === 'super_admin',
          canCreateSubjects: role === 'admin' || role === 'super_admin',
          canEditSubjects: role === 'admin' || role === 'super_admin',
          canDeleteSubjects: role === 'admin' || role === 'super_admin',
          canCreateTopics: role === 'admin' || role === 'super_admin',
          canEditTopics: role === 'admin' || role === 'super_admin',
          canDeleteTopics: role === 'admin' || role === 'super_admin',
          canViewAnalytics: role === 'admin' || role === 'super_admin',
          canManageUsers: role === 'super_admin'
        };

        const permissions = role === 'admin' || role === 'super_admin' ? 
          { ...defaultPermissions, ...userData.permissions } : null;
        
        return { role, permissions };
      }
    } catch (error) {
      console.error('Error checking user role:', error);
    }
    
    return { role: 'student', permissions: null };
  };

  // Authentication methods
  const signIn = async (email: string, password: string): Promise<void> => {
    if (!authInstance) throw new Error('Firebase not initialized');
    
    const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
    // Auth state will be updated automatically via onAuthStateChanged
  };

  const signUp = async (email: string, password: string, displayName: string): Promise<void> => {
    if (!authInstance) throw new Error('Firebase not initialized');
    
    const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
    
    // Update the user's display name
    await updateProfile(userCredential.user, {
      displayName: displayName
    });
    
    // Create user document in Firestore
    if (dbInstance) {
      await setDoc(doc(dbInstance, `users/${userCredential.user.uid}`), {
        displayName,
        email,
        createdAt: new Date().toISOString(),
        preferences: defaultPreferences
      });
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    if (!authInstance) throw new Error('Firebase not initialized');
    
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(authInstance, provider);
    
    // Create user document in Firestore if it doesn't exist
    if (dbInstance) {
      const userDocRef = doc(dbInstance, `users/${userCredential.user.uid}`);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
          photoURL: userCredential.user.photoURL,
          createdAt: new Date().toISOString(),
          preferences: defaultPreferences
        });
      }
    }
  };

  const signOut = async (): Promise<void> => {
    if (!authInstance) throw new Error('Firebase not initialized');
    
    await firebaseSignOut(authInstance);
    // After sign out, automatically sign in anonymously
    await signInAnonymously(authInstance);
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    if (!authInstance || !authInstance.currentUser) {
      throw new Error('User not authenticated');
    }

    const user = authInstance.currentUser;
    if (!user.email) {
      throw new Error('User email not available');
    }

    // Re-authenticate the user with current password
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    // Update password
    await updatePassword(user, newPassword);
  };

  const deleteAccount = async (password: string): Promise<void> => {
    if (!authInstance || !authInstance.currentUser) {
      throw new Error('User not authenticated');
    }

    const user = authInstance.currentUser;
    if (!user.email) {
      throw new Error('User email not available');
    }

    // Re-authenticate the user
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);

    // Delete user data from Firestore
    if (dbInstance) {
      try {
        // Delete user document
        await deleteDoc(doc(dbInstance, `users/${user.uid}`));
        // Delete user progress document
        await deleteDoc(doc(dbInstance, `users/${user.uid}/progress/learning_progress`));
      } catch (error) {
        console.error('Error deleting user data from Firestore:', error);
        // Continue with account deletion even if Firestore cleanup fails
      }
    }

    // Delete the user account
    await deleteUser(user);
    
    // After deletion, sign in anonymously
    await signInAnonymously(authInstance);
  };

  // Learning Progress Management Functions
  const saveLearningProgress = async (): Promise<void> => {
    if (!learningProgress || !userId) return;

    try {
      if (dbInstance) {
        // Save to Firebase
        const progressDocRef = doc(dbInstance, `users/${userId}/progress/learning_progress`);
        await setDoc(progressDocRef, learningProgress);
      } else {
        // Fallback to localStorage with throttling
        saveToLocalStorageThrottled(`brighten_progress_${userId}`, learningProgress);
      }
    } catch (error) {
      console.error("Error saving learning progress:", error);
      // Fallback to localStorage if Firebase fails
      if (userId) {
        saveToLocalStorageThrottled(`brighten_progress_${userId}`, learningProgress);
      }
    }
  };

  // Debounced Firebase sync function with aggressive throttling
  const scheduleFirebaseSync = useCallback(() => {
    // Skip Firebase sync if explicitly disabled via environment variable
    if (process.env.NEXT_PUBLIC_DISABLE_FIREBASE_SYNC === 'true') {
      console.log('🚫 Firebase sync disabled');
      return;
    }

    // Skip Firebase sync in development mode unless explicitly enabled
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_FIREBASE_DEV !== 'true') {
      console.log('🚫 Firebase sync disabled in development mode');
      return;
    }

    // Only sync for authenticated users with Firebase available
    // Anonymous users should NOT sync to Firebase to prevent quota exhaustion
    if (!dbInstance || !userId || authState.isAnonymous || isSyncingRef.current || quotaExhaustedRef.current) {
      if (authState.isAnonymous) {
        console.log('🚫 Firebase sync skipped for anonymous user');
      }
      return;
    }

    const now = Date.now();
    const timeSinceLastSync = now - lastSyncTimeRef.current;
    const minTimeBetweenSyncs = 60000; // Minimum 60 seconds between syncs

    // Enforce minimum time between syncs
    if (timeSinceLastSync < minTimeBetweenSyncs) {
      console.log(`⏱️ Firebase sync throttled. ${Math.round((minTimeBetweenSyncs - timeSinceLastSync) / 1000)}s remaining`);
      return;
    }

    // Clear existing timeout
    if (firebaseSyncTimeoutRef.current) {
      clearTimeout(firebaseSyncTimeoutRef.current);
    }

    // Schedule new sync after 30 seconds of inactivity (increased from 5 seconds)
    firebaseSyncTimeoutRef.current = setTimeout(async () => {
      try {
        isSyncingRef.current = true;
        const localProgress = localStorage.getItem(`brighten_progress_${userId}`);
        
        if (localProgress && localProgress !== lastSyncedDataRef.current) {
          const progressDocRef = doc(dbInstance, `users/${userId}/progress/learning_progress`);
          await setDoc(progressDocRef, JSON.parse(localProgress));
          lastSyncedDataRef.current = localProgress;
          lastSyncTimeRef.current = Date.now();
          console.log('✅ Firebase sync completed successfully');
        }
      } catch (error: any) {
        console.error("❌ Error syncing to Firebase:", error);
        
        // Handle quota exhaustion
        if (error?.code === 'resource-exhausted' || error?.message?.includes('Quota exceeded')) {
          quotaExhaustedRef.current = true;
          console.warn('🚫 Firebase quota exhausted. Disabling sync for this session.');
          
          // Re-enable after 10 minutes
          setTimeout(() => {
            quotaExhaustedRef.current = false;
            console.log('✅ Firebase sync re-enabled after quota cooldown');
          }, 600000); // 10 minutes
        }
      } finally {
        isSyncingRef.current = false;
      }
    }, 30000); // 30 second debounce (increased from 5 seconds)
  }, [dbInstance, userId, authState.isAnonymous]); // Removed disableFirebaseSync dependency

  // Function to update current enrollment and save it to progress
  const updateCurrentEnrollment = useCallback(async (enrollment: { grade: string; subject: string; topic: string } | null): Promise<void> => {
    setCurrentEnrollment(enrollment);
    
    // Also update the learning progress with the enrollment
    setLearningProgress(prev => {
      if (!prev) return null;
      
      const updatedProgress = {
        ...prev,
        currentEnrollment: enrollment,
        lastAccessedAt: new Date().toISOString()
      };
      
      // Save to localStorage with throttling, schedule Firebase sync
      if (userId) {
        saveToLocalStorageThrottled(`brighten_progress_${userId}`, updatedProgress);
        // Direct Firebase sync call without dependency
        setTimeout(() => scheduleFirebaseSync(), 0);
      }
      
      return updatedProgress;
    });
  }, [userId, saveToLocalStorageThrottled]); // Removed scheduleFirebaseSync dependency

  const updateLessonProgress = useCallback(async (lessonId: string, progressData: Partial<LessonProgress>): Promise<void> => {
    const currentTime = new Date().toISOString();
    const currentDate = currentTime.split('T')[0];
    
    setLearningProgress(prev => {
      if (!prev) return null;

      const existingProgress = prev.lessonsInProgress[lessonId] || {
        lessonId,
        completed: false,
        progressPercentage: 0,
        lastAccessedAt: currentTime,
        timeSpentMinutes: 0,
        completedSections: [],
        bookmarks: []
      };

      const updatedProgress = {
        ...existingProgress,
        ...progressData,
        lastAccessedAt: currentTime
      };

      // Update streak if this is a new day
      let newStreakDays = prev.streakDays;
      if (prev.lastActiveDate !== currentDate) {
        const lastDate = new Date(prev.lastActiveDate);
        const today = new Date(currentDate);
        const diffTime = today.getTime() - lastDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          // Consecutive day
          newStreakDays += 1;
        } else if (diffDays > 1) {
          // Streak broken, start over
          newStreakDays = 1;
        }
        // If diffDays === 0, it's the same day, keep current streak
      }

      const updatedLearningProgress = {
        ...prev,
        currentLessonId: lessonId,
        lastAccessedAt: currentTime,
        lastActiveDate: currentDate,
        streakDays: newStreakDays,
        lessonsInProgress: {
          ...prev.lessonsInProgress,
          [lessonId]: updatedProgress
        }
      };

      // Save to localStorage with throttling, schedule Firebase sync
      if (userId) {
        saveToLocalStorageThrottled(`brighten_progress_${userId}`, updatedLearningProgress);
        // Direct Firebase sync call without dependency
        setTimeout(() => scheduleFirebaseSync(), 0);
      }

      return updatedLearningProgress;
    });
  }, [userId, saveToLocalStorageThrottled]); // Removed scheduleFirebaseSync dependency

  const markLessonComplete = useCallback(async (lessonId: string): Promise<void> => {
    setLearningProgress(prev => {
      if (!prev) return null;

      const updatedProgress = {
        ...prev,
        lessonsCompleted: [...new Set([...prev.lessonsCompleted, lessonId])], // Avoid duplicates
        lessonsInProgress: {
          ...prev.lessonsInProgress,
          [lessonId]: {
            ...prev.lessonsInProgress[lessonId],
            completed: true,
            progressPercentage: 100,
            lastAccessedAt: new Date().toISOString()
          }
        }
      };

      // Save to localStorage with throttling, schedule Firebase sync
      if (userId) {
        saveToLocalStorageThrottled(`brighten_progress_${userId}`, updatedProgress);
        // Direct Firebase sync call without dependency
        setTimeout(() => scheduleFirebaseSync(), 0);
      }

      return updatedProgress;
    });
  }, [userId, saveToLocalStorageThrottled]); // Removed scheduleFirebaseSync dependency

  const getContinueLearningData = (): { lessonId: string; progress: LessonProgress } | null => {
    if (!learningProgress) return null;

    // Return the most recently accessed lesson that's not completed
    const inProgressLessons = Object.values(learningProgress.lessonsInProgress)
      .filter(lesson => !lesson.completed)
      .sort((a, b) => new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime());

    if (inProgressLessons.length > 0) {
      const recentLesson = inProgressLessons[0];
      return {
        lessonId: recentLesson.lessonId,
        progress: recentLesson
      };
    }

    // If current lesson ID is set but not in progress, return it
    if (learningProgress.currentLessonId) {
      const currentProgress = learningProgress.lessonsInProgress[learningProgress.currentLessonId];
      if (currentProgress && !currentProgress.completed) {
        return {
          lessonId: learningProgress.currentLessonId,
          progress: currentProgress
        };
      }
    }

    return null;
  };

  // Admin Management Functions
  const checkAdminPermission = (permission: keyof AdminPermissions): boolean => {
    return adminPermissions?.[permission] || false;
  };

  const createGrade = async (gradeData: Omit<CurriculumGrade, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>): Promise<CurriculumGrade> => {
    if (!dbInstance || !userId || !checkAdminPermission('canCreateGrades')) {
      throw new Error('Unauthorized to create grades');
    }

    const currentTime = new Date().toISOString();
    const newGrade: Omit<CurriculumGrade, 'id'> = {
      ...gradeData,
      createdAt: currentTime,
      updatedAt: currentTime,
      createdBy: userId
    };

    try {
      const docRef = await addDoc(collection(dbInstance, 'curriculum_grades'), newGrade);
      return { id: docRef.id, ...newGrade };
    } catch (error) {
      console.error('Error creating grade:', error);
      throw error;
    }
  };

  const updateGrade = async (gradeId: string, gradeData: Partial<CurriculumGrade>): Promise<void> => {
    if (!dbInstance || !checkAdminPermission('canEditGrades')) {
      throw new Error('Unauthorized to update grades');
    }

    try {
      const gradeRef = doc(dbInstance, 'curriculum_grades', gradeId);
      await updateDoc(gradeRef, {
        ...gradeData,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating grade:', error);
      throw error;
    }
  };

  const deleteGrade = async (gradeId: string): Promise<void> => {
    if (!dbInstance || !checkAdminPermission('canDeleteGrades')) {
      throw new Error('Unauthorized to delete grades');
    }

    try {
      const gradeRef = doc(dbInstance, 'curriculum_grades', gradeId);
      await deleteDoc(gradeRef);
    } catch (error) {
      console.error('Error deleting grade:', error);
      throw error;
    }
  };

  const createSubject = async (subjectData: Omit<CurriculumSubjectAdmin, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'totalTopics'>): Promise<CurriculumSubjectAdmin> => {
    if (!dbInstance || !userId || !checkAdminPermission('canCreateSubjects')) {
      throw new Error('Unauthorized to create subjects');
    }

    const currentTime = new Date().toISOString();
    const newSubject: Omit<CurriculumSubjectAdmin, 'id'> = {
      ...subjectData,
      totalTopics: 0,
      createdAt: currentTime,
      updatedAt: currentTime,
      createdBy: userId
    };

    try {
      const docRef = await addDoc(collection(dbInstance, 'curriculum_subjects'), newSubject);
      return { id: docRef.id, ...newSubject };
    } catch (error) {
      console.error('Error creating subject:', error);
      throw error;
    }
  };

  const updateSubject = async (subjectId: string, subjectData: Partial<CurriculumSubjectAdmin>): Promise<void> => {
    if (!dbInstance || !checkAdminPermission('canEditSubjects')) {
      throw new Error('Unauthorized to update subjects');
    }

    try {
      const subjectRef = doc(dbInstance, 'curriculum_subjects', subjectId);
      await updateDoc(subjectRef, {
        ...subjectData,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating subject:', error);
      throw error;
    }
  };

  const deleteSubject = async (subjectId: string): Promise<void> => {
    if (!dbInstance || !checkAdminPermission('canDeleteSubjects')) {
      throw new Error('Unauthorized to delete subjects');
    }

    try {
      const subjectRef = doc(dbInstance, 'curriculum_subjects', subjectId);
      await deleteDoc(subjectRef);
    } catch (error) {
      console.error('Error deleting subject:', error);
      throw error;
    }
  };

  const createTopic = async (topicData: Omit<CurriculumTopicAdmin, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>): Promise<CurriculumTopicAdmin> => {
    if (!dbInstance || !userId || !checkAdminPermission('canCreateTopics')) {
      throw new Error('Unauthorized to create topics');
    }

    const currentTime = new Date().toISOString();
    const newTopic: Omit<CurriculumTopicAdmin, 'id'> = {
      ...topicData,
      createdAt: currentTime,
      updatedAt: currentTime,
      createdBy: userId
    };

    try {
      const docRef = await addDoc(collection(dbInstance, 'curriculum_topics'), newTopic);
      
      // Update subject's total topics count
      const subjectRef = doc(dbInstance, 'curriculum_subjects', topicData.subjectId);
      const subjectDoc = await getDoc(subjectRef);
      if (subjectDoc.exists()) {
        const currentTotal = subjectDoc.data().totalTopics || 0;
        await updateDoc(subjectRef, { totalTopics: currentTotal + 1 });
      }
      
      return { id: docRef.id, ...newTopic };
    } catch (error) {
      console.error('Error creating topic:', error);
      throw error;
    }
  };

  const updateTopic = async (topicId: string, topicData: Partial<CurriculumTopicAdmin>): Promise<void> => {
    if (!dbInstance || !checkAdminPermission('canEditTopics')) {
      throw new Error('Unauthorized to update topics');
    }

    try {
      const topicRef = doc(dbInstance, 'curriculum_topics', topicId);
      await updateDoc(topicRef, {
        ...topicData,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating topic:', error);
      throw error;
    }
  };

  const deleteTopic = async (topicId: string): Promise<void> => {
    if (!dbInstance || !checkAdminPermission('canDeleteTopics')) {
      throw new Error('Unauthorized to delete topics');
    }

    try {
      // Get topic data to find subject ID
      const topicRef = doc(dbInstance, 'curriculum_topics', topicId);
      const topicDoc = await getDoc(topicRef);
      
      if (topicDoc.exists()) {
        const topicData = topicDoc.data() as CurriculumTopicAdmin;
        
        // Delete the topic
        await deleteDoc(topicRef);
        
        // Update subject's total topics count
        const subjectRef = doc(dbInstance, 'curriculum_subjects', topicData.subjectId);
        const subjectDoc = await getDoc(subjectRef);
        if (subjectDoc.exists()) {
          const currentTotal = subjectDoc.data().totalTopics || 0;
          await updateDoc(subjectRef, { totalTopics: Math.max(0, currentTotal - 1) });
        }
      }
    } catch (error) {
      console.error('Error deleting topic:', error);
      throw error;
    }
  };

  const getAllGrades = async (): Promise<CurriculumGrade[]> => {
    if (!dbInstance) {
      throw new Error('Database not available');
    }

    try {
      const gradesQuery = query(
        collection(dbInstance, 'curriculum_grades'),
        where('isActive', '==', true)
      );
      const querySnapshot = await getDocs(gradesQuery);
      const grades = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CurriculumGrade));
      
      // Sort by gradeNumber in JavaScript to avoid composite index requirement
      return grades.sort((a, b) => a.gradeNumber - b.gradeNumber);
    } catch (error) {
      console.error('Error getting grades:', error);
      throw error;
    }
  };

  const getAllSubjects = async (gradeId?: string): Promise<CurriculumSubjectAdmin[]> => {
    if (!dbInstance) {
      throw new Error('Database not available');
    }

    try {
      let subjectsQuery;
      if (gradeId) {
        subjectsQuery = query(
          collection(dbInstance, 'curriculum_subjects'),
          where('gradeId', '==', gradeId),
          where('isActive', '==', true)
        );
      } else {
        subjectsQuery = query(
          collection(dbInstance, 'curriculum_subjects'),
          where('isActive', '==', true)
        );
      }
      
      const querySnapshot = await getDocs(subjectsQuery);
      const subjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CurriculumSubjectAdmin));
      
      // Sort by name in JavaScript to avoid composite index requirement
      return subjects.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error('Error getting subjects:', error);
      throw error;
    }
  };

  const getAllTopics = async (subjectId?: string): Promise<CurriculumTopicAdmin[]> => {
    if (!dbInstance) {
      throw new Error('Database not available');
    }

    try {
      let topicsQuery;
      if (subjectId) {
        topicsQuery = query(
          collection(dbInstance, 'curriculum_topics'),
          where('subjectId', '==', subjectId),
          where('isActive', '==', true)
        );
      } else {
        topicsQuery = query(
          collection(dbInstance, 'curriculum_topics'),
          where('isActive', '==', true)
        );
      }
      
      const querySnapshot = await getDocs(topicsQuery);
      const topics = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CurriculumTopicAdmin));
      
      // Sort by order in JavaScript to avoid composite index requirement
      return topics.sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error('Error getting topics:', error);
      throw error;
    }
  };

  // Helper function to get or create persistent anonymous user ID
  const getOrCreateAnonymousUserId = (): string => {
    const storageKey = 'brighten_anonymous_user_id';
    let anonymousUserId = localStorage.getItem(storageKey);
    
    if (!anonymousUserId) {
      anonymousUserId = `anon_${crypto.randomUUID()}`;
      localStorage.setItem(storageKey, anonymousUserId);
    }
    
    return anonymousUserId;
  };



  // Memoized helper function to load preferences for a user
  const loadUserPreferences = useCallback(async (uid: string, isAnonymous: boolean): Promise<void> => {
    try {
      if (isAnonymous) {
        // For anonymous users, load from localStorage
        const localPrefs = localStorage.getItem(`brighten_preferences_${uid}`);
        if (localPrefs) {
          setUserPreferences({ ...defaultPreferences, ...JSON.parse(localPrefs) });
        }
      } else if (dbInstance) {
        // For authenticated users, load from Firestore - use same path as settings page
        const appId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'brighten-app';
        const userDocRef = doc(dbInstance, `artifacts/${appId}/users/${uid}/preferences/user_settings`);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setUserPreferences({ ...defaultPreferences, ...docSnap.data() } as UserPreferences);
        }
      }
    } catch (error) {
      console.error("Error loading user preferences:", error);
    } finally {
      setIsPreferencesLoaded(true);
    }
  }, [dbInstance]);

  // Memoized helper function to load learning progress for a user
  const loadUserLearningProgress = useCallback(async (uid: string, isAnonymous: boolean): Promise<void> => {
    setIsProgressLoading(true);
    
    try {
      let progressData: LearningProgress | null = null;
      
      if (isAnonymous || !dbInstance) {
        // For anonymous users or offline mode, load from localStorage
        const localProgress = localStorage.getItem(`brighten_progress_${uid}`);
        if (localProgress) {
          progressData = JSON.parse(localProgress) as LearningProgress;
        }
      } else {
        // For authenticated users, try Firestore first, then localStorage
        try {
          const progressDocRef = doc(dbInstance, `users/${uid}/progress/learning_progress`);
          const docSnap = await getDoc(progressDocRef);
          
          if (docSnap.exists()) {
            progressData = docSnap.data() as LearningProgress;
          } else {
            // Fallback to localStorage
            const localProgress = localStorage.getItem(`brighten_progress_${uid}`);
            if (localProgress) {
              progressData = JSON.parse(localProgress) as LearningProgress;
            }
          }
        } catch (firestoreError) {
          console.error("Error loading progress from Firestore:", firestoreError);
          // Fallback to localStorage
          const localProgress = localStorage.getItem(`brighten_progress_${uid}`);
          if (localProgress) {
            progressData = JSON.parse(localProgress) as LearningProgress;
          }
        }
      }
      
      if (progressData) {
        setLearningProgress(progressData);
        // Restore current enrollment from progress data
        if (progressData.currentEnrollment) {
          setCurrentEnrollment(progressData.currentEnrollment);
        }
      } else {
        // Initialize with default progress
        setLearningProgress(defaultLearningProgress);
      }
    } catch (error) {
      console.error("Error loading learning progress:", error);
      setLearningProgress(defaultLearningProgress);
    } finally {
      setIsProgressLoading(false);
    }
  }, [dbInstance]);

  // Firebase Auth and Firestore setup
  useEffect(() => {
    if (!authInstance || !dbInstance) {
      console.warn("Firebase not initialized. Running in offline mode.");
      // Use persistent anonymous user ID for offline mode
      const persistentUserId = getOrCreateAnonymousUserId();
      setUserId(persistentUserId);
      setIsUserAnonymous(true);
      
      // Load preferences and progress for offline mode
      loadUserPreferences(persistentUserId, true);
      loadUserLearningProgress(persistentUserId, true);
      
      setAuthState({
        user: {
          uid: persistentUserId,
          email: null,
          displayName: null,
          photoURL: null,
          isAnonymous: true
        },
        isAuthenticated: true,
        isAnonymous: true,
        isLoading: false,
        isAdmin: false,
        isSuperAdmin: false
      });
      setIsAuthReady(true);
      return; // Early return for offline mode
    }

    const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
        if (user) {
          const mappedUser = mapFirebaseUser(user);
          const { role, permissions } = await checkUserRole(user);
          
          // Update mapped user with role
          mappedUser.role = role as 'student' | 'admin' | 'super_admin';
          
          // For anonymous users from Firebase, use persistent ID if available
          let finalUserId = user.uid;
          if (user.isAnonymous) {
            const persistentId = getOrCreateAnonymousUserId();
            finalUserId = persistentId;
            mappedUser.uid = persistentId;
          }
          
          setUserId(finalUserId);
          setIsUserAnonymous(user.isAnonymous);
          setAdminPermissions(permissions);
          setAuthState({
            user: mappedUser,
            isAuthenticated: true,
            isAnonymous: user.isAnonymous,
            isLoading: false,
            isAdmin: role === 'admin' || role === 'super_admin',
            isSuperAdmin: role === 'super_admin'
          });

          // Load preferences and progress using the helper functions
          await loadUserPreferences(finalUserId, user.isAnonymous);
          await loadUserLearningProgress(finalUserId, user.isAnonymous);
        } else {
          try {
            // Sign in anonymously if no user is logged in
            await signInAnonymously(authInstance);
          } catch (error) {
            console.error("Error signing in anonymously:", error);
            // Fallback to persistent anonymous user ID
            const persistentUserId = getOrCreateAnonymousUserId();
            setUserId(persistentUserId);
            setIsUserAnonymous(true);
            
            // Load preferences and progress for fallback mode
            await loadUserPreferences(persistentUserId, true);
            await loadUserLearningProgress(persistentUserId, true);
            
            setAuthState({
              user: {
                uid: persistentUserId,
                email: null,
                displayName: null,
                photoURL: null,
                isAnonymous: true
              },
              isAuthenticated: true,
              isAnonymous: true,
              isLoading: false,
              isAdmin: false,
              isSuperAdmin: false
            });
          }
        }
        setIsAuthReady(true);
      });

    return () => {
      unsubscribe();
      // Clear any pending Firebase sync
      if (firebaseSyncTimeoutRef.current) {
        clearTimeout(firebaseSyncTimeoutRef.current);
      }
    };
  }, []);

  // Apply user preferences to body style
  useEffect(() => {
    document.body.style.fontFamily = userPreferences.fontFamily;
    document.body.style.fontSize = `${userPreferences.fontSize}px`;
    document.body.style.letterSpacing = `${userPreferences.letterSpacing}px`;
    document.body.style.backgroundColor = userPreferences.backgroundColor;
    document.body.style.color = userPreferences.textColor;
  }, [userPreferences]);

  // Memoized helper function to save preferences to appropriate storage
  const savePreferencesToStorage = useCallback((preferences: UserPreferences) => {
    if (dbInstance && userId && !authState.isAnonymous) {
      // Save to Firestore for authenticated users - use same path as settings page
      const appId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'brighten-app';
      const userDocRef = doc(dbInstance, `artifacts/${appId}/users/${userId}/preferences/user_settings`);
      setDoc(userDocRef, preferences).catch(error => {
        console.error("Error saving user preferences to Firestore:", error);
        // Fallback to localStorage
        if (userId) {
          localStorage.setItem(`brighten_preferences_${userId}`, JSON.stringify(preferences));
        }
      });
    } else if (userId) {
      // Save to localStorage for anonymous users or offline mode
      localStorage.setItem(`brighten_preferences_${userId}`, JSON.stringify(preferences));
    }
  }, [dbInstance, userId, authState.isAnonymous]);

  // Memoized wrapper function that handles both React state updates and async Firebase operations
  const handleUserPreferencesUpdate = useCallback((value: React.SetStateAction<UserPreferences>) => {
    if (typeof value === 'function') {
      // Handle function form: setUserPreferences(prev => newState)
      setUserPreferences(prev => {
        const newPreferences = value(prev);
        // Save preferences
        savePreferencesToStorage(newPreferences);
        return newPreferences;
      });
    } else {
      // Handle direct value form: setUserPreferences(newValue)
      setUserPreferences(value);
      // Save preferences
      savePreferencesToStorage(value);
    }
  }, [savePreferencesToStorage]);

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
    setUserPreferences: handleUserPreferencesUpdate,
    isPreferencesLoaded,
    userId,
    isAuthReady,
    authState,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    changePassword,
    deleteAccount,
    showPasteTextModal,
    setShowPasteTextModal,
    pasteTextContent,
    setPasteTextContent,
    loadingText,
    setLoadingText,
    currentEnrollment,
    setCurrentEnrollment: updateCurrentEnrollment,
    db: dbInstance,
    auth: authInstance,
    appId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'brighten-app',
    // Learning Progress Management
    learningProgress,
    setLearningProgress,
    isProgressLoading,
    updateLessonProgress,
    markLessonComplete,
    saveLearningProgress,
    getContinueLearningData,
    // Admin Management
    adminPermissions,
    checkAdminPermission,
    createGrade,
    updateGrade,
    deleteGrade,
    createSubject,
    updateSubject,
    deleteSubject,
    createTopic,
    updateTopic,
    deleteTopic,
    getAllGrades,
    getAllSubjects,
    getAllTopics,
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