import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy, onSnapshot, serverTimestamp, limit, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// --- PASTE YOUR FIREBASE CONFIGURATION HERE ---
const firebaseConfig = {
    apiKey: "AIzaSyAdlWWNWbpizo_Dx2xJikTDKHdj4AJ0VSY",
    authDomain: "battletracker-51502.firebaseapp.com",
    projectId: "battletracker-51502",
    storageBucket: "battletracker-51502.firebasestorage.app",
    messagingSenderId: "717377728252",
    appId: "1:717377728252:web:652210dc6904fef7ce7179"
};
// ----------------------------------------------

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Use a consistent App ID
const appId = 'akashic-tome-v1'; 

// Helper to initialize auth and wait for it
async function initAuth() {
    // Check if we have a sticky ID to verify identity consistency
    const localId = localStorage.getItem('akashic_user_id');
    
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // If we have a user, ensure the local ID matches or is set
                if (!localId) {
                    localStorage.setItem('akashic_user_id', user.uid);
                }
                unsubscribe();
                resolve(user);
            } else {
                // No user? Sign in anonymously
                signInAnonymously(auth).catch((error) => {
                    console.error("Auth Failed:", error);
                });
            }
        });
    });
}

// Export everything needed by the other apps
export { 
    app, auth, db, appId, initAuth,
    collection, doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc, 
    query, where, orderBy, onSnapshot, serverTimestamp, limit, getDocs
};