// script.js

// Function to add item to cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart');
}

// Function to display cart items
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsDiv = document.getElementById('cart-items');
    let cartTotalDiv = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalDiv.innerHTML = '';
        return;
    }

    let total = 0;
    cartItemsDiv.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>Price: Rs ${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart('${item.id}')">Remove</button>
            </div>
        `;
    }).join('');

    cartTotalDiv.innerHTML = `<h3>Total: Rs ${total}</h3>`;
}

// Function to remove item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Function to handle form submission for checkout
function checkout() {
    alert('Proceeding to checkout');
}

// Event listeners for adding to cart (modify selectors based on your HTML structure)
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items')) {
        displayCart();
    }

    const addToCartButtons = document.querySelectorAll('.pro button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const proElement = e.target.closest('.pro');
            const product = {
                id: proElement.dataset.id,
                name: proElement.querySelector('.des h5').innerText,
                price: parseFloat(proElement.querySelector('.des h4').innerText.replace('Rs:', '').trim()),
                image: proElement.querySelector('img').src,
                quantity: 1
            };
            addToCart(product);
        });
    });

    const checkoutButton = document.querySelector('.btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', checkout);
    }
});
