// Initialize the cart page
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    loadCartItems();
    setupEventListeners();
});

// Load cart items from localStorage
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartDiv = cartItemsContainer.querySelector('.empty-cart');
    
    if (cart.length === 0) {
        emptyCartDiv.style.display = 'block';
        document.getElementById('checkout-btn').disabled = true;
        document.getElementById('cart-status').textContent = 'You have no items in your cart.';
        return;
    }
    
    emptyCartDiv.style.display = 'none';
    document.getElementById('cart-status').textContent = `You have ${cart.length} item(s) in your cart.`;
    
    // Clear existing items (except the empty cart message)
    const itemsToRemove = cartItemsContainer.querySelectorAll('.cart-item');
    itemsToRemove.forEach(item => item.remove());
    
    // Add each cart item to the page
    cart.forEach(item => {
        const cartItemElement = createCartItemElement(item);
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    updateOrderSummary();
}

// Create HTML element for a cart item
function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.dataset.id = item.id;
    
    cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-image">
        <div class="cart-item-details">
            <h3 class="cart-item-title">${item.title}</h3>
            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            <button class="cart-item-remove">Remove</button>
        </div>
        <div class="cart-item-quantity">
            <button class="quantity-btn minus">-</button>
            <input type="number" class="quantity-input" value="${item.quantity}" min="1">
            <button class="quantity-btn plus">+</button>
        </div>
    `;
    
    return cartItem;
}

// Update the order summary with totals
function updateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.99; // Flat rate shipping
    const taxRate = 0.08; // 8% tax
    const tax = subtotal * taxRate;
    const total = subtotal + shipping + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    
    // Enable checkout button if there are items
    document.getElementById('checkout-btn').disabled = cart.length === 0;
}

// Set up event listeners for cart interactions
function setupEventListeners() {
    // Delegate events for dynamic elements
    document.getElementById('cart-items').addEventListener('click', (e) => {
        // Handle remove button click
        if (e.target.classList.contains('cart-item-remove')) {
            const cartItem = e.target.closest('.cart-item');
            removeItemFromCart(cartItem.dataset.id);
            cartItem.remove();
            updateCartAndSummary();
        }
        
        // Handle quantity minus button click
        if (e.target.classList.contains('minus')) {
            const input = e.target.nextElementSibling;
            if (input.value > 1) {
                input.value--;
                updateItemQuantity(input);
            }
        }
        
        // Handle quantity plus button click
        if (e.target.classList.contains('plus')) {
            const input = e.target.previousElementSibling;
            input.value++;
            updateItemQuantity(input);
        }
    });
    
    // Handle direct input changes
    document.getElementById('cart-items').addEventListener('change', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            if (e.target.value < 1) e.target.value = 1;
            updateItemQuantity(e.target);
        }
    });
    
    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Checkout functionality would be implemented here!');
        // In a real app, this would redirect to a checkout page
    });
}

// Remove item from cart
function removeItemFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== parseInt(productId));
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update item quantity in cart
function updateItemQuantity(inputElement) {
    const cartItem = inputElement.closest('.cart-item');
    const productId = parseInt(cartItem.dataset.id);
    const newQuantity = parseInt(inputElement.value);
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartAndSummary();
    }
}

// Update both cart count and order summary
function updateCartAndSummary() {
    updateCartCount();
    updateOrderSummary();
    
    // Check if cart is now empty
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        document.getElementById('cart-items').querySelector('.empty-cart').style.display = 'block';
        document.getElementById('cart-status').textContent = 'You have no items in your cart.';
    }
}

// Update cart count in header (shared function)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}