// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
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
const db = getFirestore(app)

login.addEventListener("click", (e) => {
    e.preventDefault()

    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    if (email.length != 0 && password.length != 0) {
        console.log("correo: " + email, "contraseña: " + password)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                if (getAuth().currentUser.emailVerified) {
                    getDocs(collection(db, "Users", "User_id", "Private_Data")).
                    then((querySnapshot)=>{
                        querySnapshot.forEach((doc)=>{
                            if(user.uid==doc.data().Id){
                                if(doc.data().Rol=='Provedor'){
                                    window.location.href = "/home/home.html"
                                }
                                else{
                                    Swal.fire({
                                        title: "Error",
                                        text: "El usuario no es provedor",
                                        icon: "error"
                                    });
                                }
                            }
                        })
                    })
                    
                }
                else {
                    Swal.fire({
                        title: "Error",
                        text: "Debe verificar el correo",
                        icon: "error"
                    });
                }       

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
            text: "Debe estar diligenciado todas las casillas",
            icon: "error"
        });
    }



})