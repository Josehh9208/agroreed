// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, addDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage();


onAuthStateChanged(auth, (user) => {
    if (user) {

        getDocs(collection(db, "Products", "Products_", "Private_Data")).
            then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().IdProducto == user.uid) {
                        var container = document.getElementById("container")

                        var li = document.createElement('li')
                        var a = document.createElement('a')
                        var img = document.createElement('img')
                        var p = document.createElement('p')
                        var id = document.createElement('a')

                        li.className = "user-box"
                        img.src = doc.data().Foto


                        img.width = 130
                        img.alt = "Perfil"
                        p.textContent = doc.data().Nombre
                        id.textContent = doc.data().Id

                        container.appendChild(li)
                        li.appendChild(a)
                        a.appendChild(img)
                        a.appendChild(p)

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
                location.href = '/Views/general/paginaprincipal.html'
            }
        });
    }
});