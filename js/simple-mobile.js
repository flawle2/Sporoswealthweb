// BRAND NEW SIMPLE MOBILE MENU - Starting from scratch
console.log('Loading simple mobile menu...');

// Wait for page to load
window.addEventListener('load', function() {
    console.log('Page loaded, setting up mobile menu');
    
    // Get elements
    const hamburger = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (!hamburger || !navMenu) {
        console.error('Mobile menu elements not found');
        return;
    }
    
    // Toggle menu open/close
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Toggle active classes
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        console.log('Menu toggled');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // That's it! No link handling - let links work naturally
    console.log('Simple mobile menu ready');
});

// Ultra simple backup toggle function
function toggleMobileMenu() {
    const hamburger = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    }
}