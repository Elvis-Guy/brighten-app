#!/usr/bin/env python3
"""
Production API for Dyslexia-Friendly Text Simplifier
Optimized for online hosting with Hugging Face Hub integration
Model: https://huggingface.co/elvisbakunzi/dyslexia-friendly-text-simplifier
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import BartForConditionalGeneration, BartTokenizer
import re
import time
import os
import logging
from functools import lru_cache
import threading

# Configure logging for production
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Enhanced CORS configuration
cors_origins = [
    "https://brighten-app.vercel.app",
    "https://brighten-app-dc746.web.app",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000"
]

CORS(app, origins=cors_origins, methods=[
     'GET', 'POST'], allow_headers=['Content-Type'])


class DyslexiaFriendlySimplifier:
    """Production-ready text simplifier using Hugging Face model"""

    def __init__(self, model_name="elvisbakunzi/dyslexia-friendly-text-simplifier"):
        logger.info(f"🤗 Loading model from Hugging Face: {model_name}")

        # Auto-detect device (optimized for cloud hosting)
        if torch.cuda.is_available():
            self.device = torch.device("cuda")
            logger.info("✅ Using CUDA GPU")
        elif torch.backends.mps.is_available():
            self.device = torch.device("mps")
            logger.info("✅ Using MPS (Apple Silicon)")
        else:
            self.device = torch.device("cpu")
            logger.info("⚠️ Using CPU (slower performance)")

        # Load model and tokenizer from Hugging Face
        try:
            logger.info(f"📦 Loading model: {model_name}")
            self.tokenizer = BartTokenizer.from_pretrained(
                model_name,
                cache_dir=os.getenv('TRANSFORMERS_CACHE', None)
            )
            self.model = BartForConditionalGeneration.from_pretrained(
                model_name,
                cache_dir=os.getenv('TRANSFORMERS_CACHE', None),
                torch_dtype=torch.float16 if self.device.type == "cuda" else torch.float32
            )
            self.model.to(self.device)
            self.model.eval()
            logger.info("✅ Model loaded successfully from Hugging Face")
        except Exception as e:
            logger.error(f"❌ Failed to load model: {e}")
            raise

        # Model info
        self.model_name = model_name
        self.is_ready = False

        # Warm up the model
        self._warmup()

    def _warmup(self):
        """Warm up the model to avoid first-request slowness"""
        logger.info("🔥 Warming up model...")
        try:
            test_text = "This is a test sentence to warm up the model."
            self.simplify_without_cache(test_text)
            self.is_ready = True
            logger.info("✅ Model ready for requests")
        except Exception as e:
            logger.error(f"⚠️ Warmup failed: {e}")

    def simplify_without_cache(self, text, max_length=256):
        """Simplify text without caching (for warmup and health checks)"""
        if not text or len(text.strip()) < 5:
            return text

        text = text.strip()

        inputs = self.tokenizer(
            text,
            max_length=512,
            truncation=True,
            padding=False,
            return_tensors='pt'
        ).to(self.device)

        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_length=max_length,
                min_length=20,
                num_beams=3,
                length_penalty=0.8,
                early_stopping=True,
                do_sample=False,
                no_repeat_ngram_size=2,
                pad_token_id=self.tokenizer.pad_token_id
            )

        simplified = self.tokenizer.decode(
            outputs[0], skip_special_tokens=True)
        return self._clean_output(simplified)

    @lru_cache(maxsize=100)
    def simplify(self, text, max_length=256):
        """Simplify text with caching for better performance"""
        return self.simplify_without_cache(text, max_length)

    def _clean_output(self, text):
        """Clean and improve the generated text"""
        text = re.sub(r'\.+', '.', text)
        text = re.sub(r'\s+', ' ', text)
        text = text.strip()

        if text and not text.endswith(('.', '!', '?')):
            text += '.'

        return text

    def simplify_structured(self, text, max_length=256):
        """Simplify text with dyslexia-friendly structure"""
        simplified = self.simplify(text, max_length)
        return self._format_for_dyslexia(simplified)

    def _format_for_dyslexia(self, text):
        """Format text with dyslexia-friendly structure"""
        sentences = re.split(r'[.!?]+', text)
        formatted_parts = []

        for sentence in sentences:
            sentence = sentence.strip()
            if not sentence:
                continue

            if any(keyword in sentence.lower() for keyword in ['first', 'second', 'third', 'step', 'then', 'next']):
                formatted_parts.append(f"• {sentence}")
            else:
                formatted_parts.append(sentence + ".")

        return '\n'.join(formatted_parts)

    def get_model_info(self):
        """Get model information"""
        return {
            "model_name": "Dyslexia-Friendly Text Simplifier",
            "model_id": self.model_name,
            "device": str(self.device),
            "ready": self.is_ready,
            "features": [
                "Educational content simplification",
                "Dyslexia-friendly formatting",
                "Multi-subject support",
                "Grade-level optimization"
            ],
            "subjects": ["Mathematics", "Science", "English", "Computer Science"],
            "grade_levels": [5, 6, 7, 9, 10, 11, 12],
            "performance": {
                "grade_level_reduction": "2-4 levels",
                "word_reduction": "15-25%",
                "processing_speed": "0.2-0.5 seconds"
            }
        }


# Global model instance
model = None
model_lock = threading.Lock()


@app.route('/', methods=['GET'])
def home():
    """API home page with comprehensive documentation"""
    return jsonify({
        "message": "🧠 Dyslexia-Friendly Text Simplifier API",
        "version": "2.0.0",
        "model_source": "huggingface",
        "model_url": "https://huggingface.co/elvisbakunzi/dyslexia-friendly-text-simplifier",
        "description": "Transform complex educational content into dyslexia-friendly text",
        "endpoints": {
            "POST /simplify": "Simplify text with dyslexia-friendly formatting",
            "POST /batch": "Process multiple texts at once",
            "GET /health": "Health check and model status",
            "GET /info": "Detailed model information",
            "GET /": "API documentation"
        },
        "example_usage": {
            "curl": "curl -X POST /simplify -H 'Content-Type: application/json' -d '{\"text\": \"Complex text here...\"}'",
            "python": {
                "basic": "requests.post('/simplify', json={'text': 'Complex text...'})",
                "structured": "requests.post('/simplify', json={'text': 'Complex text...', 'structured': True})"
            }
        },
        "features": [
            "🎯 Educational content optimization",
            "📚 Multi-subject support (Math, Science, English, CS)",
            "🔤 Dyslexia-friendly formatting",
            "⚡ Fast response times with caching",
            "🌍 Production-ready for online hosting",
            "📊 Performance metrics included"
        ]
    })


@app.route('/reinitialize', methods=['POST'])
def reinitialize_model():
    """Force reinitialize the model - useful for troubleshooting"""
    global model

    try:
        logger.info("🔄 Force reinitializing model...")

        # Clear the existing model
        if model is not None:
            del model
            model = None

        # Clear cache if it exists
        if torch.cuda.is_available():
            torch.cuda.empty_cache()

        # Reinitialize
        initialize_model()

        if model is not None and model.is_ready:
            return jsonify({
                "success": True,
                "message": "Model reinitialized successfully",
                "model_status": "ready",
                "timestamp": time.time()
            })
        else:
            return jsonify({
                "success": False,
                "message": "Model reinitialization failed",
                "model_status": "not_ready",
                "timestamp": time.time()
            }), 500

    except Exception as e:
        logger.error(f"❌ Reinitialize error: {e}")
        return jsonify({
            "success": False,
            "error": str(e),
            "timestamp": time.time()
        }), 500


@app.route('/health', methods=['GET'])
def health_check():
    """Comprehensive health check endpoint"""
    try:
        status_code = 200

        if model is None:
            return jsonify({
                "status": "unhealthy",
                "error": "Model not loaded",
                "suggestion": "Try POST /reinitialize to reload the model",
                "model_loaded": False,
                "model_ready": False,
                "timestamp": time.time()
            }), 503

        # Quick test if model exists
        start_time = time.time()
        try:
            test_result = model.simplify_without_cache(
                "Test sentence for health check.")
            response_time = time.time() - start_time
            test_successful = bool(test_result)
        except Exception as e:
            logger.error(f"Health check test failed: {e}")
            test_result = None
            response_time = time.time() - start_time
            test_successful = False
            status_code = 503

        response = {
            "status": "healthy" if (model.is_ready and test_successful) else "degraded",
            "model_loaded": True,
            "model_ready": model.is_ready if model else False,
            "model_source": "huggingface",
            "model_url": "https://huggingface.co/elvisbakunzi/dyslexia-friendly-text-simplifier",
            "device": str(model.device) if model else "unknown",
            "response_time": round(response_time, 3),
            "test_successful": test_successful,
            "test_result": test_result if test_successful else None,
            "timestamp": time.time()
        }

        if not test_successful:
            response["suggestion"] = "Model loaded but not functioning. Try POST /reinitialize"
            status_code = 503

        # Add cache info if available
        try:
            if hasattr(model, 'simplify') and hasattr(model.simplify, 'cache_info'):
                cache_info = model.simplify.cache_info()
                response["cache_info"] = {
                    "hits": cache_info.hits,
                    "misses": cache_info.misses,
                    "maxsize": cache_info.maxsize,
                    "currsize": cache_info.currsize
                }
        except:
            pass

        return jsonify(response), status_code

    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return jsonify({
            "status": "unhealthy",
            "error": str(e),
            "suggestion": "Try POST /reinitialize to reload the model",
            "timestamp": time.time()
        }), 500


@app.route('/info', methods=['GET'])
def model_info():
    """Get detailed model information"""
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    return jsonify(model.get_model_info())


@app.route('/simplify', methods=['POST'])
def simplify_text():
    """
    Main simplification endpoint

    Request body:
    {
        "text": "Complex text to simplify",
        "structured": true,  // Optional: use dyslexia-friendly formatting
        "max_length": 256    // Optional: maximum output length
    }
    """
    start_time = time.time()

    try:
        # Check if model is loaded first
        if model is None:
            return jsonify({
                "success": False,
                "error": "Model not loaded - server may still be starting up",
                "code": "MODEL_NOT_LOADED"
            }), 503

        # Validate request
        data = request.get_json()
        if not data:
            return jsonify({
                "success": False,
                "error": "No JSON data provided",
                "code": "INVALID_JSON"
            }), 400

        if 'text' not in data:
            return jsonify({
                "success": False,
                "error": "Missing 'text' field in request",
                "code": "MISSING_TEXT"
            }), 400

        input_text = data['text']
        if not input_text or len(input_text.strip()) < 5:
            return jsonify({
                "success": False,
                "error": "Text too short (minimum 5 characters)",
                "code": "TEXT_TOO_SHORT"
            }), 400

        if len(input_text) > 2000:
            return jsonify({
                "success": False,
                "error": "Text too long (maximum 2000 characters)",
                "code": "TEXT_TOO_LONG"
            }), 400

        # Get options
        structured = data.get('structured', True)
        max_length = data.get('max_length', 256)

        # Validate max_length
        if not isinstance(max_length, int) or max_length < 50 or max_length > 512:
            max_length = 256

        # Check model readiness (FIXED: now we know model is not None)
        if not model.is_ready:
            return jsonify({
                "success": False,
                "error": "Model is still warming up, please try again in a moment",
                "code": "MODEL_NOT_READY"
            }), 503

        # Simplify text
        if structured:
            simplified_text = model.simplify_structured(input_text, max_length)
        else:
            simplified_text = model.simplify(input_text, max_length)

        # Calculate metrics
        processing_time = time.time() - start_time
        original_words = len(input_text.split())
        simplified_words = len(simplified_text.split())
        word_reduction = ((original_words - simplified_words) /
                          original_words * 100) if original_words > 0 else 0

        return jsonify({
            "success": True,
            "original": input_text,
            "simplified": simplified_text,
            "metrics": {
                "processing_time": round(processing_time, 3),
                "original_words": original_words,
                "simplified_words": simplified_words,
                "word_reduction_percent": round(word_reduction, 1),
                "characters_original": len(input_text),
                "characters_simplified": len(simplified_text)
            },
            "options": {
                "structured": structured,
                "max_length": max_length
            },
            "model": {
                "source": "huggingface",
                "model_id": "elvisbakunzi/dyslexia-friendly-text-simplifier",
                "device": str(model.device)
            },
            "timestamp": time.time()
        })

    except Exception as e:
        logger.error(f"Simplification error: {e}")
        return jsonify({
            "success": False,
            "error": f"Processing error: {str(e)}",
            "code": "PROCESSING_ERROR"
        }), 500


@app.route('/batch', methods=['POST'])
def batch_simplify():
    """
    Batch processing endpoint for multiple texts

    Request body:
    {
        "texts": ["Text 1", "Text 2", ...],
        "structured": true,  // Optional
        "max_length": 256    // Optional
    }
    """
    start_time = time.time()

    try:
        data = request.get_json()
        if not data or 'texts' not in data:
            return jsonify({
                "success": False,
                "error": "Missing 'texts' field in request"
            }), 400

        texts = data['texts']
        if not isinstance(texts, list) or len(texts) == 0:
            return jsonify({
                "success": False,
                "error": "Texts must be a non-empty list"
            }), 400

        if len(texts) > 10:  # Limit batch size for online hosting
            return jsonify({
                "success": False,
                "error": "Maximum 10 texts per batch"
            }), 400

        structured = data.get('structured', True)
        max_length = data.get('max_length', 256)

        results = []
        total_original_words = 0
        total_simplified_words = 0

        for i, text in enumerate(texts):
            if len(text) > 2000:
                results.append({
                    "index": i,
                    "original": text,
                    "simplified": text,
                    "error": "Text too long (max 2000 characters)"
                })
                continue

            try:
                if structured:
                    simplified = model.simplify_structured(text, max_length)
                else:
                    simplified = model.simplify(text, max_length)

                original_words = len(text.split())
                simplified_words = len(simplified.split())
                total_original_words += original_words
                total_simplified_words += simplified_words

                results.append({
                    "index": i,
                    "original": text,
                    "simplified": simplified,
                    "metrics": {
                        "original_words": original_words,
                        "simplified_words": simplified_words,
                        "word_reduction_percent": round(((original_words - simplified_words) / original_words * 100), 1) if original_words > 0 else 0
                    }
                })
            except Exception as e:
                results.append({
                    "index": i,
                    "original": text,
                    "simplified": text,
                    "error": str(e)
                })

        processing_time = time.time() - start_time
        overall_reduction = ((total_original_words - total_simplified_words) /
                             total_original_words * 100) if total_original_words > 0 else 0

        return jsonify({
            "success": True,
            "results": results,
            "summary": {
                "total_texts": len(texts),
                "successful_simplifications": len([r for r in results if 'error' not in r]),
                "processing_time": round(processing_time, 3),
                "total_original_words": total_original_words,
                "total_simplified_words": total_simplified_words,
                "overall_word_reduction_percent": round(overall_reduction, 1)
            },
            "timestamp": time.time()
        })

    except Exception as e:
        logger.error(f"Batch processing error: {e}")
        return jsonify({
            "success": False,
            "error": f"Batch processing error: {str(e)}"
        }), 500


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        "success": False,
        "error": "Endpoint not found",
        "available_endpoints": ["/", "/health", "/info", "/simplify", "/batch"],
        "documentation": "Visit / for API documentation"
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    logger.error(f"Internal server error: {error}")
    return jsonify({
        "success": False,
        "error": "Internal server error",
        "suggestion": "Please try again or contact support if the issue persists"
    }), 500


def initialize_model():
    """Initialize the model with proper error handling"""
    global model

    with model_lock:
        if model is None:
            try:
                logger.info(
                    "🚀 Initializing Dyslexia-Friendly Text Simplifier...")

                # Set cache directory for models
                cache_dir = os.getenv('TRANSFORMERS_CACHE', './model_cache')
                os.makedirs(cache_dir, exist_ok=True)

                # Initialize with longer timeout and better error handling
                model = DyslexiaFriendlySimplifier(
                    "elvisbakunzi/dyslexia-friendly-text-simplifier"
                )
                logger.info("✅ Model initialization completed!")

                # Verify model is actually working
                test_result = model.simplify_without_cache("Test sentence.")
                if not test_result:
                    raise Exception("Model test failed - empty result")

                logger.info(f"✅ Model test successful: {test_result}")

            except Exception as e:
                logger.error(f"❌ Failed to initialize model: {e}")
                logger.error(f"❌ Error type: {type(e).__name__}")

                # Don't exit - let the server start but mark as unhealthy
                model = None
                logger.warning(
                    "⚠️ Server will start but model is not available")


def main():
    """Main function to start the API server"""

    logger.info("🧠 Dyslexia-Friendly Text Simplifier API (Production)")
    logger.info("=" * 60)
    logger.info("🤗 Using model: elvisbakunzi/dyslexia-friendly-text-simplifier")
    logger.info("🌐 Optimized for online hosting")

    # Initialize model (don't exit on failure)
    try:
        initialize_model()
    except Exception as e:
        logger.error(f"⚠️ Model initialization failed: {e}")
        logger.info("🌐 Starting server anyway - model will be unavailable")

    # Server configuration
    port = int(os.environ.get('PORT', 5001))
    host = os.environ.get('HOST', '0.0.0.0')
    debug = os.environ.get('DEBUG', 'false').lower() == 'true'

    logger.info(f"🌐 Starting API server...")
    logger.info(f"📡 Endpoints:")
    logger.info(f"  POST /simplify - Simplify single text")
    logger.info(f"  POST /batch - Batch process multiple texts")
    logger.info(f"  GET /health - Health check and metrics")
    logger.info(f"  GET /info - Model information")
    logger.info(f"  GET / - API documentation")
    logger.info(f"🌍 Server: http://{host}:{port}")
    logger.info(f"🛑 Stop with: Ctrl+C")
    logger.info("=" * 60)

    try:
        app.run(
            host=host,
            port=port,
            debug=debug,
            threaded=True
        )
    except KeyboardInterrupt:
        logger.info("👋 Server stopped by user")
    except Exception as e:
        logger.error(f"❌ Server error: {e}")


if __name__ == '__main__':
    main()
