# BreastGuard AI — Backend (FastAPI + Groq)

Ha backend VS Code madhe local run karायचा आहे. ha plain Python/FastAPI project आहे.

## 1. Model files ठेवा

Tumche 3 files ithe copy kara:

```
backend/models/breast_cancer_ann.keras
backend/models/breast_cancer_scaler.pkl
backend/models/breast_cancer_features.pkl
```

(models folder aधीच बनवलेला आहे, फक्त files टाका.)

## 2. Virtual environment + install

VS Code terminal madhe (backend folder che आत):

```bash
python -m venv venv
```

Windows:
```bash
venv\Scripts\activate
```

macOS / Linux:
```bash
source venv/bin/activate
```

Nantar:
```bash
pip install -r requirements.txt
```

## 3. Groq API key set kara

`.env.example` la copy karून `.env` navach file बनवा (same backend folder madhe), आणि tyat तुमची Groq key टाका:

```
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
GROQ_MODEL=llama-3.3-70b-versatile
```

Groq API key free madhe इथून milते: https://console.groq.com/keys

`.env` कधीच GitHub var push करू नका — `.gitignore` madhe already excluded aahe.

## 4. Backend run kara

```bash
uvicorn main:app --reload --port 8000
```

Backend suru zhalyavar check kara: http://localhost:8000/api/health

Response asa yeईल:

```json
{
  "status": "ok",
  "model_loaded": true,
  "scaler_loaded": true,
  "features_loaded": true,
  "model_type": "Artificial Neural Network"
}
```

Jar `status: "error"` aala, tar model files barobar `models/` folder madhe nahit — parat check kara.

## 5. Frontend la connect kara

Frontend app `http://localhost:8000/api/*` la call karel — backend chalu asel tar app madhil "Prediction service unavailable" error automatically band houn jail.

## Endpoints

| Method | Path            | Karya                                   |
|--------|-----------------|------------------------------------------|
| GET    | /api/health     | Model/scaler/features loaded ahet ka check |
| GET    | /api/features   | 30 feature names list                   |
| POST   | /api/predict    | Prediction — {"features": {...}}        |
| GET    | /api/history    | Sagle predictions (in-memory)           |
| DELETE | /api/history    | History clear karto                     |
| POST   | /api/chat       | AI Assistant chat (Groq powered)        |

## Important

- Prediction kadhihi hardcoded/fake nahi — nehami real model + scaler use hoto.
- Groq API key फक्त backend madhech वापरली जाते, frontend/browser la kadhihi dili jat nahi.
- Ha model images (X-ray/MRI/CT) analyze karत नाही — फक्त 30 numeric tabular features cha वापर karto.
