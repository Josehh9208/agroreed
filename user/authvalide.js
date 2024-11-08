// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, addDoc, collection,getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJz4FXJq730qfmZbDQp-Nqcj41K4BQoOg",
  authDomain: "agroreed1.firebaseapp.com",
  projectId: "agroreed1",
  storageBucket: "agroreed1.appspot.com",
  messagingSenderId: "6377354655",
  appId: "1:6377354655:web:02b1249100d27e8b7f39aa"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {    
    if (user) {
        const uid = user.uid;        
        getDocs(collection(db,"Users", "User_id", "Private_Data")).
        then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                if(user.uid==doc.data().Id){
                    if(doc.data().Rol!='Provedor'){
                        Swal.fire({
                            title: 'El usuario no es provedor',
                            icon: 'error',
                            confirmButtonColor: '#d33',
                            confirmButtonText: 'Ok',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false,
                            stopKeydownPropagation: false
                        }).then((result) => {
                            if (result.isConfirmed) {
                                location.href = '/index.html';
                            }
                        });
                    }
                }

            })
                
           
        })

      } else {
        Swal.fire({
            title: 'No hay usuarios logueados',
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Ok',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            stopKeydownPropagation: false
        }).then((result) => {
            if (result.isConfirmed) {
                location.href = '/index.html'
            }
        });

      }

});
