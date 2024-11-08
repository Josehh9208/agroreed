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

function renderOrder(parentElement, orderData, cnt){
    const sapo = document.createElement('div');
    const orderElement = document.createElement('div');
    const cartContainer = document.createElement('div');
    const titleElement = document.createElement('h2');
    titleElement.textContent = `Orden de compra No ${cnt}`;
    titleElement.style.textAlign = 'center';
    titleElement.style.color = 'white';
    titleElement.style.marginBottom = '20px';
    orderElement.appendChild(titleElement);
    cartContainer.classList.add('cart-container');
    orderElement.style.margin="40px";
    orderElement.style.border="2px solid white";
    orderElement.style.borderRadius= "35px"
    orderElement.style.height="auto";
    orderElement.style.padding="25px";
    cartContainer.style.display = 'flex';
    cartContainer.style.flexDirection = 'column';
    cartContainer.style.alignItems = 'center';

    orderData.cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.style.width = '220px';

        const imageElement = document.createElement('img');
        switch (item.name.toLowerCase()) {
            case 'machete':
            imageElement.src = '/Imagenes/machetes.jpg';
            break;
            case 'semillas':
            imageElement.src = '/Imagenes/semillas.jpg';
            break;
            case 'palas':
            imageElement.src = '/Imagenes/palas.jpg';
            break;
            case 'tractor':
            imageElement.src = '/Imagenes/tractor.jpg';
            break;
            case 'fumigador':
            imageElement.src = '/Imagenes/fumigador.jpg';
            break;
            case 'hachas':
            imageElement.src = '/Imagenes/hachas.jpg';
            break;
            case 'abonos':
            imageElement.src = '/Imagenes/abonos.jpg';
            break;
            case 'azadas':
            imageElement.src = '/Imagenes/azadas.jpg';
            break;
            default:
            imageElement.src = 'path/to/otros.jpg';
            break;
        }
        imageElement.style.width = '200px';
        imageElement.style.height = '200px';
        itemElement.appendChild(imageElement);
        
        const nameElement = document.createElement('div');
        nameElement.textContent = `${item.name}`;
        nameElement.style.textAlign = 'center';
        itemElement.appendChild(nameElement);

        const quantityElement = document.createElement('div');
        quantityElement.textContent = `${item.quantity}`;
        quantityElement.style.textAlign = 'center';
        itemElement.appendChild(quantityElement);

        const priceElement = document.createElement('div');
        priceElement.textContent = `${item.price}`;
        priceElement.style.textAlign = 'center';
        itemElement.appendChild(priceElement);

        itemElement.style.textAlign = 'center';
        cartContainer.appendChild(itemElement);
    });

    const totalElement = document.createElement('div');
    totalElement.classList.add('total');
    totalElement.textContent = `Total: ${orderData.total}`;
    totalElement.style.margin="0"

    orderElement.appendChild(cartContainer);
    orderElement.appendChild(totalElement);
    sapo.appendChild(orderElement);
    parentElement.appendChild(sapo);

}

onAuthStateChanged(auth, (user) => {
    if (user) {
        let cnt = 0;
        const userId = user.uid;
        const ordersContainer = document.getElementById('ordersContainer');

        const fetchOrders = async () => {
            const querySnapshot = await getDocs(collection(db, "orders"));
            ordersContainer.innerHTML = "";
            querySnapshot.forEach((doc) => {
                if (doc.data().user === userId) {
                    const orderData = doc.data();
                    console.log(orderData);
                    renderOrder(ordersContainer, orderData, cnt+1);
                    cnt++;
                }
            });
        };

        fetchOrders().catch(console.error);
    } 
    else {
        window.location.href = 'index.html'
    }
})