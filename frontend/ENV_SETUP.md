# Environment Variables Setup

Create a `.env.local` file in the `frontend/` directory with the following variables:

## Firebase Configuration
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## API Configuration

### Option 1: Custom API Server (your Render deployment)
```bash
NEXT_PUBLIC_API_URL=https://brighten-api.onrender.com
```

### Option 2: Direct Hugging Face API (Fallback)
Get your token from: https://huggingface.co/settings/tokens
```bash
NEXT_PUBLIC_HUGGINGFACE_API_KEY=hf_your_huggingface_token_here
```

## How the Smart API Works

The app now uses `callBestAvailableAPI` which:
1. **First tries your custom API** (Render deployment)
2. **Falls back to Hugging Face direct** if custom API fails
3. **Provides seamless user experience** with automatic failover

## Quick Setup for Hugging Face Direct API

1. Go to https://huggingface.co/settings/tokens
2. Create a new token with "Read" permission
3. Add it to your `.env.local` as `NEXT_PUBLIC_HUGGINGFACE_API_KEY=hf_xxxxx`
4. The app will automatically use it as backup when your server is down

This gives you **immediate working text simplification** while we fix the server issues! 