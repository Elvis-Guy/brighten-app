# Brighten - A Learning Platform for Dyslexic Learners

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-11.8.1-orange?logo=firebase)](https://firebase.google.com/)
[![Python](https://img.shields.io/badge/Python-ML_Pipeline-green?logo=python)](https://python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-T5_Model-red?logo=pytorch)](https://pytorch.org/)

## 🌟 Overview

Brighten is an innovative learning platform specifically designed to support dyslexic learners. The application combines advanced machine learning with intuitive user interface design to create an accessible, personalized educational experience.

## Video Demos

### Initial Model Implementation

[![YouTube Demo](https://img.shields.io/badge/YouTube-Demo-red?logo=youtube)](https://www.youtube.com/watch?v=eVwP6MtANHs)

### Key Features
- 🤖 **AI-Powered Text Simplification** - Custom T5-based model trained specifically for dyslexia-friendly content
- 📚 **Adaptive Learning Content** - Personalized curriculum based on individual learning needs
- 🎨 **Accessibility-First Design** - UI optimized for dyslexic users with customizable settings
- 📊 **Progress Visualization** - Interactive charts and analytics to track learning progress
- 📤 **Content Upload** - Teachers can upload and automatically simplify educational materials
- 🔧 **Customizable Interface** - Adjustable fonts, colors, and reading aids

## 🏗️ Project Architecture

The project follows a modern full-stack architecture with three main components:

```
brighten-app/
├── frontend/          # Next.js React application
├── backend/           # API services (planned)
├── model/             # ML pipeline and trained models
└── README.md          # This file
```

## 📁 Directory Structure

### 🎨 Frontend (`/frontend`)

The frontend is built with **Next.js 15** and **React 19**, providing a modern, responsive web application.

**Tech Stack:**
- **Framework:** Next.js 15.3.3 with Turbopack
- **UI:** React 19 + TypeScript 5
- **Styling:** Tailwind CSS 4
- **Authentication:** Firebase 11.8.1
- **Development:** ESLint, TypeScript

**Key Features:**
- **App Router Structure:** Modern Next.js app directory structure
- **Dynamic Routing:** Content pages with dynamic lesson IDs (`/content/[lessonId]`)
- **Component Library:** Reusable UI components with accessibility focus
- **Context Management:** Global state for user preferences and settings
- **Firebase Integration:** Authentication and data persistence

**Directory Structure:**
```
frontend/
├── app/                    # Next.js app router pages
│   ├── content/[lessonId]/ # Dynamic lesson pages
│   ├── settings/           # User preferences
│   ├── upload/             # Content upload interface
│   ├── visualizations/     # Progress analytics
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/               # Core UI components
│   ├── icons/            # Icon library
│   ├── Navbar.tsx        # Navigation component
│   └── Footer.tsx        # Footer component
├── context/              # React context providers
├── data/                 # Static data and curriculum content
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

### 🧠 Model (`/model`)

The ML pipeline contains a custom-trained T5 model specifically designed for dyslexia-friendly text simplification.

**Tech Stack:**
- **Framework:** PyTorch + Transformers (Hugging Face)
- **Base Model:** T5-small (60M parameters)
- **Training:** Custom educational dataset + WikiAuto
- **Hardware:** Apple Silicon (MPS) optimization

**Key Components:**

1. **Training Pipeline** (`simplification_model.ipynb`):
   - Data preprocessing and augmentation
   - Custom training loop with educational content
   - Performance evaluation and metrics
   - Model export and optimization

2. **Trained Model** (`dyslexia_model_comprehensive/`):
   - **Model Performance:**
     - FKGL Improvement: 5.66 grade levels
     - Success Rate: 98.0%
     - Compression Ratio: 0.51
   - **Training Data:** 748 examples (WikiAuto + Educational content)
   - **Checkpoints:** Multiple training checkpoints preserved
   - **Evaluation:** Comprehensive metrics and visualizations

**Directory Structure:**
```
model/
├── simplification_model.ipynb           # Complete training pipeline
└── dyslexia_model_comprehensive/        # Trained model artifacts
    ├── README.md                        # Model documentation
    ├── config.json                      # Model configuration
    ├── tokenizer_config.json           # Tokenizer settings
    ├── model_metadata.json             # Training metadata
    ├── evaluation_results.json         # Performance metrics
    ├── evaluation_report.png           # Performance visualization
    ├── training_info.json              # Training parameters
    ├── checkpoint-200/                 # Training checkpoint
    ├── checkpoint-240/                 # Training checkpoint
    └── [large model files excluded]    # .safetensors, .pt files
```

### 🔧 Backend (`/backend`)

**Status:** Currently planned/in development

**Planned Features:**
- RESTful API for model inference
- User data management
- Content processing pipeline
- Analytics and progress tracking
- Integration with frontend and ML model

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **pnpm** (preferred) or npm
- **Python** 3.8+ (for ML components)
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Elvis-Guy/brighten-app.git
   cd brighten-app
   ```

2. **Set up the frontend:**
   ```bash
   cd frontend
   pnpm install
   # or npm install
   ```

3. **Configure Firebase:**
   - Create a Firebase project
   - Add your Firebase configuration
   - Set up authentication

4. **Set up the ML environment:**
   ```bash
   cd model
   pip install torch transformers nltk pandas numpy matplotlib seaborn
   ```

### Running the Application

1. **Start the frontend development server:**
   ```bash
   cd frontend
   pnpm dev
   # or npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

2. **Use the ML model:**
   ```python
   # In the model directory
   from transformers import T5ForConditionalGeneration, T5Tokenizer
   
   tokenizer = T5Tokenizer.from_pretrained('./dyslexia_model_comprehensive')
   model = T5ForConditionalGeneration.from_pretrained('./dyslexia_model_comprehensive')
   
   # Simplify text
   input_text = "[DYSLEXIA] simplify for dyslexia: Your complex text here"
   inputs = tokenizer(input_text, return_tensors='pt')
   outputs = model.generate(**inputs, max_length=256)
   simplified = tokenizer.decode(outputs[0], skip_special_tokens=True)
   ```

## 🎯 Usage

### For Students
1. **Browse Learning Content:** Access curriculum materials adapted for dyslexic learners
2. **Customize Interface:** Adjust fonts, colors, and reading aids in settings
3. **Track Progress:** View learning analytics and achievements
4. **Interactive Learning:** Engage with simplified, digestible content

### For Educators
1. **Upload Content:** Add educational materials for automatic simplification
2. **Monitor Progress:** Track student engagement and learning outcomes
3. **Customize Curriculum:** Adapt content to individual student needs

### For Developers
1. **Extend the Model:** Fine-tune the ML model with additional data
2. **Add Features:** Contribute new accessibility features
3. **Improve UI/UX:** Enhance the user interface for better accessibility

## 🧪 Model Details

### Training Methodology
- **Base Architecture:** T5-small transformer model
- **Fine-tuning:** Specialized training on dyslexia-focused datasets
- **Optimization:** Apple Silicon (MPS) acceleration
- **Evaluation:** Comprehensive metrics including FKGL, compression ratio, and success rate

### Performance Metrics (Currently for initial model)
- **Flesch-Kincaid Grade Level Improvement:** 5.66 grade levels
- **Success Rate:** 98.0% (successful simplifications)
- **Compression Ratio:** 0.51 (average text reduction)
- **Training Examples:** 748 curated educational examples with a plan for a deeper model



## 🛡️ Accessibility Features

- **Dyslexia-Friendly Fonts:** OpenDyslexic and other recommended typefaces
- **Color Customization:** High contrast themes and color options
- **Reading Aids:** Line spacing, text size, and background adjustments
- **Simplified Navigation:** Intuitive, clutter-free interface design
- **Progress Indicators:** Clear visual feedback for learning progress

## 🔮 Future Roadmap

- [ ] **Backend API Development:** Complete REST API implementation
- [ ] **Mobile Application:** React Native mobile app
- [ ] **Advanced Analytics:** Detailed learning insights and recommendations
- [ ] **Multi-language Support:** Expand to additional languages
- [ ] **Voice Integration:** Text-to-speech and voice navigation
- [ ] **Collaborative Features:** Teacher-student interaction tools
- [ ] **Offline Mode:** Downloadable content for offline learning

## 🤝 Contributing

We currently not accepting any contributions from the open source community as this project is a capstone project for academic purposes.


## 📄 License

This project is part of a capstone project for educational purposes.

## 👥 Team

**Elvis Guy Bakunzi** - *Machine Learning Engineer*
- Frontend Development (Next.js/React)
- ML Model Training & Optimization
- System Architecture

## 🙏 Acknowledgments

- **African Leadership University** - Academic support and resources
- **Hugging Face** - Transformers library and model hosting
- **WikiAuto Dataset** - Base training data for text simplification
- **Firebase** - Authentication and hosting services
- **Next.js Team** - Framework and development tools

## 📞 Support

For questions, issues, or support:
- Create an issue in this repository
- Contact: [guyelvisbakunzi@gmail.com](mailto:guyelvisbakunzi@gmail.com)

---

**Made with ❤️ for the dyslexic learning community**
