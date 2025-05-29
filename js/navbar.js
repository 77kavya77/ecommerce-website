document.addEventListener('DOMContentLoaded', function() {
    // Load navbar HTML
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = `
            <nav class="navbar">
                <div class="nav-container">
                    <a href="index.html" class="logo">ShopHome</a>
                    
                    <ul class="nav-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="products.html">Products</a></li>
                        <li><a href="contact.html">Contact</a></li>
                        <div class="cart-icon"><a href="cart.html">🛒 <span id="cart-count">0</span> </a></div>

                    </ul>
                    
                    <button class="mobile-menu-btn" id="mobile-menu-btn">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </nav>
            
            <!-- Mobile Menu -->
            <div class="mobile-nav" id="mobile-nav">
                <button class="close-mobile-menu" id="close-mobile-menu">
                    <i class="fas fa-times"></i>
                </button>
                <ul class="mobile-nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="products.html">Products</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li>
                        <a href="cart.html" class="cart-icon">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="cart-count"></span>
                        </a>
                    </li>
                </ul>
            </div>
        `;
        
        // Mobile menu functionality
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileNav = document.getElementById('mobile-nav');
        const closeMobileMenu = document.getElementById('close-mobile-menu');
        
        if (mobileMenuBtn && mobileNav && closeMobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileNav.classList.add('active');
            });
            
            closeMobileMenu.addEventListener('click', () => {
                mobileNav.classList.remove('active');
            });
        }
        
        // Update cart count (in case it wasn't updated yet)
        updateCartCount();
    }
});