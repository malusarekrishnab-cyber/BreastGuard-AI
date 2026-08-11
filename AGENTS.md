
---

# 2. `AGENTS.md`

```md
# BreastGuard AI - Development Guidelines

## Project Overview

BreastGuard AI is an educational Deep Learning web application for breast
cancer prediction using a trained Artificial Neural Network.

The project consists of:

- React + Vite frontend
- Firebase application services
- FastAPI backend
- TensorFlow/Keras ANN model
- Gemini AI Assistant

---

## Core Architecture

```text
React Frontend
      |
      | Prediction Request
      v
FastAPI Backend
      |
      +--> StandardScaler
      |
      +--> ANN Model
      |
      +--> Prediction
      |
      v
React Result
      |
      v
Firebase Firestore
      |
      +--> History
      +--> Analytics