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

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Función para cargar el carrito y mostrarlo
    const loadCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = ''; // Limpiar los items del carrito actuales

        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>${item.price}</span>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += parseFloat(item.price.replace(/\./g, '').replace('$', '')) * item.quantity; // Calcular el precio total considerando la cantidad
        });


        totalPriceElement.innerText = `$${total.toLocaleString()}`; // Mostrar el precio total formateado
    };

    // Cargar el carrito al cargar la página
    loadCart();

    // Funcionalidad del botón de pago
    document.getElementById('checkout-button').addEventListener('click', () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log('Datos del carrito:', cart);
        const formData = new FormData();
        formData.append('cart', JSON.stringify(cart));
        formData.append('total', totalPriceElement.innerText);
         // Aquí debes agregar la lógica de pago
        // Subir los datos del carrito a Firebase
        addDoc(collection(db, 'orders'), {
            cart: cart,
            total: totalPriceElement.innerText,
            user: auth.currentUser.uid
        })
            .then((docRef) => {
                console.log('Document written with ID: ', docRef.id);
                Swal.fire('Reserva hecha!, No te olvides de pagar!');
                localStorage.removeItem("cart")// Limpiar el carrito
                window.location.href = '/home/home.html';
                
            })
            .catch((error) => {
                console.error('Error adding document: ', error);
            });
            
        
    });
});
