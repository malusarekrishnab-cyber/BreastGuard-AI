import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

let app, db, auth;

try {
  if (!firebaseConfig.apiKey) {
    throw new Error('Firebase configuration missing.');
  }
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { app, db, auth };

// History Service

export async function savePrediction(data) {
  if (!db) {
    console.warn("Prediction generated successfully, but prediction history could not be saved (Firestore unavailable).");
    return;
  }
  try {
    const historyCol = collection(db, 'prediction_history');
    await addDoc(historyCol, {
      prediction: data.prediction,
      label: data.label,
      probability: data.probability,
      model: data.model || "Artificial Neural Network",
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error saving prediction to Firestore:", error);
  }
}

export async function getHistory() {
  if (!db) return [];
  try {
    const historyCol = collection(db, 'prediction_history');
    const q = query(historyCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.createdAt?.toMillis() || Date.now()
      };
    });
  } catch (error) {
    console.error("Error getting history from Firestore:", error);
    return [];
  }
}

export async function clearHistory() {
  if (!db) return;
  try {
    const historyCol = collection(db, 'prediction_history');
    const snapshot = await getDocs(historyCol);
    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error clearing history in Firestore:", error);
  }
}
