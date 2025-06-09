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
  
  export interface AppContextType {
    selectedLesson: CurriculumSubject | null;
    setSelectedLesson: React.Dispatch<React.SetStateAction<CurriculumSubject | null>>;
    userPreferences: UserPreferences;
    setUserPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
    userId: string | null;
    isAuthReady: boolean;
    showPasteTextModal: boolean;
    setShowPasteTextModal: React.Dispatch<React.SetStateAction<boolean>>;
    pasteTextContent: string;
    setPasteTextContent: React.Dispatch<React.SetStateAction<string>>;
    loadingText: string;
    setLoadingText: React.Dispatch<React.SetStateAction<string>>;
    db: any; // Firestore instance
    auth: any; // Auth instance
    appId: string;
  }