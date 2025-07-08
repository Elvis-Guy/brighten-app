// ============================================================================
// FILE: types/index.ts
// Description: Centralized type definitions for the application.
// ============================================================================
export interface UserPreferences {
    fontFamily: string;
    fontSize: number;
    letterSpacing: number;
    backgroundColor: string;
    textColor: string;
    highContrastMode: boolean;
    voice: 'female' | 'male';
    speakingRate: number;
    language: string;
  }
  
  export interface LessonContent {
    original: string;
    simplified: string;
    visualPrompt: string;
  }
  
  export interface CurriculumSubject {
    id: string;
    title: string;
    lessons: number;
    progress: number;
    topic: string;
    description: string;
    image: string;
    content: LessonContent;
    visual?: string; // Optional: for AI-generated visualization
  }

  // New types for curriculum content from JSON
  export interface CurriculumTopic {
    topic: string;
    content: string;
  }

  export interface CurriculumSubjectData {
    grade: number;
    subject: string;
    topics: CurriculumTopic[];
  }

  export interface CurriculumData {
    curriculum: {
      [grade: string]: {
        [subject: string]: CurriculumSubjectData;
      };
    };
  }

  // Enhanced type for current lesson that includes curriculum context
  export interface CurrentLesson extends CurriculumSubject {
    grade?: number;
    subjectKey?: string;
    gradeKey?: string;
  }

  // Learning Progress Types
  export interface LessonProgress {
    lessonId: string;
    completed: boolean;
    progressPercentage: number; // 0-100
    lastAccessedAt: string; // ISO timestamp
    timeSpentMinutes: number;
    currentSection?: string; // Which part of the lesson they're on
    completedSections: string[]; // Completed sections within the lesson
    bookmarks: string[]; // Bookmarked sections or text snippets
  }

  export interface LearningProgress {
    currentLessonId: string | null;
    lastAccessedAt: string; // ISO timestamp
    totalTimeSpentMinutes: number;
    lessonsCompleted: string[]; // Array of completed lesson IDs
    lessonsInProgress: { [lessonId: string]: LessonProgress };
    currentEnrollment: {
      grade: string;
      subject: string;
      topic: string;
    } | null;
    achievements: string[]; // Achievement IDs or milestones
    streakDays: number; // Consecutive days of learning
    lastActiveDate: string; // ISO date string for streak tracking
  }

  // Authentication types
  export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    isAnonymous: boolean;
    createdAt?: string;
    role?: 'student' | 'admin' | 'super_admin';
    permissions?: string[];
  }

  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isAnonymous: boolean;
    isLoading: boolean;
    isAdmin: boolean;
    isSuperAdmin: boolean;
  }

  // Admin/Curriculum Management Types
  export interface CurriculumGrade {
    id: string;
    gradeNumber: number;
    name: string; // e.g., "Grade 10", "Form 1"
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    createdBy: string; // admin user ID
  }

  export interface CurriculumSubjectAdmin {
    id: string;
    name: string; // e.g., "Mathematics", "Science"
    code: string; // e.g., "MATH", "SCI" 
    description?: string;
    gradeId: string;
    isActive: boolean;
    totalTopics: number;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
  }

  export interface CurriculumTopicAdmin {
    id: string;
    title: string;
    content: string;
    subjectId: string;
    gradeId: string;
    order: number; // for ordering topics within a subject
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedDuration: number; // in minutes
    learningObjectives: string[];
    keywords: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
  }

  export interface AdminPermissions {
    canCreateGrades: boolean;
    canEditGrades: boolean;
    canDeleteGrades: boolean;
    canCreateSubjects: boolean;
    canEditSubjects: boolean;
    canDeleteSubjects: boolean;
    canCreateTopics: boolean;
    canEditTopics: boolean;
    canDeleteTopics: boolean;
    canViewAnalytics: boolean;
    canManageUsers: boolean;
  }
  
  export interface AppContextType {
    selectedLesson: CurrentLesson | null;
    setSelectedLesson: React.Dispatch<React.SetStateAction<CurrentLesson | null>>;
    userPreferences: UserPreferences;
    setUserPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
    userId: string | null;
    isAuthReady: boolean;
    authState: AuthState;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, displayName: string) => Promise<void>;
    signOut: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    showPasteTextModal: boolean;
    setShowPasteTextModal: React.Dispatch<React.SetStateAction<boolean>>;
    pasteTextContent: string;
    setPasteTextContent: React.Dispatch<React.SetStateAction<string>>;
    loadingText: string;
    setLoadingText: React.Dispatch<React.SetStateAction<string>>;
    db: any; // Firestore instance
    auth: any; // Auth instance
    appId: string;
    // Current enrollment (keeping for backward compatibility)
    currentEnrollment: {
      grade: string;
      subject: string;
      topic: string;
    } | null;
    setCurrentEnrollment: React.Dispatch<React.SetStateAction<{
      grade: string;
      subject: string;
      topic: string;
    } | null>>;
    // Learning Progress Management
    learningProgress: LearningProgress | null;
    setLearningProgress: React.Dispatch<React.SetStateAction<LearningProgress | null>>;
    updateLessonProgress: (lessonId: string, progressData: Partial<LessonProgress>) => Promise<void>;
    markLessonComplete: (lessonId: string) => Promise<void>;
    saveLearningProgress: () => Promise<void>;
    loadLearningProgress: () => Promise<void>;
    getContinueLearningData: () => { lessonId: string; progress: LessonProgress } | null;
    // Admin Management
    adminPermissions: AdminPermissions | null;
    checkAdminPermission: (permission: keyof AdminPermissions) => boolean;
    createGrade: (gradeData: Omit<CurriculumGrade, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => Promise<CurriculumGrade>;
    updateGrade: (gradeId: string, gradeData: Partial<CurriculumGrade>) => Promise<void>;
    deleteGrade: (gradeId: string) => Promise<void>;
    createSubject: (subjectData: Omit<CurriculumSubjectAdmin, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'totalTopics'>) => Promise<CurriculumSubjectAdmin>;
    updateSubject: (subjectId: string, subjectData: Partial<CurriculumSubjectAdmin>) => Promise<void>;
    deleteSubject: (subjectId: string) => Promise<void>;
    createTopic: (topicData: Omit<CurriculumTopicAdmin, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => Promise<CurriculumTopicAdmin>;
    updateTopic: (topicId: string, topicData: Partial<CurriculumTopicAdmin>) => Promise<void>;
    deleteTopic: (topicId: string) => Promise<void>;
    getAllGrades: () => Promise<CurriculumGrade[]>;
    getAllSubjects: (gradeId?: string) => Promise<CurriculumSubjectAdmin[]>;
    getAllTopics: (subjectId?: string) => Promise<CurriculumTopicAdmin[]>;
  }