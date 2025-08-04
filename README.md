# Brighten - A Learning Platform for Dyslexic Learners

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-11.9.1-orange?logo=firebase)](https://firebase.google.com/)
[![Flask](https://img.shields.io/badge/Flask-Backend_API-green?logo=flask)](https://flask.palletsprojects.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-BART_Model-red?logo=pytorch)](https://pytorch.org/)
[![Hugging Face](https://img.shields.io/badge/🤗-Model_Hub-yellow)](https://huggingface.co/elvisbakunzi/dyslexia-friendly-text-simplifier)

## 🌟 Overview

Brighten is an innovative learning platform specifically designed to support dyslexic learners. The application combines advanced machine learning with intuitive user interface design to create an accessible, personalized educational experience. Now featuring a production-ready backend API and enhanced ML capabilities deployed on Hugging Face.

## ⚠️ Important Notice

**🚨 REQUIRED: Local API Setup**

To use the full functionality of Brighten, **you MUST run the backend API locally** before starting the frontend application. The AI model used for text simplification is too large to host on free hosting services, so it requires local execution.

### Quick Start Options:

**Option 1: Full Local Setup (Recommended for Development)**
1. Run the backend API locally: `cd backend && python api.py`
2. Run the frontend locally: `cd frontend && npm run dev`
3. Access the app at [http://localhost:3000](http://localhost:3000)

**Option 2: Use Hosted Frontend + Local API**
1. Run the backend API locally: `cd backend && python api.py` (runs on port 5001)
2. Use the hosted frontend: [https://brighten-app.vercel.app/](https://brighten-app.vercel.app/)
3. The hosted frontend will connect to your local API automatically

> 📌 **Note:** We are actively working on finding a solution to host the AI model in the cloud. This local setup requirement is temporary.

## 📺 Video Demos

### Initial Model Implementation
[![YouTube Demo](https://img.shields.io/badge/YouTube-Initial_Demo-red?logo=youtube)](https://www.youtube.com/watch?v=eVwP6MtANHs)

### Final Version of the Product
[![YouTube Demo](https://img.shields.io/badge/YouTube-Final_Version-red?logo=youtube)](https://youtu.be/GOq-gUS8ZoE)
*Complete demonstration of Brighten's AI-powered learning platform for dyslexic learners*

## ✨ Key Features

- 🤖 **Production AI-Powered Text Simplification** - Custom BART model hosted on Hugging Face Hub for dyslexia-friendly content
- 🔐 **Complete Authentication System** - Firebase authentication with Google Sign-In, email/password, and guest access
- 👥 **Admin Dashboard** - Full CRUD operations for curriculum management with role-based permissions
- 📚 **Dynamic Curriculum System** - Multi-grade curriculum (10-12) with progress tracking across subjects
- 🎨 **Accessibility-First Design** - UI optimized for dyslexic users with customizable settings and preferences
- 📊 **Learning Analytics** - Real-time progress tracking, achievements, and personalized recommendations
- 📤 **Multi-Format Content Upload** - Support for text and PDF processing with automatic simplification
- 🖼️ **AI Image Generation** - Educational visualizations using Hugging Face and Replicate APIs
- 🔊 **Text-to-Speech Integration** - Customizable voice synthesis for enhanced accessibility
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🛡️ **Privacy & Security** - GDPR-compliant data handling with secure authentication

## 🏗️ Project Architecture

The project follows a modern full-stack architecture with four main components:

```
brighten-app/
├── frontend/          # Next.js React application (Production Ready)
├── backend/           # Flask API services (Production Ready)
├── model/             # ML pipeline and Hugging Face deployment
└── README.md          # This file
```

## 📁 Directory Structure

### 🎨 Frontend (`/frontend`) - **Production Ready**

The frontend is built with **Next.js 15** and **React 19**, providing a modern, responsive web application with complete authentication and admin capabilities.

**Tech Stack:**
- **Framework:** Next.js 15.3.3 with Turbopack
- **UI:** React 19 + TypeScript 5
- **Styling:** Tailwind CSS 3.4.1
- **Authentication:** Firebase 11.9.1 (Google Auth, Email/Password, Guest)
- **PDF Processing:** PDF.js 5.3.93
- **Development:** ESLint, TypeScript

**New Production Features:**
- **Complete Authentication Flow:** Sign up, sign in, Google OAuth, password reset, account management
- **Admin Panel:** Full curriculum management with role-based permissions
- **PDF Upload & Processing:** Extract and simplify text from PDF documents
- **Learning Progress Tracking:** Detailed analytics, achievements, and personalized recommendations
- **Multi-API Image Generation:** Hugging Face (free tier) and Replicate (premium) integration
- **Enhanced Accessibility:** Text-to-speech, customizable voice settings, dyslexia-friendly fonts
- **Real-time Data Sync:** Firebase Firestore integration for cross-device synchronization

**Directory Structure:**
```
frontend/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin dashboard and management
│   ├── auth/              # Authentication pages (signin/signup)
│   ├── content/[lessonId]/ # Dynamic lesson pages with AI features
│   ├── curriculum/        # Curriculum browser and selection
│   ├── settings/          # User preferences and account management
│   ├── upload/            # Content upload with PDF support
│   ├── about/             # About page
│   ├── terms/             # Terms of service
│   ├── privacy/           # Privacy policy
│   ├── layout.tsx         # Root layout with navigation
│   └── page.tsx          # Enhanced home page with progress tracking
├── components/            # Reusable UI components
│   ├── ui/               # Core UI components (modals, forms)
│   ├── AdminRoute.tsx    # Admin-only route protection
│   ├── ProtectedRoute.tsx # Authentication middleware
│   ├── Navbar.tsx        # Enhanced navigation with user management
│   └── Footer.tsx        # Site footer
├── context/              # React context providers
│   └── AppContext.tsx    # Global state management with Firebase
├── lib/                  # Utility functions
│   ├── api.ts           # API integrations (HF, Replicate, Local)
│   └── firebase.ts      # Firebase configuration
├── types/                # TypeScript type definitions
└── public/               # Static assets and curriculum images
```

### 🔧 Backend (`/backend`) - **Production Ready**

**Status:** ✅ **Fully Implemented and Production-Ready**

The backend is now a complete Flask API service with Hugging Face integration for real-time text simplification.

**Tech Stack:**
- **Framework:** Flask with CORS support
- **ML Integration:** Hugging Face Transformers + PyTorch
- **Model:** Custom BART model (`elvisbakunzi/dyslexia-friendly-text-simplifier`)
- **Optimization:** GPU/MPS acceleration with CPU fallback
- **Deployment:** Production-ready with proper error handling

**API Endpoints:**
- `POST /simplify` - Real-time text simplification
- `GET /health` - API health check
- `GET /model-info` - Model information and statistics

**Features:**
- **Production Model:** Hosted on Hugging Face Hub for scalability
- **Smart Device Detection:** Automatic GPU/MPS/CPU optimization
- **Error Handling:** Comprehensive error responses and logging
- **Performance Optimization:** Model caching and efficient tokenization
- **CORS Support:** Full cross-origin resource sharing for web apps

```
backend/
├── api.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── test_api.py           # API testing suite
└── [deployment files]    # Production deployment configuration
```

### 🧠 Model (`/model`) - **Deployed on Hugging Face**

The ML pipeline now features a production-deployed model on Hugging Face Hub with comprehensive evaluation metrics.

**Production Model:** [🤗 elvisbakunzi/dyslexia-friendly-text-simplifier](https://huggingface.co/elvisbakunzi/dyslexia-friendly-text-simplifier)

**Tech Stack:**
- **Architecture:** BART-base (140M parameters)
- **Training:** Custom educational dataset + WikiAuto
- **Deployment:** Hugging Face Model Hub
- **Integration:** Direct API access via transformers library

**Model Performance:**
- **Flesch-Kincaid Grade Level Improvement:** 5.66 grade levels
- **Success Rate:** 98.0% (successful simplifications)
- **Compression Ratio:** 0.51 (average text reduction)
- **Training Examples:** 748 curated educational examples
- **Inference Speed:** ~2-3 seconds per text (GPU), ~5-8 seconds (CPU)

**Directory Structure:**
```
model/
├── train_bart_simplification.ipynb     # Complete training pipeline
├── dyslexia_model_comprehensive/       # Local model artifacts (legacy)
│   ├── evaluation_results.json        # Performance metrics
│   ├── training_info.json             # Training parameters
│   └── [model checkpoints]            # Local training checkpoints
└── [Hugging Face deployment files]    # Production model artifacts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **pnpm** (preferred) or npm
- **Python** 3.8+ (for backend API)
- **Git**
- **Firebase Account** (for authentication)
- **Hugging Face Account** (optional, for image generation)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Elvis-Guy/brighten-app.git
   cd brighten-app
   ```

2. **Set up the frontend:**
   ```bash
   cd frontend
   npm install
   # or pnpm install
   ```

3. **Configure Firebase:**
   ```bash
   # Create .env.local in frontend directory
   cp .env.local.example .env.local
   # Add your Firebase configuration
   ```

4. **Set up the backend API:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

5. **Optional - Set up image generation:**
   ```bash
   # Add to frontend/.env.local
   NEXT_PUBLIC_HUGGINGFACE_API_KEY=your_hf_token
   NEXT_PUBLIC_REPLICATE_API_TOKEN=your_replicate_token
   ```

### Running the Application

> ⚠️ **CRITICAL:** The backend API **MUST** be started first and running before the frontend will work properly!

1. **Start the backend API (REQUIRED FIRST STEP):**
   ```bash
   cd backend
   python api.py
   # ✅ API runs on http://localhost:5001
   # ✅ Wait for "Model loaded successfully" message
   ```

2. **Verify API is running:**
   ```bash
   # Test the API health endpoint
   curl http://localhost:5001/health
   # Should return: {"status": "healthy", "model_loaded": true}
   ```

3. **Start the frontend development server:**
   ```bash
   cd frontend
   npm dev
   # or pnpm run dev
   # Frontend runs on http://localhost:3000
   ```

4. **Access the application:**
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **API:** [http://localhost:5001](http://localhost:5001)
   - **API Health:** [http://localhost:5001/health](http://localhost:5001/health)

> 🚨 **Troubleshooting:** If the frontend shows API connection errors, ensure the backend is running on port 5001 and the model has loaded successfully.

## 🎯 Usage

### For Students
1. **Create Account:** Sign up with email or Google for full features
2. **Guest Access:** Browse Grade 10 curriculum without registration
3. **Personalized Learning:** Customize fonts, colors, and accessibility settings
4. **Progress Tracking:** View detailed analytics and achievements
5. **Interactive Content:** Access simplified curriculum with AI-generated visuals
6. **Upload & Simplify:** Process your own texts and PDFs for easier reading

### For Educators & Administrators
1. **Admin Dashboard:** Manage curriculum, grades, subjects, and topics
2. **Content Management:** Create, edit, and organize educational materials
3. **Student Analytics:** Monitor learning progress and engagement
4. **Bulk Upload:** Process multiple educational documents
5. **Accessibility Tools:** Customize content for different learning needs

### For Developers
1. **API Integration:** Use the simplification API in your applications
2. **Model Deployment:** Deploy custom models on Hugging Face
3. **Frontend Customization:** Extend React components and features
4. **Admin Functions:** Implement custom administrative features

## 🧪 Production Model Details

### Hugging Face Integration
- **Model Hub:** [elvisbakunzi/dyslexia-friendly-text-simplifier](https://huggingface.co/elvisbakunzi/dyslexia-friendly-text-simplifier)
- **Direct API Access:** Integrated with transformers library
- **Scalable Inference:** Cloud-based model serving
- **Version Control:** Model versioning and updates through HF Hub

### Training Methodology
- **Base Architecture:** BART-base transformer model (140M parameters)
- **Fine-tuning:** Specialized training on dyslexia-focused datasets
- **Optimization:** Multi-device acceleration (CUDA/MPS/CPU)
- **Evaluation:** Comprehensive metrics including FKGL, compression ratio, and success rate

### Performance Metrics
- **Flesch-Kincaid Grade Level Improvement:** 5.66 grade levels
- **Success Rate:** 98.0% (successful simplifications)
- **Compression Ratio:** 0.51 (average text reduction)
- **Training Examples:** 748 curated educational examples
- **Inference Performance:** Real-time processing with sub-10 second response times

## 🛡️ Accessibility Features

- **Dyslexia-Friendly Design:** OpenDyslexic fonts and specialized color schemes
- **Customizable Interface:** Font size, spacing, contrast, and background adjustments
- **Text-to-Speech:** Multiple voice options with speed control
- **Visual Learning Aids:** AI-generated diagrams and illustrations
- **Progress Indicators:** Clear visual feedback for learning milestones
- **Keyboard Navigation:** Full keyboard accessibility support
- **Screen Reader Compatible:** ARIA labels and semantic markup

## 🔐 Security & Privacy

- **Firebase Authentication:** Secure OAuth 2.0 implementation
- **Data Encryption:** End-to-end encryption for user data
- **Privacy Controls:** Granular privacy settings and data export
- **GDPR Compliance:** European data protection standards
- **Role-Based Access:** Admin and user permission systems
- **Secure API:** CORS protection and rate limiting

## 🔮 Future Roadmap

- [ ] **Mobile Application:** React Native mobile app development
- [ ] **Advanced Analytics:** AI-powered learning recommendations
- [ ] **Multi-language Support:** Expand to additional languages
- [ ] **Voice Integration:** Advanced speech recognition and navigation
- [ ] **Collaborative Features:** Teacher-student interaction tools
- [ ] **Offline Mode:** Downloadable content for offline learning
- [ ] **AR/VR Integration:** Immersive learning experiences
- [ ] **API Marketplace:** Third-party integrations and plugins

## 🤝 Contributing

We currently not accepting any contributions from the open source community as this project is a capstone project for academic purposes.

## 📄 License

This project is part of a capstone project for educational purposes.

## 👥 Team

**Elvis Guy Bakunzi** - *Full-Stack Developer & ML Engineer*
- Frontend Development (Next.js/React/TypeScript)
- Backend API Development (Flask/Python)
- ML Model Training & Deployment (PyTorch/Hugging Face)
- System Architecture & DevOps

## 🙏 Acknowledgments

- **African Leadership University** - Academic support and resources
- **Hugging Face** - Model hosting and transformers library
- **WikiAuto Dataset** - Base training data for text simplification
- **Firebase** - Authentication and cloud services
- **Next.js Team** - Framework and development tools
- **Replicate** - Premium AI image generation services
- **OpenAI & Google** - AI research and development insights

## 📞 Support

For questions, issues, or support:
- Create an issue in this repository
- Contact: [guyelvisbakunzi@gmail.com](mailto:guyelvisbakunzi@gmail.com)


---

**Made with ❤️ for the dyslexic learning community**

