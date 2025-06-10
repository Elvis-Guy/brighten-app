# Dyslexia Text Simplification Model

## Overview
This model was trained as part of a capstone project to create an advanced text simplification system specifically designed for dyslexic learners.

## Model Details
- **Base Model**: T5-small
- **Training Data**: 748 examples from WikiAuto + Educational content
- **Parameters**: 60,495,872
- **Training Device**: mps
- **Training Date**: 2025-06-10

## Performance Metrics
- **FKGL Improvement**: 5.66 grade levels
- **Success Rate**: 98.0%
- **Compression Ratio**: 0.51

## Usage
```python
from transformers import T5ForConditionalGeneration, T5Tokenizer

tokenizer = T5Tokenizer.from_pretrained('././dyslexia_model_comprehensive')
model = T5ForConditionalGeneration.from_pretrained('././dyslexia_model_comprehensive')

# Example usage
input_text = "[DYSLEXIA] simplify for dyslexia: Your complex text here"
inputs = tokenizer(input_text, return_tensors='pt')
outputs = model.generate(**inputs, max_length=256)
simplified = tokenizer.decode(outputs[0], skip_special_tokens=True)
```

## Files
- `pytorch_model.bin` - Model weights
- `config.json` - Model configuration
- `tokenizer.json` - Tokenizer configuration
- `model_metadata.json` - Training and performance metadata
- `evaluation_results.json` - Detailed evaluation results
- `evaluation_report.png` - Performance visualization

## Citation
If you use this model, please cite:
```
Dyslexia Text Simplification Model (2024)
Capstone Project - Advanced NLP for Accessibility
```
