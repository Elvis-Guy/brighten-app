// ============================================================================
// FILE: lib/api.ts
// Description: Utility functions for interacting with APIs.
// ============================================================================
// These are utility functions, not React components, so no "use client" needed.
// They will be called from client components.
//
// IMAGE GENERATION APIs - OPTIMIZED FOR DYSLEXIC STUDENTS:
// - generateVisualizationHF: FREE Hugging Face API (1000 images/month)
// - generateVisualizationReplicate: Premium Replicate API (~$0.002/image)
// - generateVisualization: Default (uses HF for backward compatibility)
// 
// All prompts are enhanced for SINGLE-CONCEPT, minimal diagrams:
// ✓ ONE main concept only (no multiple examples)
// ✓ Pure white background with clean layout
// ✓ Simple coordinate grids for math (like textbook style)
// ✓ Bold colored lines (blue/red/green) - dyslexia friendly
// ✓ Large clear labels, minimal text, no complex formulas
// ✓ Uncluttered, minimalist design for easy understanding
// ============================================================================
import type { CurriculumSubject } from '@/types';

export const callLocalSimplificationAPI = async (
  text: string,
  setLoadingText: React.Dispatch<React.SetStateAction<string>>,
  customAlert: (message: string) => void
): Promise<string | null> => {
  setLoadingText('Simplifying text with local model...');
  try {
    const response = await fetch('http://localhost:5001/simplify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    setLoadingText('');

    // Handle different possible response formats
    if (result.simplified_text) {
      return result.simplified_text;
    } else if (result.simplified) {
      return result.simplified;
    } else if (result.text) {
      return result.text;
    } else if (typeof result === 'string') {
      return result;
    } else {
      console.error("Unexpected API response structure:", result);
      customAlert("Failed to simplify text. Unexpected response format.");
      return null;
    }
  } catch (error) {
    console.error("Error calling local simplification API:", error);
    setLoadingText('');
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      customAlert("Could not connect to local simplification API. Make sure it's running on http://localhost:5001");
    } else {
      customAlert("An error occurred during text simplification. Please try again.");
    }
    return null;
  }
};

export const callGeminiAPI = async (
  prompt: string,
  type: 'text' | 'image' = 'text',
  schema: object | null = null,
  setLoadingText: React.Dispatch<React.SetStateAction<string>>,
  customAlert: (message: string) => void
): Promise<string | object | null> => {
  setLoadingText(`Generating ${type}...`);
  try {
    const chatHistory: { role: string; parts: { text: string }[] }[] = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload: { 
      contents: { role: string; parts: { text: string }[] }[]; 
      generationConfig?: {
        responseMimeType: string;
        responseSchema: object;
      };
    } = { contents: chatHistory };
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

// Hugging Face Image Generation (FREE tier - 1000 requests/month)
export const generateVisualizationHF = async (
  visualPrompt: string,
  setLoadingText: React.Dispatch<React.SetStateAction<string>>,
  setSelectedLesson: React.Dispatch<React.SetStateAction<CurriculumSubject | null>>,
  customAlert: (message: string) => void
): Promise<void> => {
  setLoadingText('Generating educational visualization...');
  try {
    // Ultra-simple prompt - less is more for minimal diagrams
    const educationalPrompt = `${visualPrompt}. White background. Single concept only. No text. No clutter. Minimal. Clean. Educational diagram.`;
    
    const HF_API_KEY = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY || "hf_demo"; // Add your HF API key to .env.local
    
    if (!HF_API_KEY || HF_API_KEY === "hf_demo") {
      customAlert("Please add your Hugging Face API key to .env.local file. See .env.local.example for instructions.");
      setLoadingText('');
      return;
    }
    
    // Try multiple models that are known to work with Hugging Face Inference API
    // Order matters - we try the best working models first
    const models = [
      "stabilityai/stable-diffusion-xl-base-1.0", // ✅ Confirmed working
      "stabilityai/stable-diffusion-2-1",
      "runwayml/stable-diffusion-v1-5"
    ];
    
    let imageUrl = null;
    let lastError = null;
    
    for (const model of models) {
      try {
        const response = await fetch(
          `https://api-inference.huggingface.co/models/${model}`,
          {
            headers: {
              Authorization: `Bearer ${HF_API_KEY}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              inputs: educationalPrompt,
              options: { 
                wait_for_model: true,
                use_cache: false 
              }
            }),
          }
        );

        if (response.ok) {
          const imageBlob = await response.blob();
          
          // Check if we got a valid image
          if (imageBlob.size > 0 && imageBlob.type.startsWith('image/')) {
            imageUrl = URL.createObjectURL(imageBlob);
            break; // Success! Exit the loop
          }
        } else {
          lastError = new Error(`HTTP error! status: ${response.status} for model: ${model}`);
        }
      } catch (error) {
        lastError = error;
        console.log(`Failed with model ${model}:`, error);
        // Continue to next model
      }
    }
    
    if (imageUrl) {
      setLoadingText('');
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
      throw lastError || new Error("All models failed to generate image");
    }
  } catch (error) {
    console.error("Error generating image with Hugging Face:", error);
    setLoadingText('');
    
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        customAlert("Model not found. The Hugging Face model may be temporarily unavailable. Please try again later or contact support.");
      } else if (error.message.includes('401')) {
        customAlert("Invalid API key. Please check your Hugging Face API key in .env.local file.");
      } else if (error.message.includes('429')) {
        customAlert("Rate limit exceeded. You've reached the free tier limit of 1000 images per month. Please wait or upgrade to a paid plan.");
      } else {
        customAlert(`Image generation failed: ${error.message}. Please try again.`);
      }
    } else {
      customAlert("An error occurred during image generation. Please try again.");
    }
  }
};

// Alternative: Replicate API (Pay-per-use, very cost-efficient)
export const generateVisualizationReplicate = async (
  visualPrompt: string,
  setLoadingText: React.Dispatch<React.SetStateAction<string>>,
  setSelectedLesson: React.Dispatch<React.SetStateAction<CurriculumSubject | null>>,
  customAlert: (message: string) => void
): Promise<void> => {
  setLoadingText('Generating high-quality visualization...');
  try {
    const educationalPrompt = `${visualPrompt}. White background. Single concept only. No text. No clutter. Minimal. Clean. Educational diagram.`;
    
    const REPLICATE_API_TOKEN = process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN;
    
    if (!REPLICATE_API_TOKEN) {
      customAlert("Replicate API token not configured. Please add NEXT_PUBLIC_REPLICATE_API_TOKEN to your .env.local file.");
      setLoadingText('');
      return;
    }

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4", // FLUX.1 Schnell
        input: {
          prompt: educationalPrompt,
          aspect_ratio: "16:9",
          output_format: "webp",
          output_quality: 80,
          num_inference_steps: 4 // Fast generation
        },
      }),
    });

    const prediction = await response.json();
    
    if (!response.ok) {
      throw new Error(prediction.detail || "Failed to start image generation");
    }

    // Poll for completion
    let result = prediction;
    while (result.status === "starting" || result.status === "processing") {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: {
          Authorization: `Token ${REPLICATE_API_TOKEN}`,
        },
      });
      result = await statusResponse.json();
    }

    setLoadingText('');

    if (result.status === "succeeded" && result.output && result.output.length > 0) {
      setSelectedLesson(prev => {
        if (prev) {
          return {
            ...prev,
            visual: result.output[0]
          };
        }
        return null;
      });
    } else {
      console.error("Image generation failed:", result);
      customAlert("Failed to generate visualization. Please try again.");
    }
  } catch (error) {
    console.error("Error generating image with Replicate:", error);
    setLoadingText('');
    customAlert("An error occurred during image generation. Please try again.");
  }
};

// Legacy function (keep for backward compatibility)
export const generateVisualization = generateVisualizationHF;