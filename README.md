# FairLens — India-Focused AI Bias Detection Platform

**FairLens** is a no-code, accessible solution designed to inspect datasets and software models for hidden unfairness or discrimination, with a specific focus on the Indian socioeconomic context. 

Built for the **Google Solution Challenge 2026** under the **[Unbiased AI Decision]** problem statement, FairLens bridges the gap between complex technical bias research and the practical needs of non-technical users like HR managers, NGOs, and small organizations.

## 🎯 Key Features
- **Localized Context:** Automatically detects bias across Indian sensitive attributes like Caste, Religion, Regional Language, and Pincode.
- **No-Code Audit:** Simple drag-and-drop interface for CSV datasets—no Python or ML knowledge required.
- **Explainable AI:** Uses Gemini 2.0 Flash to translate complex bias metrics into plain-English findings and actionable fix suggestions.
- **Compliance Ready:** Generates professional PDF reports aligned with India AI Governance Guidelines 2025.

## 🚀 Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS, Recharts, Firebase Auth.
- **Backend:** FastAPI, Fairlearn (Bias Metrics), Pandas, ReportLab (PDFs), Firebase Admin.
- **AI Engine:** Gemini CLI (gemini-2.0-flash).

## 🛠️ Local Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- Gemini CLI installed and authenticated
- Firebase Project (Auth & Firestore enabled)

### Backend Setup
1. Navigate to `backend/`
2. Create a virtual environment: `python -m venv venv`
3. Activate: `source venv/bin/activate` (or `venv\Scripts\activate` on Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Set environment variables:
   - `GOOGLE_APPLICATION_CREDENTIALS`: Path to your Firebase service account JSON.
6. Run server: `uvicorn main:app --host 0.0.0.0 --port 8080 --reload`

### Frontend Setup
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Create a `.env` file with your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_BASE_URL=http://localhost:8080/api
   ```
4. Run development server: `npm run dev`

## 📊 Sample Data
You can find a biased hiring dataset at `backend/data/sample_hiring_india.csv` to test the detection capabilities.

## 🌍 SDG Alignment
- **SDG 10: Reduced Inequalities** — By providing tools to detect and fix algorithmic discrimination.
- **SDG 16: Peace, Justice, and Strong Institutions** — By promoting transparent and accountable AI systems.
