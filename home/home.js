document.addEventListener('DOMContentLoaded', () => { 
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                name: button.getAttribute('data-product'),
                price: button.getAttribute('data-price'),
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Verifica si el producto ya está en el carrito
            const existingProductIndex = cart.findIndex(item => item.name === product.name && item.price === product.price);
            
            if (existingProductIndex > -1) {
                // Si el producto ya existe, incrementa la cantidad
                cart[existingProductIndex].quantity += 1;
            } else {
                // Si el producto no existe, agrégalo al carrito
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            Swal.fire('Producto añadido al carrito!', '', 'success');
        });
    });

    // Redirigir a la página de publicar
    const publicarButton = document.getElementById('publicar');
    if (publicarButton) {
        publicarButton.addEventListener('click', (e) => {
            e.preventDefault();
            location.href = 'public.html'; 
        });
    }
});
