// Load featured products (top 4 products)
function loadFeaturedProducts() {
    // In a real app, you might fetch this from an API
    const featuredProducts = products.slice(0, 4);
    const featuredContainer = document.getElementById('featured-products');
    
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <a href="products.html?id=${product.id}" class="add-to-cart">View Product</a>
            </div>
        `;
        
        featuredContainer.appendChild(productCard);
    });
}

// Initialize cart count
function initCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    initCartCount();
});