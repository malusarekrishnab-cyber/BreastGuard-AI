import os
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()  # loads GROQ_API_KEY from backend/.env

from model_service import model_service
from schemas import (
    PredictRequest, PredictResponse, HealthResponse, FeaturesResponse,
    ChatRequest, ChatResponse, HistoryItem,
)

app = FastAPI(title="BreastGuard AI API", version="1.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory prediction history (resets on restart). No persistent medical data stored.
_history: list[dict] = []

# Groq client (lazy init, backend-only — key never reaches the frontend)
_groq_client = None
_GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

_SYSTEM_INSTRUCTION = (
    "You are the educational assistant for the BreastGuard AI project. "
    "Explain Artificial Neural Networks, the Breast Cancer Wisconsin Diagnostic dataset, "
    "preprocessing, StandardScaler, ReLU, Sigmoid, Dropout, Batch Normalization, "
    "Binary Crossentropy, Adam optimizer, model evaluation and the project architecture. "
    "You may explain the model's output for educational purposes. "
    "You are NOT a doctor. Do NOT diagnose users. Do NOT provide medical treatment instructions. "
    "Do NOT claim that the model can confirm whether a person has cancer. "
    "If asked for medical diagnosis or treatment, explain that this application is educational "
    "and recommend consulting a qualified healthcare professional."
)


def _get_groq_client():
    global _groq_client
    if _groq_client is None:
        from groq import Groq
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise RuntimeError("GROQ_API_KEY is not set")
        _groq_client = Groq(api_key=api_key)
    return _groq_client


@app.on_event("startup")
def startup():
    model_service.load()


@app.get("/api/health", response_model=HealthResponse)
def health():
    return HealthResponse(
        status="ok" if model_service.loaded else "error",
        model_loaded=model_service.model is not None,
        scaler_loaded=model_service.scaler is not None,
        features_loaded=model_service.feature_names is not None,
        model_type="Artificial Neural Network",
    )


@app.get("/api/features", response_model=FeaturesResponse)
def features():
    if not model_service.feature_names:
        raise HTTPException(status_code=503, detail="Feature configuration not loaded")
    return FeaturesResponse(features=model_service.feature_names)


@app.post("/api/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    if not model_service.loaded:
        raise HTTPException(status_code=503, detail="Model not loaded")
    try:
        result = model_service.predict(req.features)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Prediction failed")

    _history.append({
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "prediction": result["prediction"],
        "label": result["label"],
        "probability": result["probability"],
        "model": result["model"],
    })
    return result


@app.get("/api/history", response_model=list[HistoryItem])
def history():
    return _history


@app.delete("/api/history")
def clear_history():
    _history.clear()
    return {"cleared": True}


@app.post("/api/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    if not os.getenv("GROQ_API_KEY"):
        raise HTTPException(status_code=503, detail="AI Assistant is temporarily unavailable.")
    try:
        client = _get_groq_client()
        completion = client.chat.completions.create(
            model=_GROQ_MODEL,
            messages=[
                {"role": "system", "content": _SYSTEM_INSTRUCTION},
                {"role": "user", "content": req.message},
            ],
            temperature=0.4,
            max_tokens=1024,
        )
        reply = completion.choices[0].message.content or ""
        return ChatResponse(reply=reply)
    except Exception as e:
        print(f"[chat] Groq API error: {e}")
        raise HTTPException(status_code=503, detail="AI Assistant is temporarily unavailable.")
