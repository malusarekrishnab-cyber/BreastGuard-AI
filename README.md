# 🛡️ BreastGuard AI

## AI-Powered Breast Cancer Prediction & Educational Analysis

BreastGuard AI is an educational web application that uses a trained
Artificial Neural Network (ANN) to analyze numerical breast-cell measurements
and generate a Benign or Malignant prediction.

The application combines:

- React + Vite frontend
- Firebase for application services and prediction history
- FastAPI backend
- TensorFlow / Keras Artificial Neural Network
- StandardScaler preprocessing
- Gemini AI Assistant
- Interactive analytics dashboard

> ⚠️ IMPORTANT: BreastGuard AI is an educational/research project.
> It is NOT a medical diagnostic system and must not be used as a substitute
> for professional medical diagnosis or treatment.

---

## 🚀 Main Features

### 🔬 ANN Prediction

Users can enter breast-cell measurement features and send them to the trained
ANN model.

Prediction pipeline:

User Input
↓
React Frontend
↓
FastAPI `/api/predict`
↓
StandardScaler
↓
Trained ANN
↓
Sigmoid Probability
↓
Benign / Malignant
↓
Frontend Result

---

### 📊 Dashboard

The dashboard provides an overview of:

- Model information
- Prediction statistics
- Application status
- Recent prediction activity
- Educational information

---

### 📈 Analytics

Analytics displays real prediction data such as:

- Total predictions
- Benign predictions
- Malignant predictions
- Prediction distribution
- Probability information

Analytics data is stored using Firebase Firestore.

---

### 🤖 AI Assistant

BreastGuard AI includes an educational AI Assistant powered through the
FastAPI backend.

The assistant can explain:

- Artificial Neural Networks
- Breast Cancer Wisconsin Dataset
- StandardScaler
- ReLU
- Sigmoid
- Dropout
- Batch Normalization
- Binary Crossentropy
- Adam optimizer
- Accuracy
- Precision
- Recall
- F1 Score
- Confusion Matrix
- Machine Learning and Deep Learning concepts

The Gemini API key is kept on the backend and is NOT exposed in the frontend.

---

### 🧠 Model Information

Model:

**Artificial Neural Network (ANN)**

Framework:

**TensorFlow / Keras**

Preprocessing:

**StandardScaler**

Saved model files:

```text
breast_cancer_ann.keras
breast_cancer_scaler.pkl
breast_cancer_features.pkl