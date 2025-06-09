// ============================================================================
// FILE: lib/api.ts
// Description: Utility functions for interacting with Gemini API.
// ============================================================================
// These are utility functions, not React components, so no "use client" needed.
// They will be called from client components.
import type { CurriculumSubject } from '@/types';

export const callGeminiAPI = async (
  prompt: string,
  type: 'text' | 'image' = 'text',
  schema: object | null = null,
  setLoadingText: React.Dispatch<React.SetStateAction<string>>,
  customAlert: (message: string) => void
): Promise<string | object | null> => {
  setLoadingText(`Generating ${type}...`);
  try {
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    let payload: any = { contents: chatHistory };
    if (schema) {
      payload.generationConfig = {
        responseMimeType: "application/json",
        responseSchema: schema
      };
    }

    const apiKey = ""; // Canvas will automatically provide this
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    setLoadingText('');

    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
      const text = result.candidates[0].content.parts[0].text;
      if (schema) {
        return JSON.parse(text);
      }
      return text;
    } else {
      console.error("Unexpected API response structure:", result);
      customAlert("Failed to generate content. Please try again.");
      return null;
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    setLoadingText('');
    customAlert("An error occurred during AI generation. Please try again.");
    return null;
  }
};

export const generateVisualization = async (
  visualPrompt: string,
  setLoadingText: React.Dispatch<React.SetStateAction<string>>,
  setSelectedLesson: React.Dispatch<React.SetStateAction<CurriculumSubject | null>>,
  customAlert: (message: string) => void
): Promise<void> => {
  setLoadingText('Generating visualization...');
  try {
    const apiKey = ""; // Canvas will automatically provide this
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;
    const payload = { instances: { prompt: visualPrompt }, parameters: { "sampleCount": 1 } };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    setLoadingText('');

    if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
      const imageUrl: string = `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
      setSelectedLesson(prev => {
        if (prev) {
          return {
            ...prev,
            visual: imageUrl
          };
        }
        return null;
      });
    } else {
      console.error("Unexpected image generation API response structure:", result);
      customAlert("Failed to generate visualization. Please try again.");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    setLoadingText('');
    customAlert("An error occurred during image generation. Please try again.");
  }
};