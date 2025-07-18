// ============================================================================
// FILE: components/ui/TextToSpeech.tsx
// Description: Improved TextToSpeech component for dyslexic learners
// ============================================================================
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon, StopIcon, SpeakerWaveIcon } from '@/components/icons';
import { useAppContext } from '@/context/AppContext';

interface TextToSpeechProps {
  text: string;
  disabled?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

type SpeechState = 'idle' | 'playing' | 'paused' | 'loading';

const TextToSpeech: React.FC<TextToSpeechProps> = ({
  text,
  disabled = false,
  className = '',
  size = 'medium',
  showLabel = true,
  onStart,
  onEnd,
  onError
}) => {
  const { userPreferences, isPreferencesLoaded } = useAppContext();
  const [speechState, setSpeechState] = useState<SpeechState>('idle');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isIntentionalStopRef = useRef<boolean>(false);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    // Load voices immediately
    loadVoices();

    // Some browsers load voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Get the best voice based on user preferences
  const getBestVoice = (): SpeechSynthesisVoice | null => {
    if (availableVoices.length === 0) return null;

    // Use loaded preferences if available, otherwise default to female
    const preferredGender = isPreferencesLoaded ? userPreferences.voice : 'female';
    const language = isPreferencesLoaded && userPreferences.language === 'English' ? 'en' : 'en';
    
    // Filter voices by language first
    const languageVoices = availableVoices.filter(voice => 
      voice.lang.toLowerCase().startsWith(language.toLowerCase())
    );

    if (languageVoices.length === 0) {
      // Fallback to all voices if no language match
      return availableVoices[0];
    }

    // Priority order for voice selection
    const voicePriorities = {
      female: [
        // High quality female voices
        'Samantha', 'Victoria', 'Kate', 'Susan', 'Allison', 'Ava',
        // Google voices
        'Google UK English Female', 'Google US English Female',
        // Microsoft voices
        'Microsoft Zira Desktop', 'Microsoft Hazel Desktop',
        // Generic female indicators
        'female', 'woman'
      ],
      male: [
        // High quality male voices
        'Alex', 'Daniel', 'Tom', 'Oliver', 'Arthur', 'Thomas',
        // Google voices
        'Google UK English Male', 'Google US English Male',
        // Microsoft voices
        'Microsoft David Desktop', 'Microsoft Mark Desktop',
        // Generic male indicators
        'male', 'man'
      ]
    };

    const priorities = voicePriorities[preferredGender] || voicePriorities.female;

    // Try to find the best match by priority
    for (const priority of priorities) {
      const voice = languageVoices.find(v => 
        v.name.toLowerCase().includes(priority.toLowerCase())
      );
      if (voice) return voice;
    }

    // Fallback: try to find any voice that matches gender
    const genderMatch = languageVoices.find(voice => {
      const voiceName = voice.name.toLowerCase();
      if (preferredGender === 'female') {
        return voiceName.includes('female') || voiceName.includes('woman') || 
               voiceName.includes('samantha') || voiceName.includes('kate');
      } else {
        return voiceName.includes('male') || voiceName.includes('man') || 
               voiceName.includes('alex') || voiceName.includes('daniel');
      }
    });

    return genderMatch || languageVoices[0];
  };

  const speak = () => {
    if (!text.trim() || disabled) return;

    // Stop any current speech
    stop();

    setSpeechState('loading');

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      const selectedVoice = getBestVoice();

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Configure speech parameters for dyslexic learners
      utterance.rate = isPreferencesLoaded ? (userPreferences.speakingRate || 0.9) : 0.9; // Slightly slower default
      utterance.pitch = 1.0; // Natural pitch
      utterance.volume = 1.0; // Full volume
      utterance.lang = isPreferencesLoaded && userPreferences.language === 'English' ? 'en-US' : 'en-US';

      // Event handlers
      utterance.onstart = () => {
        setSpeechState('playing');
        onStart?.();
      };

      utterance.onend = () => {
        setSpeechState('idle');
        utteranceRef.current = null;
        isIntentionalStopRef.current = false; // Reset flag on natural end
        onEnd?.();
      };

      utterance.onerror = (event) => {
        setSpeechState('idle');
        utteranceRef.current = null;
        
        // Don't report errors if we intentionally stopped the speech
        if (!isIntentionalStopRef.current) {
          const errorMessage = `Speech synthesis error: ${event.error}`;
          console.error(errorMessage);
          onError?.(errorMessage);
        }
        
        // Reset the flag
        isIntentionalStopRef.current = false;
      };

      utterance.onpause = () => {
        setSpeechState('paused');
      };

      utterance.onresume = () => {
        setSpeechState('playing');
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);

    } catch (error) {
      setSpeechState('idle');
      const errorMessage = 'Failed to initialize speech synthesis';
      console.error(errorMessage, error);
      onError?.(errorMessage);
    }
  };

  const pause = () => {
    if (speechState === 'playing' && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setSpeechState('paused');
    }
  };

  const resume = () => {
    if (speechState === 'paused') {
      window.speechSynthesis.resume();
      setSpeechState('playing');
    }
  };

  const stop = () => {
    // Set flag to indicate this is an intentional stop
    isIntentionalStopRef.current = true;
    
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
    setSpeechState('idle');
    utteranceRef.current = null;
  };

  const togglePlayback = () => {
    if (speechState === 'idle' || speechState === 'loading') {
      speak();
    } else if (speechState === 'playing') {
      pause();
    } else if (speechState === 'paused') {
      resume();
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  // Size configurations
  const sizeConfig = {
    small: {
      button: 'p-2',
      icon: 'h-4 w-4',
      text: 'text-xs'
    },
    medium: {
      button: 'p-2',
      icon: 'h-5 w-5',
      text: 'text-sm'
    },
    large: {
      button: 'p-3',
      icon: 'h-6 w-6',
      text: 'text-base'
    }
  };

  const config = sizeConfig[size];

  // Determine which icon to show
  const getIcon = () => {
    switch (speechState) {
      case 'loading':
        return <SpeakerWaveIcon className={`${config.icon} animate-pulse`} />;
      case 'playing':
        return <PauseIcon className={config.icon} />;
      case 'paused':
        return <PlayIcon className={config.icon} />;
      default:
        return <PlayIcon className={config.icon} />;
    }
  };

  const getButtonText = () => {
    switch (speechState) {
      case 'loading':
        return 'Loading...';
      case 'playing':
        return 'Pause';
      case 'paused':
        return 'Resume';
      default:
        return 'Listen';
    }
  };

  const isActive = speechState === 'playing' || speechState === 'paused';

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Main play/pause button */}
      <button
        onClick={togglePlayback}
        disabled={disabled || !text.trim() || speechState === 'loading'}
        className={`${config.button} rounded-full transition-all duration-200 flex items-center space-x-1 font-medium ${
          disabled || !text.trim()
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : isActive
            ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-md'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        aria-label={`${getButtonText()} text`}
      >
        {getIcon()}
        {showLabel && (
          <span className={`${config.text} hidden sm:inline`}>
            {getButtonText()}
          </span>
        )}
      </button>

      {/* Stop button (only show when active) */}
      {isActive && (
        <button
          onClick={stop}
          className={`${config.button} bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-all duration-200`}
          aria-label="Stop reading"
        >
          <StopIcon className={config.icon} />
        </button>
      )}
    </div>
  );
};

export default TextToSpeech; 