// Sample product data (could also be loaded from an external JSON file)
const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        price: 99.99,
        category: "electronics",
        image: "images/headphones.jpg"
    },
    {
        id: 2,
        title: "Smart Watch",
        price: 199.99,
        category: "electronics",
        image: "images/smartwatch.jpg"
    },
    {
        id: 3,
        title: "Cotton T-Shirt",
        price: 24.99,
        category: "clothing",
        image: "images/tshirt.jpg"
    },
    {
        id: 4,
        title: "Running Shoes",
        price: 89.99,
        category: "footwear",
        image: "images/shoes.jpg"
    },
    {
        id: 5,
        title: "Coffee Maker",
        price: 49.99,
        category: "home",
        image: "images/coffeemaker.jpg"
    },
    {
        id: 6,
        title: "Backpack",
        price: 39.99,
        category: "accessories",
        image: "images/backpack.jpg"
    },
    {
        id: 7,
        title: "Bluetooth Speaker",
        price: 79.99,
        category: "electronics",
        image: "images/speaker.jpg"
    },
    {
        id: 8,
        title: "Denim Jeans",
        price: 59.99,
        category: "clothing",
        image: "images/jeans.jpg"
    }
];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const sortBy = document.getElementById('sort-by');
const cartCount = document.getElementById('cart-count');

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the page
function init() {
    displayProducts(products);
    populateCategoryFilter();
    updateCartCount();
    
    // Add event listeners
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
    sortBy.addEventListener('change', filterProducts);
}

// Display products in the grid
function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
    
    // Add event listeners to all add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Populate category filter dropdown
function populateCategoryFilter() {
    const categories = [...new Set(products.map(product => product.category))];
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryFilter.appendChild(option);
    });
}

// Filter and sort products based on user selection
function filterProducts() {
    let filteredProducts = [...products];
    
    // Filter by category
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(
            product => product.category === selectedCategory
        );
    }
    
    // Filter by price
    const selectedPrice = priceFilter.value;
    if (selectedPrice !== 'all') {
        const [min, max] = selectedPrice.split('-').map(part => {
            if (part.endsWith('+')) return parseFloat(part);
            return parseFloat(part);
        });
        
        filteredProducts = filteredProducts.filter(product => {
            if (selectedPrice.endsWith('+')) {
                return product.price >= min;
            }
            return product.price >= min && product.price <= max;
        });
    }
    
    // Sort products
    const sortOption = sortBy.value;
    switch (sortOption) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
            break;
        default:
            // Default sorting (original order)
            break;
    }
    
    displayProducts(filteredProducts);
}

// Add product to cart
function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Update local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Provide feedback
    alert(`${product.title} has been added to your cart!`);
}

// Update cart count in header
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Initialize the application
init();

// This can contain shared cart functionality used across all pages
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);

// Shared cart functionality across all pages
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    
    cartCountElements.forEach(element => {
        if (element) {
            element.textContent = count;
        }
    });
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);