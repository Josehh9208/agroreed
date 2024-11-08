// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {getAuth,signOut, onAuthStateChanged, deleteUser  } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, getDocs, collection, addDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import {getStorage, ref, uploadBytesResumable, getDownloadURL}from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";
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
const storage = getStorage();

onAuthStateChanged(auth,(user)=>{
    if(user){

        delete1.addEventListener("click", (e) => {
            e.preventDefault()
            const user = auth.currentUser;

            deleteUser(user).then(() => {
                //User deleted.
                Swal.fire({
                    title: '¿Estas seguro que quieres borrar el usuario?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Si, borrar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        auth.signOut();
                        location.href = '/index.html'
                    }
                })
            })
        })

        logout.addEventListener('click', (e) => {

            // Sign-out successful.
            Swal.fire({
                title: '¿Estas seguro que quieres cerrar sesión?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Si, cerrar sesión',
            }).then((result) => {
                if (result.isConfirmed) {
                    auth.signOut();
                    location.href = '/index.html'
                }
        
            })
        })

        const uid = user.uid;
        getDocs(collection(db, "Users", "User_Id", "Private_Data")).
            then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (user.uid == doc.data().Id) {
                        document.getElementById("name").textContent = doc.data().Nombre
                        document.getElementById("lastname").textContent = doc.data().Apellido
                        document.getElementById("phone").textContent = doc.data().Telefono
                        if(doc.data().Foto==''){
                            document.getElementById("foto").src = "/Imagenes/palas.jpg"
                        }
                        else{
                            document.getElementById("foto").src = doc.data().Foto
                        }

                    }
                })
            })

        guardar.addEventListener("click", (e) => {
            e.preventDefault()

            var name = document.getElementById("name").textContent
            var lastname = document.getElementById("lastname").textContent
            var phone = document.getElementById("phone").textContent
            var contry = document.getElementById("contry").textContent
            var city = document.getElementById("city").textContent
            var foto = document.getElementById("foto").value
            var foto2 = document.getElementById("foto")



            if (name.length != 0 && lastname.length != 0 && phone.length != 0  && contry.length != 0 && city.length != 0 && foto.length != 0) {
                getDocs(collection(db, "Users", "User_id", "Private_Data")).
                    then((querySnapshot) => {
                        querySnapshot.forEach((doc2) => {
                            if (user.uid == doc2.data().Id) {
                                // Upload file and metadata to the object 'images/mountains.jpg'
                                const storageRef = ref(storage, 'Images/' + '/' + user.uid + '/' + foto2.files[0].name);
                                const uploadTask = uploadBytesResumable(storageRef, foto2.files[0]);

                                // Listen for state changes, errors, and completion of the upload.
                                uploadTask.on('state_changed',
                                    (snapshot) => {
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
                                        // A full list of error codes is available at
                                        // https://firebase.google.com/docs/storage/web/handle-errors
                                        switch (error.code) {
                                            case 'storage/unauthorized':
                                                // User doesn't have permission to access the object
                                                break;
                                            case 'storage/canceled':
                                                // User canceled the upload
                                                break;

                                            // ...

                                            case 'storage/unknown':
                                                // Unknown error occurred, inspect error.serverResponse
                                                break;
                                        }
                                    },
                                    () => {
                                        // Upload completed successfully, now we can get the download URL
                                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                            updateDoc(doc(db, "Users", "User_id", "Private_Data", doc2.id), {
                                                Nombre: name,
                                                Apellido: lastname,
                                                Telefono: phone,
                                                Municipio: city,
                                                Departamento: contry,
                                                Foto: downloadURL
                                            });
                                        }).then(() => {
                                            Swal.fire({
                                                title: 'Datos actualizados',
                                                icon: 'success',
                                                confirmButtonColor: '#d33',
                                                confirmButtonText: 'Ok',
                                                allowOutsideClick: false,
                                                allowEscapeKey: false,
                                                allowEnterKey: false,
                                                stopKeydownPropagation: false
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    location.reload()
                                                }
                                            });
                                            
                                        })
                                    }
                                );
                            }
                        })
                    })

            }else{
                Swal.fire({
                    title:"Error",
                    text: "Todos los campos son obligatorios",
                    icon: "error"
                })
            }
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
})








