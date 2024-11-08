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
        const uid = user.uid;

        publicar.addEventListener("click", (e) => {
            e.preventDefault()

            var product = document.getElementById("product").value
            var characteristic = document.getElementById("characteristic").value
            var number_products = document.getElementById("number-products").value
            var marc = document.getElementById("marc").value
            var photo2 = document.getElementById("archivos").value
            var photo = document.getElementById("archivos")



            if (product.length != 0 && characteristic.length != 0 && number_products.length != 0 && marc.length != 0 && photo2 != "") {
                const storageRef = ref(storage, 'products/' + user.uid + '/' + photo.files[0].name);
                const uploadTask = uploadBytesResumable(storageRef, photo.files[0]);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            var mayor = 0

                            getDocs(collection(db, "Products", "Products_", "Private_Data")).
                                then((querySnapshot) => {
                                    querySnapshot.forEach((doc) => {
                                        if (doc.data().IdProducto > mayor) {
                                            mayor = doc.data().IdProducto
                                        }
                                    })
                                }).then(() => {
                                    mayor++
                                    addDoc(collection(db, "Products", "Products_", "Private_Data"), {
                                        Producto: product,
                                        Características: characteristic,
                                        Cantidad: number_products,
                                        Marca: marc,
                                        Id: user.uid,
                                        Foto: downloadURL,
                                        IdProducto: mayor

                                    }).then(() => {
                                        Swal.fire({
                                            title: "Datos Guardados",
                                            text: "Datos del Producto Guardados",
                                            icon: "success",
                                            timer: 1500,
                                        }).then(() => {
                                            window.location = "/home/home.html"
                                        })

                                    })
                                })

                        });
                    }
                );

            }
            else {
                Swal.fire({
                    title: "Error",
                    text: "Error, debe digitar todos los datos",
                    icon: "error",
                    timer: 1500,
                })
            }
        })


    } else {
        Swal.fire({
            title: "No hay usuarios logueados",
            icon: "error",
            confirmButtonColor: "#d33",
            confirmButtonText: "OK",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            stopKeydownPropagation: false
        }).then((result) => {
            if (result.isConfirmed) {
                location.href = "/index.html"
            }
        });
    }
});