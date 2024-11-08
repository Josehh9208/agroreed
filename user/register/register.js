// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

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
const db = getFirestore(app);


register.addEventListener('click', (e) => {
  e.preventDefault()

  var name = document.getElementById("name").value
  var lastname = document.getElementById("lastname").value
  var email = document.getElementById("email").value
  var phone = document.getElementById("phone").value
  var password = document.getElementById("password").value
  var confirmPassword = document.getElementById("confirmPassword").value

  if (name.length != 0 && lastname.length != 0 && email.lenght != 0 && email.lenght != 0 && password.length != 0 && confirmPassword.length != 0) {
    if (confirmPassword == password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;

          // ...
          sendEmailVerification(auth.currentUser)
            .then(() => {
              // Email verification sent!
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "El usuario ha sido registrado de manera correcta, verifica tu correo"
              });
            }).then(() => {
              addDoc(collection(db, "Users", "User_id", "Private_Data"), {
                Nombre: name,
                Apellido: lastname,
                Correo: email,
                Telefono: phone,
                Municipio: '',
                Departamento: '',
                Rol: 'Provedor',
                Id: user.uid,
                Foto: ''
              })
            }
            )
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..

          Swal.fire({
            title: "Error",
            text: errorMessage,
            icon: "error"
          });
        });

    }
    else {
      Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden",
        icon: "error"
      });

    }
  }
  else {
    Swal.fire({
      title: "Error",
      text: "Debes llenar todos los campos",
      icon: "error"
    });

  }



})

