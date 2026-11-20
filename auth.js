import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const app = initializeApp(window.SONORA_FIREBASE_CONFIG, "sonora");
const auth = getAuth(app);
const gate = document.getElementById("sonora-auth-gate");
const message = document.getElementById("auth-message");
const form = document.getElementById("sonora-login-form");
const usernameInput = document.getElementById("sonora-username");
const passwordInput = document.getElementById("sonora-password");
const loginButton = document.getElementById("sonora-login");

form.addEventListener("submit", async event => {
  event.preventDefault();
  const email = usernameInput.value.trim();
  const password = passwordInput.value;
  if (!email || !password) {
    message.textContent = "Enter your username/email and password.";
    return;
  }

  loginButton.disabled = true;
  message.textContent = "Signing in…";
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (result.user.uid !== window.SONORA_ALLOWED_UID) {
      await signOut(auth);
      message.textContent = "This account is not authorised to use SONORA.";
    }
  } catch (error) {
    message.textContent = error.code === "auth/invalid-credential"
      ? "Incorrect username/email or password."
      : error.message || "Sign-in failed. Please try again.";
  } finally {
    loginButton.disabled = false;
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
        passwordInput.value = "";
      });
      header.appendChild(button);
    }
  } else {
    document.body.classList.remove("sonora-authorised");
    gate.style.display = "grid";
    if (user) {
      message.textContent = "This account is not authorised.";
      await signOut(auth);
    }
  }
});
