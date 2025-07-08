// ============================================================================
// FILE: context/AppContext.tsx
// Description: React Context for managing global state (user preferences,
// selected lesson, loading states, Firebase instances).
// MUST be a client component as it uses useState, useEffect, and Firebase client SDK.
// ============================================================================
"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
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
  updateProfile
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
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
  const [showPasteTextModal, setShowPasteTextModal] = useState<boolean>(false);
  const [pasteTextContent, setPasteTextContent] = useState<string>('');
  const [loadingText, setLoadingText] = useState<string>('');
  
  // New state for current enrollment
  const [currentEnrollment, setCurrentEnrollment] = useState<{
    grade: string;
    subject: string;
    topic: string;
  } | null>(null);
  
  // Learning Progress state
  const [learningProgress, setLearningProgress] = useState<LearningProgress | null>(null);
  
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

  // Learning Progress Management Functions
  const saveLearningProgress = async (): Promise<void> => {
    if (!learningProgress || !userId) return;

    try {
      if (dbInstance) {
        // Save to Firebase
        const progressDocRef = doc(dbInstance, `users/${userId}/progress/learning_progress`);
        await setDoc(progressDocRef, learningProgress);
      } else {
        // Fallback to localStorage
        localStorage.setItem(`brighten_progress_${userId}`, JSON.stringify(learningProgress));
      }
    } catch (error) {
      console.error("Error saving learning progress:", error);
      // Fallback to localStorage if Firebase fails
      if (userId) {
        localStorage.setItem(`brighten_progress_${userId}`, JSON.stringify(learningProgress));
      }
    }
  };

  const loadLearningProgress = async (): Promise<void> => {
    if (!userId) return;

    try {
      if (dbInstance) {
        // Try to load from Firebase first
        const progressDocRef = doc(dbInstance, `users/${userId}/progress/learning_progress`);
        const docSnap = await getDoc(progressDocRef);
        
        if (docSnap.exists()) {
          const progressData = docSnap.data() as LearningProgress;
          setLearningProgress(progressData);
          return;
        }
      }
      
      // Fallback to localStorage
      const localProgress = localStorage.getItem(`brighten_progress_${userId}`);
      if (localProgress) {
        const progressData = JSON.parse(localProgress) as LearningProgress;
        setLearningProgress(progressData);
        return;
      }
      
      // If no progress found, initialize with default
      setLearningProgress(defaultLearningProgress);
    } catch (error) {
      console.error("Error loading learning progress:", error);
      // Try localStorage as fallback
      try {
        const localProgress = localStorage.getItem(`brighten_progress_${userId}`);
        if (localProgress) {
          const progressData = JSON.parse(localProgress) as LearningProgress;
          setLearningProgress(progressData);
        } else {
          setLearningProgress(defaultLearningProgress);
        }
      } catch {
        setLearningProgress(defaultLearningProgress);
      }
    }
  };

  const updateLessonProgress = async (lessonId: string, progressData: Partial<LessonProgress>): Promise<void> => {
    if (!learningProgress) return;

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

      // Auto-save after updating
      setTimeout(() => {
        if (dbInstance && userId) {
          const progressDocRef = doc(dbInstance, `users/${userId}/progress/learning_progress`);
          setDoc(progressDocRef, updatedLearningProgress).catch(error => {
            console.error("Error auto-saving progress:", error);
            // Fallback to localStorage
            localStorage.setItem(`brighten_progress_${userId}`, JSON.stringify(updatedLearningProgress));
          });
        } else if (userId) {
          localStorage.setItem(`brighten_progress_${userId}`, JSON.stringify(updatedLearningProgress));
        }
      }, 1000); // Debounce auto-save by 1 second

      return updatedLearningProgress;
    });
  };

  const markLessonComplete = async (lessonId: string): Promise<void> => {
    if (!learningProgress) return;

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

      // Auto-save completion
      setTimeout(async () => {
        try {
          if (dbInstance && userId) {
            const progressDocRef = doc(dbInstance, `users/${userId}/progress/learning_progress`);
            await setDoc(progressDocRef, updatedProgress);
          } else if (userId) {
            localStorage.setItem(`brighten_progress_${userId}`, JSON.stringify(updatedProgress));
          }
        } catch (error) {
          console.error("Error saving lesson completion:", error);
        }
      }, 100);

      return updatedProgress;
    });
  };

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
        where('isActive', '==', true),
        orderBy('gradeNumber', 'asc')
      );
      const querySnapshot = await getDocs(gradesQuery);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CurriculumGrade));
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
          where('isActive', '==', true),
          orderBy('name', 'asc')
        );
      } else {
        subjectsQuery = query(
          collection(dbInstance, 'curriculum_subjects'),
          where('isActive', '==', true),
          orderBy('name', 'asc')
        );
      }
      
      const querySnapshot = await getDocs(subjectsQuery);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CurriculumSubjectAdmin));
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
          where('isActive', '==', true),
          orderBy('order', 'asc')
        );
      } else {
        topicsQuery = query(
          collection(dbInstance, 'curriculum_topics'),
          where('isActive', '==', true),
          orderBy('order', 'asc')
        );
      }
      
      const querySnapshot = await getDocs(topicsQuery);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CurriculumTopicAdmin));
    } catch (error) {
      console.error('Error getting topics:', error);
      throw error;
    }
  };

  // Firebase Auth and Firestore setup
  useEffect(() => {
    if (!authInstance || !dbInstance) {
      console.warn("Firebase not initialized. Running in offline mode.");
      // Generate a temporary user ID for offline mode
      const tempUserId = crypto.randomUUID();
      setUserId(tempUserId);
      setAuthState({
        user: {
          uid: tempUserId,
          email: null,
          displayName: null,
          photoURL: null,
          isAnonymous: true
        },
        isAuthenticated: true,
        isAnonymous: true,
        isLoading: false
      });
      setIsAuthReady(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
      if (user) {
        const mappedUser = mapFirebaseUser(user);
        const { role, permissions } = await checkUserRole(user);
        
        // Update mapped user with role
        mappedUser.role = role as 'student' | 'admin' | 'super_admin';
        
        setUserId(user.uid);
        setAdminPermissions(permissions);
        setAuthState({
          user: mappedUser,
          isAuthenticated: true,
          isAnonymous: user.isAnonymous,
          isLoading: false,
          isAdmin: role === 'admin' || role === 'super_admin',
          isSuperAdmin: role === 'super_admin'
        });

        try {
          // Try to load user preferences from Firestore
          const userDocRef = doc(dbInstance, `users/${user.uid}/preferences/user_settings`);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            setUserPreferences({ ...defaultPreferences, ...docSnap.data() } as UserPreferences);
          }
          
          // Load learning progress
          await loadLearningProgress();
        } catch (error) {
          console.error("Error loading user data:", error);
          // Still try to load progress even if preferences fail
          try {
            await loadLearningProgress();
          } catch (progressError) {
            console.error("Error loading learning progress:", progressError);
          }
        }
      } else {
        try {
          // Sign in anonymously if no user is logged in
          await signInAnonymously(authInstance);
        } catch (error) {
          console.error("Error signing in anonymously:", error);
          // Fallback to generating a random user ID
          const tempUserId = crypto.randomUUID();
          setUserId(tempUserId);
          setAuthState({
            user: {
              uid: tempUserId,
              email: null,
              displayName: null,
              photoURL: null,
              isAnonymous: true
            },
            isAuthenticated: true,
            isAnonymous: true,
            isLoading: false
          });
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

  // Wrapper function that handles both React state updates and async Firebase operations
  const handleUserPreferencesUpdate = (value: React.SetStateAction<UserPreferences>) => {
    if (typeof value === 'function') {
      // Handle function form: setUserPreferences(prev => newState)
      setUserPreferences(prev => {
        const newPreferences = value(prev);
        // Save to Firebase asynchronously
        if (dbInstance && userId) {
          const userDocRef = doc(dbInstance, `users/${userId}/preferences/user_settings`);
          setDoc(userDocRef, newPreferences).catch(error => {
            console.error("Error saving user preferences:", error);
          });
        }
        return newPreferences;
      });
    } else {
      // Handle direct value form: setUserPreferences(newValue)
      setUserPreferences(value);
      // Save to Firebase asynchronously
      if (dbInstance && userId) {
        const userDocRef = doc(dbInstance, `users/${userId}/preferences/user_settings`);
        setDoc(userDocRef, value).catch(error => {
          console.error("Error saving user preferences:", error);
        });
      }
    }
  };

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
    userId,
    isAuthReady,
    authState,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    showPasteTextModal,
    setShowPasteTextModal,
    pasteTextContent,
    setPasteTextContent,
    loadingText,
    setLoadingText,
    currentEnrollment,
    setCurrentEnrollment,
    db: dbInstance,
    auth: authInstance,
    appId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'brighten-app',
    // Learning Progress Management
    learningProgress,
    setLearningProgress,
    updateLessonProgress,
    markLessonComplete,
    saveLearningProgress,
    loadLearningProgress,
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