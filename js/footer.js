document.addEventListener('DOMContentLoaded', function() {
    // Load footer HTML
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer class="footer">
                <div class="footer-container">
                    <div class="footer-about">
                        <a href="index.html" class="footer-logo">ShopHome</a>
                        <p>Your one-stop shop for all your needs. Quality products at affordable prices.</p>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-pinterest"></i></a>
                        </div>
                    </div>
                    
                    <div class="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="products.html">Products</a></li>
                            <li><a href="cart.html">Cart</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-contact">
                        <h3>Contact Us</h3>
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Ravipuram Street, Sreenagar City, PO 12345</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span>+91 1234567890</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>info@shophome.com</span>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} ShopHome. All Rights Reserved.</p>
                </div>
            </footer>
        `;
    }
});