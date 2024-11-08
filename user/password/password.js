// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPVb35ga5GZM5Wyy3WEv8qsuk8e54V1lk",
  authDomain: "agroreed1-4aec7.firebaseapp.com",
  projectId: "agroreed1-4aec7",
  storageBucket: "agroreed1-4aec7.firebasestorage.app",
  messagingSenderId: "142358497304",
  appId: "1:142358497304:web:fbacf4cfc80072fe709b6d",
  measurementId: "G-WRGC7QL04B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

sendEmail.addEventListener('click', (e) => {
  e.preventDefault()
  var email = document.getElementById("email").value

  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
      Swal.fire({
        title: "Revisa tu correo",
        icon: "success"
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
})