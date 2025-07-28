# Fix for the /simplify endpoint - replace the problematic section around line 250-260

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
