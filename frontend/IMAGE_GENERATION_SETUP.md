# 🎨 Image Generation Setup Guide

## Overview
Your app now supports AI-powered image generation to create educational visuals that help students with dyslexia learn better. We've integrated **two cost-effective options** tailored for educational use.

## 🚀 Quick Start

### 1. Choose Your API
- **🆓 FREE Option**: Hugging Face (Recommended for development)
- **💎 Premium Option**: Replicate (Best quality for production)

### 2. Set Up API Keys

```bash
# Copy the environment template
cp .env.local.example .env.local

# Edit the file and add your API keys
nano .env.local  # or use your preferred editor
```

## 📋 API Options Comparison

| Feature | Hugging Face (FREE) | Replicate (Premium) |
|---------|-------------------|-------------------|
| **Cost** | 🆓 **FREE** | ~$0.002 per image |
| **Free Tier** | 1000 images/month | Pay-per-use |
| **Quality** | Good for education | Excellent (HD) |
| **Speed** | Moderate | Fast |
| **Models** | Stable Diffusion 2.1 | FLUX.1 Schnell |
| **Setup** | Free account only | Requires payment method |

## 🔧 Setup Instructions

### Option 1: Hugging Face (FREE) ⭐ Recommended

1. **Sign up**: Visit [huggingface.co](https://huggingface.co)
2. **Get API key**: Go to [Settings → Access Tokens](https://huggingface.co/settings/tokens)
3. **Create token**: Click "New token" → "Read" access
4. **Add to .env.local**:
   ```
   NEXT_PUBLIC_HUGGINGFACE_API_KEY=hf_your_token_here
   ```

### Option 2: Replicate (Premium Quality)

1. **Sign up**: Visit [replicate.com](https://replicate.com)
2. **Add payment**: Add a payment method (you won't be charged until you use it)
3. **Get API token**: Go to [Account → API Tokens](https://replicate.com/account/api-tokens)
4. **Add to .env.local**:
   ```
   NEXT_PUBLIC_REPLICATE_API_TOKEN=r8_your_token_here
   ```

## 🎯 Educational Features

### Smart Prompting
The system automatically enhances your prompts for educational content:

```
Original: "quadratic functions"
Enhanced: "Educational illustration, simple and clear: quadratic functions. Style: clean, minimalist, high contrast, educational diagram, simple colors, easy to understand, suitable for learning"
```

### Dyslexia-Friendly Design
- High contrast visuals
- Simple, clear layouts
- Easy-to-understand diagrams
- Minimalist design approach

## 💰 Cost Analysis

### For a School/Educational Use:
- **Small school** (100 images/month): **FREE** with Hugging Face
- **Medium school** (500 images/month): **FREE** with Hugging Face
- **Large school** (2000 images/month): $4/month with Replicate
- **Enterprise** (10000 images/month): $20/month with Replicate

### Budget-Friendly Strategy:
1. Start with **Hugging Face FREE** for development and testing
2. Upgrade to **Replicate** for production when you need higher quality
3. Mix both: Use free for drafts, premium for final materials

## 🔧 Troubleshooting

### Common Issues:

#### 1. "API Key Not Found" Error
```bash
# Check your .env.local file exists and has the right keys
cat .env.local

# Restart your development server after adding keys
npm run dev
```

#### 2. Image Generation Fails
- **Hugging Face**: Check if you've exceeded free tier (1000/month)
- **Replicate**: Verify payment method is valid
- **Both**: Check API key is correct and has proper permissions

#### 3. Slow Generation
- **Hugging Face**: Free tier can be slower during peak times
- **Replicate**: Usually faster, but check their status page

### Rate Limits:
- **Hugging Face**: 1000 requests/month (free), then rate limited
- **Replicate**: Pay-per-use, no monthly limits

## 🎨 Generated Image Examples

The system generates educational visuals optimized for students with dyslexia:

- **Mathematics**: Clear graphs, simple geometric shapes, color-coded formulas
- **Science**: Labeled diagrams, step-by-step processes, visual explanations
- **English**: Concept maps, story structures, grammar illustrations

## 🔄 Usage in the App

### In the Content Page:
1. **Green "Generate (FREE)" button**: Uses Hugging Face API
2. **Purple "Premium (HD)" button**: Uses Replicate API

### Results:
- Images are automatically optimized for educational use
- High contrast and simple design for accessibility
- Sized appropriately for the lesson content

## 📊 Monitoring Usage

### Track Your Usage:
- **Hugging Face**: Check usage in your [account dashboard](https://huggingface.co/settings/billing)
- **Replicate**: Monitor costs in your [billing section](https://replicate.com/account/billing)

### Cost Control Tips:
1. Use the free option during development
2. Generate images in batches for efficiency
3. Cache successful generations for reuse
4. Only use premium for final, published content

## 🚀 Next Steps

1. **Set up your preferred API** (start with free Hugging Face)
2. **Test image generation** with a few lessons
3. **Evaluate quality** for your students' needs
4. **Scale up** to premium if needed

## 📞 Support

If you encounter any issues:
1. Check this guide first
2. Verify your API keys are correct
3. Check the API provider's status page
4. Restart your development server
5. Clear browser cache if images don't update

---

**🎯 Pro Tip**: Start with the free Hugging Face option to test the feature, then upgrade to Replicate for production use when you need the highest quality visuals for your students! 