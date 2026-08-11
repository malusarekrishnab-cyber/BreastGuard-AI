from pathlib import Path
import joblib
import numpy as np
import tensorflow as tf

BASE_DIR = Path(__file__).resolve().parent
MODELS_DIR = BASE_DIR / "models"
MODEL_PATH = MODELS_DIR / "breast_cancer_ann.keras"
SCALER_PATH = MODELS_DIR / "breast_cancer_scaler.pkl"
FEATURES_PATH = MODELS_DIR / "breast_cancer_features.pkl"


class ModelService:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.feature_names = None
        self.load_error = None

    def load(self):
        try:
            if not MODEL_PATH.exists():
                raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")
            if not SCALER_PATH.exists():
                raise FileNotFoundError(f"Scaler file not found: {SCALER_PATH}")
            if not FEATURES_PATH.exists():
                raise FileNotFoundError(f"Features file not found: {FEATURES_PATH}")

            self.model = tf.keras.models.load_model(str(MODEL_PATH))
            self.scaler = joblib.load(str(SCALER_PATH))
            self.feature_names = list(joblib.load(str(FEATURES_PATH)))

            if not isinstance(self.feature_names, list) or len(self.feature_names) == 0:
                raise ValueError("breast_cancer_features.pkl must contain a non-empty list")

            self.load_error = None
            print(f"[model_service] Loaded model, scaler and {len(self.feature_names)} features successfully.")
        except Exception as e:
            self.load_error = str(e)
            self.model = None
            self.scaler = None
            self.feature_names = None
            print(f"[model_service] Failed to load model artifacts: {e}")

    @property
    def loaded(self):
        return self.model is not None and self.scaler is not None and self.feature_names is not None

    def predict(self, payload: dict) -> dict:
        if not self.loaded:
            raise RuntimeError("Model is not loaded")

        missing = [f for f in self.feature_names if f not in payload]
        if missing:
            raise ValueError(f"Missing features: {', '.join(missing)}")

        try:
            values = [float(payload[f]) for f in self.feature_names]
        except (TypeError, ValueError):
            raise ValueError("All features must be numeric")

        arr = np.array(values, dtype=np.float32).reshape(1, -1)
        scaled = self.scaler.transform(arr)
        prob = float(self.model.predict(scaled, verbose=0).ravel()[0])
        prediction = 1 if prob >= 0.5 else 0
        label = "Malignant" if prediction == 1 else "Benign"

        return {
            "prediction": prediction,
            "label": label,
            "probability": round(prob, 4),
            "model": "Artificial Neural Network",
        }


model_service = ModelService()
