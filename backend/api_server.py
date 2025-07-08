#!/usr/bin/env python3
"""
Optimized API Server for Dyslexia-Friendly Text Simplification
Designed for fast response times in web applications
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import BartForConditionalGeneration, BartTokenizer
import re
import time
from functools import lru_cache
import threading
import queue

app = Flask(__name__)
CORS(app)  # Enable CORS for web apps

class OptimizedSimplificationModel:
    def __init__(self, model_path="./dyslexia_bart_your_data"):
        print("🚀 Loading optimized model...")
        
        # Load model and tokenizer
        self.device = torch.device("mps") if torch.backends.mps.is_available() else torch.device("cpu")
        self.tokenizer = BartTokenizer.from_pretrained(model_path)
        self.model = BartForConditionalGeneration.from_pretrained(model_path)
        self.model.to(self.device)
        self.model.eval()  # Set to evaluation mode
        
        # Optimize for inference
        if hasattr(torch, 'compile'):
            self.model = torch.compile(self.model)  # PyTorch 2.0+ optimization
        
        print(f"✅ Model loaded on {self.device}")
        
        # Warm up the model with a test input
        self._warmup()
    
    def _warmup(self):
        """Warm up the model to avoid first-request slowness"""
        print("🔥 Warming up model...")
        test_text = "This is a test sentence to warm up the model."
        self.simplify(test_text)
        print("✅ Model warmed up")
    
    @lru_cache(maxsize=100)  # Cache recent results
    def simplify(self, text, max_length=150):
        """
        Simplify text with optimizations for speed
        LRU cache helps with repeated requests
        """
        if not text or len(text.strip()) < 5:
            return text
        
        # Quick preprocessing
        text = text.strip()
        
        # Tokenize with optimizations
        inputs = self.tokenizer(
            text,
            max_length=512,
            truncation=True,
            padding=False,  # Don't pad single inputs
            return_tensors='pt'
        ).to(self.device)
        
        # Generate with speed optimizations
        with torch.no_grad():  # Disable gradients for inference
            outputs = self.model.generate(
                **inputs,
                max_length=max_length,
                min_length=15,
                num_beams=2,  # Reduced beams for speed (was 3-4)
                length_penalty=0.6,
                early_stopping=True,
                do_sample=False,
                no_repeat_ngram_size=2,
                pad_token_id=self.tokenizer.pad_token_id
            )
        
        # Decode result
        simplified = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Apply post-processing
        simplified = self._post_process(simplified)
        
        return simplified
    
    def _post_process(self, text):
        """Enhanced post-processing with beautiful formatting"""
        # Basic word replacements
        replacements = {
            'hydrologic cycle': 'water cycle',
            'continuous': 'ongoing',
            'instantaneous': 'immediate',
            'systematic': 'careful',
            'various': 'different',
            'essential': 'important',
            'maintaining': 'keeping',
            'specialized': 'special',
            'examination': 'study',
            'represents': 'shows',
            'occurs': 'happens',
            'requires': 'needs'
        }
        
        for old, new in replacements.items():
            text = re.sub(r'\b' + re.escape(old) + r'\b', new, text, flags=re.IGNORECASE)
        
        # Clean up extra spaces and periods
        text = re.sub(r'\.+', '.', text)
        text = re.sub(r'\s+', ' ', text)
        text = text.strip()
        
        return text
    
    def format_for_presentation(self, text):
        """
        Format text for beautiful, dyslexia-friendly presentation
        Returns both plain and HTML formatted versions
        """
        # Clean the text first
        text = self._post_process(text)
        
        # Split into sentences and clean them
        sentences = re.split(r'[.!?]+', text)
        formatted_sentences = []
        bullet_points = []
        
        for sentence in sentences:
            sentence = sentence.strip()
            if not sentence:
                continue
                
            # Check if it's a bullet point pattern
            if any(keyword in sentence.lower() for keyword in ['evaporation:', 'condensation:', 'precipitation:', 'step:', '•']):
                # Convert to proper bullet point
                sentence = sentence.replace('•', '').strip()
                if ':' in sentence:
                    bullet_points.append(sentence)
                else:
                    bullet_points.append(sentence)
            else:
                # Regular sentence
                if bullet_points:
                    # Add accumulated bullet points first
                    formatted_sentences.extend([f"• {bp}" for bp in bullet_points])
                    bullet_points = []
                formatted_sentences.append(sentence + '.')
        
        # Add any remaining bullet points
        if bullet_points:
            formatted_sentences.extend([f"• {bp}" for bp in bullet_points])
        
        # Create formatted versions
        plain_formatted = self._create_plain_format(formatted_sentences)
        html_formatted = self._create_html_format(formatted_sentences)
        
        return plain_formatted, html_formatted
    
    def _create_plain_format(self, sentences):
        """Create plain text format with proper line breaks"""
        formatted_lines = []
        
        for sentence in sentences:
            if sentence.startswith('•'):
                # Bullet point - add with proper spacing
                formatted_lines.append(f"  {sentence}")
            else:
                # Regular sentence - add line break before if previous was bullet
                if formatted_lines and formatted_lines[-1].startswith('  •'):
                    formatted_lines.append("")  # Empty line after bullets
                formatted_lines.append(sentence)
        
        return '\n'.join(formatted_lines)
    
    def _create_html_format(self, sentences):
        """Create HTML format with proper styling for dyslexia-friendly display"""
        html_parts = ['<div class="dyslexia-friendly-content">']
        current_bullets = []
        
        for sentence in sentences:
            if sentence.startswith('•'):
                # Collect bullet points
                current_bullets.append(sentence[1:].strip())
            else:
                # If we have accumulated bullets, add them as a list
                if current_bullets:
                    html_parts.append('<ul class="dyslexia-list">')
                    for bullet in current_bullets:
                        html_parts.append(f'<li class="dyslexia-bullet">{bullet}</li>')
                    html_parts.append('</ul>')
                    current_bullets = []
                
                # Add regular sentence
                html_parts.append(f'<p class="dyslexia-sentence">{sentence}</p>')
        
        # Add any remaining bullets
        if current_bullets:
            html_parts.append('<ul class="dyslexia-list">')
            for bullet in current_bullets:
                html_parts.append(f'<li class="dyslexia-bullet">{bullet}</li>')
            html_parts.append('</ul>')
        
        html_parts.append('</div>')
        return ''.join(html_parts)
    
    def get_dyslexia_css(self):
        """Return CSS for dyslexia-friendly formatting"""
        return """
        <style>
        .dyslexia-friendly-content {
            font-family: 'OpenDyslexic', 'Comic Sans MS', Arial, sans-serif;
            font-size: 16px;
            line-height: 1.8;
            color: #333;
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            max-width: 600px;
        }
        
        .dyslexia-sentence {
            margin: 12px 0;
            padding: 8px 0;
            border-left: 3px solid #4CAF50;
            padding-left: 15px;
        }
        
        .dyslexia-list {
            margin: 15px 0;
            padding-left: 0;
            list-style: none;
        }
        
        .dyslexia-bullet {
            margin: 8px 0;
            padding: 8px 12px;
            background-color: #e8f5e8;
            border-radius: 5px;
            border-left: 4px solid #4CAF50;
            position: relative;
        }
        
        .dyslexia-bullet:before {
            content: "●";
            color: #4CAF50;
            font-weight: bold;
            position: absolute;
            left: -8px;
        }
        
        /* High contrast mode */
        .high-contrast .dyslexia-friendly-content {
            background-color: #000;
            color: #ffff00;
        }
        
        .high-contrast .dyslexia-sentence {
            border-left-color: #ffff00;
        }
        
        .high-contrast .dyslexia-bullet {
            background-color: #333;
            border-left-color: #ffff00;
        }
        </style>
        """

# Global model instance (loaded once)
model = None

@app.route('/', methods=['GET'])
def home():
    """Homepage with API documentation"""
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Dyslexia-Friendly Text Simplifier API</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            .endpoint { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; }
            .method { background: #4CAF50; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold; }
            .method.get { background: #2196F3; }
            pre { background: #333; color: #fff; padding: 15px; border-radius: 5px; overflow-x: auto; }
            .example { background: #e8f5e8; padding: 10px; border-radius: 5px; margin: 10px 0; }
        </style>
    </head>
    <body>
        <h1>🧠 Dyslexia-Friendly Text Simplifier API</h1>
        <p>Transform complex text into clear, easy-to-read content with dyslexia-friendly formatting.</p>
        
        <h2>📡 Available Endpoints</h2>
        
        <div class="endpoint">
            <h3><span class="method">POST</span> /simplify</h3>
            <p>Simplify a single text with beautiful formatting.</p>
            <div class="example">
                <strong>Request:</strong>
                <pre>{
  "text": "The derivative represents instantaneous rate of change.",
  "max_length": 150,
  "include_html": true,
  "include_css": true
}</pre>
            </div>
        </div>
        
        <div class="endpoint">
            <h3><span class="method">POST</span> /batch_simplify</h3>
            <p>Simplify multiple texts at once (max 10).</p>
            <div class="example">
                <strong>Request:</strong>
                <pre>{
  "texts": ["Text 1...", "Text 2..."],
  "include_html": true
}</pre>
            </div>
        </div>
        
        <div class="endpoint">
            <h3><span class="method get">GET</span> /health</h3>
            <p>Check if the API and model are working properly.</p>
        </div>
        
        <div class="endpoint">
            <h3><span class="method get">GET</span> /get_css</h3>
            <p>Get dyslexia-friendly CSS styles for your frontend.</p>
        </div>
        
        <div class="endpoint">
            <h3><span class="method get">GET</span> /demo</h3>
            <p>Interactive demo page to test the simplifier.</p>
        </div>
        
        <h2>🚀 Quick Test</h2>
        <p>Try this curl command:</p>
        <pre>curl -X POST http://localhost:5001/simplify \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Complex text here..."}'</pre>
        
        <h2>📚 Features</h2>
        <ul>
            <li>✅ Sentence-by-sentence formatting</li>
            <li>✅ Bullet points on separate lines</li>
            <li>✅ Dyslexia-friendly fonts and spacing</li>
            <li>✅ High contrast mode support</li>
            <li>✅ Word simplification (complex → simple)</li>
            <li>✅ HTML and plain text output</li>
            <li>✅ Performance metrics</li>
        </ul>
        
        <p><a href="/demo" style="background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">🎮 Try Interactive Demo</a></p>
    </body>
    </html>
    """

@app.route('/docs', methods=['GET'])
@app.route('/documentation', methods=['GET'])
def docs():
    """API Documentation page"""
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>API Documentation - Dyslexia-Friendly Text Simplifier</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; line-height: 1.6; }
            .header { background: linear-gradient(135deg, #4CAF50, #45a049); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
            .endpoint { background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #4CAF50; }
            .method { background: #4CAF50; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 12px; }
            .method.get { background: #2196F3; }
            .method.post { background: #4CAF50; }
            pre { background: #2d3748; color: #e2e8f0; padding: 15px; border-radius: 6px; overflow-x: auto; font-size: 14px; }
            .example { background: #e6f7ff; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #1890ff; }
            .response { background: #f6ffed; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #52c41a; }
            .nav { background: #f1f3f4; padding: 15px; border-radius: 6px; margin-bottom: 20px; }
            .nav a { color: #1976d2; text-decoration: none; margin-right: 15px; font-weight: 500; }
            .nav a:hover { text-decoration: underline; }
            .code { background: #f5f5f5; padding: 2px 6px; border-radius: 3px; font-family: 'Monaco', 'Courier New', monospace; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f8f9fa; font-weight: 600; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🧠 Dyslexia-Friendly Text Simplifier API</h1>
            <p>Complete documentation for integrating text simplification into your applications</p>
        </div>
        
        <div class="nav">
            <a href="#overview">Overview</a>
            <a href="#endpoints">Endpoints</a>
            <a href="#examples">Examples</a>
            <a href="#integration">Integration</a>
            <a href="/demo">Live Demo</a>
            <a href="/">Home</a>
        </div>
        
        <section id="overview">
            <h2>📖 Overview</h2>
            <p>This API transforms complex text into dyslexia-friendly content with:</p>
            <ul>
                <li><strong>Simplified vocabulary:</strong> Complex words → Simple words</li>
                <li><strong>Clear formatting:</strong> Sentences on separate lines</li>
                <li><strong>Visual structure:</strong> Bullet points and proper spacing</li>
                <li><strong>Multiple outputs:</strong> HTML with styling + plain text</li>
                <li><strong>Performance metrics:</strong> Processing time and word reduction stats</li>
            </ul>
        </section>
        
        <section id="endpoints">
            <h2>📡 API Endpoints</h2>
            
            <div class="endpoint">
                <h3><span class="method post">POST</span> /simplify</h3>
                <p>Simplify a single text with dyslexia-friendly formatting.</p>
                
                <h4>Request Parameters:</h4>
                <table>
                    <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
                    <tr><td><code>text</code></td><td>string</td><td>Yes</td><td>Text to simplify (max 2000 chars)</td></tr>
                    <tr><td><code>max_length</code></td><td>integer</td><td>No</td><td>Max output length (default: 150)</td></tr>
                    <tr><td><code>include_html</code></td><td>boolean</td><td>No</td><td>Include HTML formatting (default: true)</td></tr>
                    <tr><td><code>include_css</code></td><td>boolean</td><td>No</td><td>Include CSS styles (default: false)</td></tr>
                </table>
                
                <div class="example">
                    <strong>Request Example:</strong>
                    <pre>curl -X POST http://localhost:5001/simplify \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "The derivative represents instantaneous rate of change.",
    "max_length": 150,
    "include_html": true,
    "include_css": false
  }'</pre>
                </div>
                
                <div class="response">
                    <strong>Response Example:</strong>
                    <pre>{
  "success": true,
  "original": "The derivative represents instantaneous rate of change.",
  "simplified": "The derivative shows immediate rate of change.",
  "formatted": {
    "plain": "The derivative shows immediate rate of change.",
    "html": "&lt;div class=\\"dyslexia-friendly-content\\"&gt;...&lt;/div&gt;"
  },
  "processing_time": 0.245,
  "word_reduction": 12.5
}</pre>
                </div>
            </div>
            
            <div class="endpoint">
                <h3><span class="method post">POST</span> /batch_simplify</h3>
                <p>Simplify multiple texts at once (max 10 texts).</p>
                
                <div class="example">
                    <strong>Request Example:</strong>
                    <pre>curl -X POST http://localhost:5001/batch_simplify \\
  -H "Content-Type: application/json" \\
  -d '{
    "texts": [
      "Complex text one...",
      "Complex text two..."
    ],
    "include_html": true
  }'</pre>
                </div>
            </div>
            
            <div class="endpoint">
                <h3><span class="method get">GET</span> /health</h3>
                <p>Check API and model status.</p>
                
                <div class="example">
                    <strong>Request:</strong>
                    <pre>curl http://localhost:5001/health</pre>
                </div>
                
                <div class="response">
                    <strong>Response:</strong>
                    <pre>{"status": "healthy", "model_loaded": true}</pre>
                </div>
            </div>
            
            <div class="endpoint">
                <h3><span class="method get">GET</span> /get_css</h3>
                <p>Get dyslexia-friendly CSS styles for your frontend.</p>
                
                <div class="example">
                    <strong>Request:</strong>
                    <pre>curl http://localhost:5001/get_css</pre>
                </div>
            </div>
        </section>
        
        <section id="examples">
            <h2>🧪 Real Examples</h2>
            
            <h3>Mathematics Text:</h3>
            <div class="example">
                <strong>Input:</strong> "To solve linear equations of the form ax + b = c, where a, b, and c are constants..."
                <br><strong>Output:</strong> "To solve equations like ax + b = c, we need to get x by itself. We do this by doing opposite operations."
            </div>
            
            <h3>Science Text:</h3>
            <div class="example">
                <strong>Input:</strong> "Cellular organelles perform specialized functions essential for maintaining cellular homeostasis..."
                <br><strong>Output:</strong> "Cell parts do special jobs to keep cells healthy and balanced."
            </div>
        </section>
        
        <section id="integration">
            <h2>🔧 Integration Guide</h2>
            
            <h3>JavaScript Integration:</h3>
            <div class="example">
                <pre>// Simple fetch example
async function simplifyText(text) {
    const response = await fetch('http://localhost:5001/simplify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            text: text,
            include_html: true 
        })
    });
    
    const result = await response.json();
    
    if (result.success) {
        // Display formatted HTML
        document.getElementById('output').innerHTML = result.formatted.html;
    }
}</pre>
            </div>
            
            <h3>Python Integration:</h3>
            <div class="example">
                <pre>import requests

def simplify_text(text):
    response = requests.post('http://localhost:5001/simplify', 
        json={'text': text, 'include_html': True})
    
    result = response.json()
    return result['formatted']['html']</pre>
            </div>
            
            <h3>Error Handling:</h3>
            <div class="example">
                <pre>// Always handle errors
try {
    const result = await simplifyText("Complex text...");
    displayResult(result);
} catch (error) {
    console.error("Simplification failed:", error);
    // Show original text as fallback
}</pre>
            </div>
        </section>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin-top: 30px;">
            <h3>🚀 Quick Links</h3>
            <p>
                <a href="/demo" style="background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;">🎮 Try Demo</a>
                <a href="/health" style="background: #2196F3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;">💚 Health Check</a>
                <a href="/" style="background: #FF9800; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">🏠 Home</a>
            </p>
        </div>
    </body>
    </html>
    """

@app.route('/favicon.ico')
def favicon():
    """Serve a simple favicon to avoid 404s"""
    return '', 204
def demo():
    """Serve the interactive demo page"""
    # You can either serve the HTML file or return the demo content
    # For now, let's return a simple redirect message
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Demo - Dyslexia-Friendly Text Simplifier</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; }
            .demo-box { background: #f0f8ff; padding: 30px; border-radius: 10px; margin: 20px 0; }
            button { background: #4CAF50; color: white; padding: 15px 30px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; }
            textarea { width: 100%; height: 100px; padding: 10px; border: 2px solid #ddd; border-radius: 5px; margin: 10px 0; }
            .result { background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: left; }
        </style>
    </head>
    <body>
        <h1>🧠 Interactive Demo</h1>
        <div class="demo-box">
            <h2>Test the Simplifier</h2>
            <textarea id="input" placeholder="Enter complex text here...">The derivative of a function represents the instantaneous rate of change at any given point and can be calculated using various differentiation rules.</textarea>
            <br>
            <button onclick="simplifyText()">🔄 Simplify Text</button>
            <div id="result" class="result" style="display: none;"></div>
            <div id="loading" style="display: none;">🤖 Processing...</div>
        </div>
        
        <script>
            async function simplifyText() {
                const input = document.getElementById('input').value;
                const loading = document.getElementById('loading');
                const result = document.getElementById('result');
                
                if (!input.trim()) {
                    alert('Please enter some text!');
                    return;
                }
                
                loading.style.display = 'block';
                result.style.display = 'none';
                
                try {
                    const response = await fetch('/simplify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            text: input,
                            include_html: true,
                            include_css: true 
                        })
                    });
                    
                    const data = await response.json();
                    
                    if (data.success) {
                        result.innerHTML = \`
                            <h3>📝 Original:</h3>
                            <p>\${data.original}</p>
                            <h3>✨ Simplified:</h3>
                            \${data.formatted.html}
                            <h3>📊 Stats:</h3>
                            <p>Processing time: \${data.processing_time}s | Word reduction: \${data.word_reduction}%</p>
                        \`;
                        result.style.display = 'block';
                    } else {
                        result.innerHTML = '<p style="color: red;">Error: ' + data.error + '</p>';
                        result.style.display = 'block';
                    }
                } catch (error) {
                    result.innerHTML = '<p style="color: red;">Network error: ' + error.message + '</p>';
                    result.style.display = 'block';
                } finally {
                    loading.style.display = 'none';
                }
            }
        </script>
        
        <!-- Add dyslexia-friendly styles -->
        <style>
            .dyslexia-friendly-content {
                font-family: 'Comic Sans MS', Arial, sans-serif;
                font-size: 16px;
                line-height: 1.8;
                color: #333;
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 8px;
            }
            
            .dyslexia-sentence {
                margin: 10px 0;
                padding: 8px 0;
                border-left: 3px solid #4CAF50;
                padding-left: 15px;
            }
            
            .dyslexia-list {
                margin: 15px 0;
                padding-left: 0;
                list-style: none;
            }
            
            .dyslexia-bullet {
                margin: 8px 0;
                padding: 8px 12px;
                background-color: #e8f5e8;
                border-radius: 5px;
                border-left: 4px solid #4CAF50;
            }
        </style>
    </body>
    </html>
    """
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "model_loaded": model is not None})

@app.route('/simplify', methods=['POST'])
def simplify_text():
    """Main simplification endpoint with beautiful formatting"""
    start_time = time.time()
    
    try:
        # Get input
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({"error": "No text provided"}), 400
        
        input_text = data['text']
        max_length = data.get('max_length', 150)
        include_html = data.get('include_html', True)
        include_css = data.get('include_css', False)
        
        # Input validation
        if len(input_text) > 2000:  # Limit input size
            return jsonify({"error": "Text too long (max 2000 characters)"}), 400
        
        # Simplify text
        simplified = model.simplify(input_text, max_length)
        
        # Format for presentation
        plain_formatted, html_formatted = model.format_for_presentation(simplified)
        
        # Calculate metrics
        processing_time = time.time() - start_time
        word_reduction = ((len(input_text.split()) - len(simplified.split())) / len(input_text.split())) * 100
        
        response_data = {
            "original": input_text,
            "simplified": simplified,
            "formatted": {
                "plain": plain_formatted,
                "html": html_formatted if include_html else None
            },
            "processing_time": round(processing_time, 3),
            "word_reduction": round(word_reduction, 1),
            "success": True
        }
        
        # Include CSS if requested
        if include_css:
            response_data["css"] = model.get_dyslexia_css()
        
        return jsonify(response_data)
    
    except Exception as e:
        return jsonify({
            "error": str(e),
            "success": False
        }), 500

@app.route('/batch_simplify', methods=['POST'])
def batch_simplify():
    """Batch processing endpoint with formatting"""
    start_time = time.time()
    
    try:
        data = request.get_json()
        if not data or 'texts' not in data:
            return jsonify({"error": "No texts provided"}), 400
        
        texts = data['texts']
        include_html = data.get('include_html', True)
        
        if len(texts) > 10:  # Limit batch size
            return jsonify({"error": "Too many texts (max 10)"}), 400
        
        results = []
        for text in texts:
            if len(text) <= 2000:
                simplified = model.simplify(text)
                plain_formatted, html_formatted = model.format_for_presentation(simplified)
                
                results.append({
                    "original": text,
                    "simplified": simplified,
                    "formatted": {
                        "plain": plain_formatted,
                        "html": html_formatted if include_html else None
                    }
                })
            else:
                results.append({
                    "original": text,
                    "simplified": text,
                    "formatted": {
                        "plain": text,
                        "html": f'<p class="dyslexia-sentence">{text}</p>' if include_html else None
                    },
                    "error": "Text too long"
                })
        
        processing_time = time.time() - start_time
        
        return jsonify({
            "results": results,
            "processing_time": round(processing_time, 3),
            "success": True
        })
    
    except Exception as e:
        return jsonify({
            "error": str(e),
            "success": False
        }), 500

@app.route('/get_css', methods=['GET'])
def get_css():
    """Get dyslexia-friendly CSS styles"""
    return jsonify({
        "css": model.get_dyslexia_css(),
        "success": True
    })

if __name__ == '__main__':
    import argparse
    
    # Add command line argument parsing
    parser = argparse.ArgumentParser(description='Dyslexia-Friendly Text Simplification API')
    parser.add_argument('--port', type=int, default=5001, help='Port to run the server on (default: 5001)')
    parser.add_argument('--host', type=str, default='0.0.0.0', help='Host to bind to (default: 0.0.0.0)')
    parser.add_argument('--model-path', type=str, default='./dyslexia_bart_your_data', help='Path to the trained model')
    args = parser.parse_args()
    
    print("🔧 Starting optimized API server...")
    
    # Load model on startup
    try:
        model = OptimizedSimplificationModel(args.model_path)
    except Exception as e:
        print(f"❌ Failed to load model: {e}")
        print("💡 Make sure your model is saved at:", args.model_path)
        exit(1)
    
    print("🌐 Server ready!")
    print("📡 Endpoints:")
    print("  POST /simplify - Simplify single text with formatting")
    print("  POST /batch_simplify - Simplify multiple texts with formatting")
    print("  GET /health - Health check")
    print("  GET /get_css - Get dyslexia-friendly CSS styles")
    print(f"🌍 Access at: http://localhost:{args.port}")
    print(f"🛑 Stop with: Ctrl+C")
    
    # Run server
    try:
        app.run(
            host=args.host,
            port=args.port,
            debug=False,  # Disable debug for production
            threaded=True  # Enable threading for concurrent requests
        )
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"\n❌ Port {args.port} is already in use!")
            print("🔧 Try these solutions:")
            print(f"   1. Use a different port: python api_server.py --port 5002")
            print("   2. Kill the process using the port:")
            print(f"      lsof -ti:{args.port} | xargs kill -9")
            print("   3. On macOS, disable AirPlay Receiver:")
            print("      System Preferences -> General -> AirDrop & Handoff -> AirPlay Receiver (Off)")
        else:
            print(f"❌ Server error: {e}")
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")