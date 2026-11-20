import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const app = initializeApp(window.SONORA_FIREBASE_CONFIG, "sonora");
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const gate = document.getElementById("sonora-auth-gate");
const message = document.getElementById("auth-message");
const loginButton = document.getElementById("sonora-login");

loginButton.addEventListener("click", async () => {
  message.textContent = "Opening Google sign-in…";
  try {
    const result = await signInWithPopup(auth, provider);
    if (result.user.uid !== window.SONORA_ALLOWED_UID) {
      await signOut(auth);
      message.textContent = "This Google account is not authorised to use SONORA.";
    }
  } catch (error) {
    message.textContent = error.message || "Sign-in failed. Please try again.";
  }
});

onAuthStateChanged(auth, async user => {
  if (user && user.uid === window.SONORA_ALLOWED_UID) {
    document.body.classList.add("sonora-authorised");
    gate.style.display = "none";
    const header = document.querySelector("header");
    if (header && !document.getElementById("sonora-logout")) {
      const button = document.createElement("button");
      button.id = "sonora-logout";
      button.className = "pill";
      button.textContent = "Sign out";
      button.addEventListener("click", async () => {
        await signOut(auth);
        document.body.classList.remove("sonora-authorised");
        gate.style.display = "grid";
      });
      header.appendChild(button);
    }
  } else {
    document.body.classList.remove("sonora-authorised");
    gate.style.display = "grid";
    if (user) {
      message.textContent = "This Google account is not authorised.";
      await signOut(auth);
    }
  }
});
