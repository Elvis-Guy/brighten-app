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

export const callSimplificationAPI = async (
  text: string,
  setLoadingText: React.Dispatch<React.SetStateAction<string>>,
  customAlert: (message: string) => void
): Promise<Record<string, unknown> | null> => {
  setLoadingText('Simplifying text with AI...');
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  const maxRetries = 2;
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🚀 Making API request to: ${apiUrl}/simplify (attempt ${attempt}/${maxRetries})`);
      console.log(`📝 Text length: ${text.length} characters`);
      
      // First check if the API is healthy
      if (attempt === 1) {
        setLoadingText('Checking API status...');
        try {
          const healthResponse = await fetch(`${apiUrl}/health`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });
          
          if (!healthResponse.ok) {
            const healthData = await healthResponse.json();
            console.warn('⚠️ API health check failed:', healthData);
            
            if (healthData.error === "Model not loaded") {
              setLoadingText('Model is loading, please wait...');
              customAlert('🔄 The AI model is currently loading. This may take a moment. Please try again in 30 seconds.');
              return null;
            }
          }
        } catch (healthError) {
          console.warn('Health check failed, proceeding with request:', healthError);
        }
      }
      
      setLoadingText(`Simplifying text with AI... (attempt ${attempt})`);
      
      const response = await fetch(`${apiUrl}/simplify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          structured: true
        })
      });

      console.log(`📊 API Response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        // Try to get more error details from the response
        let errorDetails = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorResponse = await response.json();
          console.error(`❌ API Error Response:`, errorResponse);
          
          if (errorResponse.code === 'MODEL_NOT_LOADED' || errorResponse.code === 'MODEL_NOT_READY') {
            setLoadingText('');
            customAlert('🔄 The AI model is still loading. Please wait a moment and try again.');
            return null;
          }
          
          errorDetails = errorResponse.error || errorDetails;
        } catch (parseError) {
          console.warn('Could not parse error response:', parseError);
        }
        
        throw new Error(`API Error: ${errorDetails}`);
      }

      const result = await response.json();
      console.log(`✅ API Success:`, result);
      setLoadingText('');
      return result;
      
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`❌ API request failed (attempt ${attempt}):`, lastError);
      
      // Check if it's a network error
      if (lastError.message.includes('Failed to fetch') || lastError.message.includes('ERR_BLOCKED_BY_CLIENT')) {
        console.error('🌐 Network Error: Could not connect to the API at', apiUrl, '. Please check your internet connection and try again.');
        
        if (attempt === maxRetries) {
          setLoadingText('');
          customAlert(`🌐 Network Error: Could not connect to the API. Please check your internet connection and try again. (${lastError.message})`);
          return null;
        }
        
        // Wait before retrying network errors
        await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
        continue;
      }
      
      // For other errors, retry only once more
      if (attempt === maxRetries) {
        setLoadingText('');
        customAlert(`❌ Simplification failed: ${lastError.message}`);
        return null;
      }
      
      // Brief wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  setLoadingText('');
  customAlert(`❌ All attempts failed. Last error: ${lastError?.message || 'Unknown error'}`);
  return null;
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

    // Quick API key validation
    console.log(`🔑 Testing API key validity...`);
    try {
      const testResponse = await fetch('https://huggingface.co/api/whoami', {
        headers: { Authorization: `Bearer ${HF_API_KEY}` }
      });
      if (!testResponse.ok) {
        throw new Error(`API key validation failed: ${testResponse.status}`);
      }
      const userInfo = await testResponse.json();
      console.log(`✅ API key valid for user: ${userInfo.name || 'unknown'}`);
    } catch (error) {
      console.log(`❌ API key validation failed:`, error);
      customAlert("Invalid Hugging Face API key. Please check your token in .env.local");
      setLoadingText('');
      throw new Error("Invalid API key - please update your Hugging Face token");
    }
    
    // Try multiple models that are confirmed to work with Hugging Face Inference API FREE tier
    // Order matters - we try the most reliable free models first
    const models = [
      "stabilityai/stable-diffusion-2-1", // ✅ Most reliable free model
      "CompVis/stable-diffusion-v1-4",   // ✅ Original SD model (free)
      "stabilityai/stable-diffusion-xl-base-1.0", // ✅ High quality but slower
      "runwayml/stable-diffusion-v1-5" // ⚠️ May require payment - last resort
    ];
    
    let imageUrl = null;
    let lastError = null;
    
    for (const model of models) {
      try {
        console.log(`🚀 Trying model: ${model}`);
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

        console.log(`📊 Model ${model} response status: ${response.status}`);
        
        if (response.ok) {
          const imageBlob = await response.blob();
          console.log(`📦 Blob size: ${imageBlob.size}, type: ${imageBlob.type}`);
          
          // Check if we got a valid image
          if (imageBlob.size > 0 && imageBlob.type.startsWith('image/')) {
            imageUrl = URL.createObjectURL(imageBlob);
            console.log(`✅ Success with model: ${model}`);
            break; // Success! Exit the loop
          } else {
            console.log(`❌ Invalid image blob from ${model}`);
          }
        } else {
          // Get response text for debugging
          const responseText = await response.text();
          console.log(`❌ Error response from ${model}:`, responseText);
          
          // Provide more helpful error messages based on status code
          let errorMessage = `HTTP error! status: ${response.status} for model: ${model}`;
          if (response.status === 402) {
            errorMessage += ` - This model requires payment. Trying next free model...`;
          } else if (response.status === 429) {
            errorMessage += ` - Rate limit exceeded. Trying next model...`;
          } else if (response.status === 503) {
            errorMessage += ` - Model temporarily unavailable. Trying next model...`;
          } else if (response.status === 401) {
            errorMessage += ` - Invalid API key. Please check your Hugging Face token.`;
          }
          lastError = new Error(errorMessage);
          console.log(`Model ${model} failed:`, errorMessage);
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
      // Provide helpful guidance when all models fail
      let errorMsg = "All models failed to generate image. ";
      if (lastError && lastError instanceof Error && lastError.message.includes('402')) {
        errorMsg += "This may be due to free tier quota limits. Try again later or consider upgrading to a paid plan.";
      } else if (lastError && lastError instanceof Error && lastError.message.includes('429')) {
        errorMsg += "Rate limit exceeded. Please wait a few minutes before trying again.";
      } else {
        errorMsg += "Please check your internet connection and Hugging Face API key.";
      }
      throw new Error(errorMsg);
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

// Legacy functions (keep for backward compatibility)
export const generateVisualization = generateVisualizationHF;
export const callLocalSimplificationAPI = callSimplificationAPI;

// Alternative: Direct Hugging Face Inference API
export const callHuggingFaceAPI = async (
  text: string,
  setLoadingText: React.Dispatch<React.SetStateAction<string>>,
  customAlert: (message: string) => void
): Promise<Record<string, unknown> | null> => {
  setLoadingText('Simplifying text with Hugging Face AI...');
  
  const maxRetries = 2;
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🤗 Making Hugging Face API request (attempt ${attempt}/${maxRetries})`);
      console.log(`📝 Text length: ${text.length} characters`);
      
      setLoadingText(`Simplifying with Hugging Face AI... (attempt ${attempt})`);
      
      const response = await fetch(
        "https://api-inference.huggingface.co/models/elvisbakunzi/dyslexia-friendly-text-simplifier",
        {
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: text,
            parameters: {
              max_length: 256,
              min_length: 20,
              num_beams: 3,
              length_penalty: 0.8,
              early_stopping: true,
              do_sample: false,
              no_repeat_ngram_size: 2
            }
          }),
        }
      );

      console.log(`📊 Hugging Face API Response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        
        if (response.status === 503 && errorData?.error?.includes('loading')) {
          if (attempt === 1) {
            setLoadingText('Model is loading on Hugging Face, waiting...');
            await new Promise(resolve => setTimeout(resolve, 20000)); // Wait 20 seconds
            continue;
          }
        }
        
        throw new Error(`Hugging Face API Error: ${response.status} - ${errorData?.error || response.statusText}`);
      }

      const result = await response.json();
      console.log(`✅ Hugging Face API Success:`, result);

      // Transform HF response to match our expected format
      const simplifiedText = Array.isArray(result) && result[0]?.generated_text 
        ? result[0].generated_text 
        : typeof result === 'string' 
        ? result 
        : 'Unable to process text';

      // Calculate metrics
      const originalWords = text.split(' ').length;
      const simplifiedWords = simplifiedText.split(' ').length;
      const wordReduction = ((originalWords - simplifiedWords) / originalWords * 100);

      const transformedResult = {
        success: true,
        original: text,
        simplified: simplifiedText,
        metrics: {
          processing_time: 0, // HF doesn't provide this
          original_words: originalWords,
          simplified_words: simplifiedWords,
          word_reduction_percent: Math.round(wordReduction),
          characters_original: text.length,
          characters_simplified: simplifiedText.length
        },
        model: {
          source: "huggingface_direct",
          model_id: "elvisbakunzi/dyslexia-friendly-text-simplifier"
        },
        timestamp: Date.now() / 1000
      };

      setLoadingText('');
      return transformedResult;
      
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`❌ Hugging Face API request failed (attempt ${attempt}):`, lastError);
      
      if (attempt === maxRetries) {
        setLoadingText('');
        customAlert(`❌ Hugging Face simplification failed: ${lastError.message}`);
        return null;
      }
      
      // Brief wait before retry
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  setLoadingText('');
  customAlert(`❌ All Hugging Face attempts failed. Last error: ${lastError?.message || 'Unknown error'}`);
  return null;
};

// Smart API caller that tries both approaches
export const callBestAvailableAPI = async (
  text: string,
  setLoadingText: React.Dispatch<React.SetStateAction<string>>,
  customAlert: (message: string) => void
): Promise<Record<string, unknown> | null> => {
  // First try our custom API
  console.log('🎯 Trying custom API first...');
  const customResult = await callSimplificationAPI(text, setLoadingText, () => {});
  
  if (customResult) {
    console.log('✅ Custom API succeeded');
    return customResult;
  }
  
  // If custom API fails, try Hugging Face direct
  console.log('🤗 Falling back to Hugging Face direct API...');
  customAlert('🔄 Primary API unavailable, trying Hugging Face directly...');
  
  return await callHuggingFaceAPI(text, setLoadingText, customAlert);
};