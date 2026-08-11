from typing import Dict, List
from pydantic import BaseModel


class PredictRequest(BaseModel):
    features: Dict[str, float]


class PredictResponse(BaseModel):
    prediction: int
    label: str
    probability: float
    model: str


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    scaler_loaded: bool
    features_loaded: bool
    model_type: str


class FeaturesResponse(BaseModel):
    features: List[str]


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


class HistoryItem(BaseModel):
    timestamp: str
    prediction: int
    label: str
    probability: float
    model: str
