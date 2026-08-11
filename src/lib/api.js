// API client for the BreastGuard AI FastAPI backend.
// The backend runs locally (default http://localhost:8000) and owns the
// TensorFlow/Keras ANN model, scaler and feature list. The frontend never
// touches the .keras / .pkl files directly — it only calls these endpoints.

export const API_BASE =
  (import.meta && import.meta.env && import.meta.env.VITE_API_URL) ||
  "http://localhost:8000";

async function parseError(res, fallback) {
  try {
    const data = await res.json();
    if (data && data.detail) return data.detail;
    if (typeof data === "string") return data;
  } catch (_) {
    // response had no json body
  }
  return fallback;
}

export async function getHealth() {
  let res;
  try {
    res = await fetch(`${API_BASE}/api/health`, {
      headers: { Accept: "application/json" },
    });
  } catch (_) {
    throw new Error(
      "Prediction service is currently unavailable. Please make sure the FastAPI backend is running."
    );
  }
  if (!res.ok) throw new Error(await parseError(res, `Health check failed (${res.status})`));
  return res.json();
}

export async function getFeatures() {
  let res;
  try {
    res = await fetch(`${API_BASE}/api/features`, {
      headers: { Accept: "application/json" },
    });
  } catch (_) {
    throw new Error(
      "Prediction service is currently unavailable. Please make sure the FastAPI backend is running."
    );
  }
  if (!res.ok) throw new Error(await parseError(res, `Failed to load features (${res.status})`));
  const data = await res.json();
  const features = Array.isArray(data) ? data : data.features;
  if (!Array.isArray(features)) throw new Error("Invalid features response from backend");
  return features;
}

export async function predict(values) {
  let res;
  try {
    res = await fetch(`${API_BASE}/api/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ features: values }),
    });
  } catch (_) {
    throw new Error(
      "Prediction service is currently unavailable. Please make sure the FastAPI backend is running."
    );
  }
  if (!res.ok) throw new Error(await parseError(res, `Prediction request failed (${res.status})`));
  return res.json();
}

export async function chat(message) {
  let res;
  try {
    res = await fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ message }),
    });
  } catch (_) {
    throw new Error("AI Assistant is temporarily unavailable.");
  }
  if (!res.ok) throw new Error(await parseError(res, `Chat request failed (${res.status})`));
  const data = await res.json();
  return data.reply;
}
