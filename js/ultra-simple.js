// ULTRA SIMPLE MOBILE MENU
console.log('🍔 Mobile menu script loading...');

// Test immediately when script loads
console.log('Document ready state:', document.readyState);

// Global function first
window.simpleToggle = function() {
    console.log('🍔 SimpleToggle called');
    
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    const body = document.body;
    
    console.log('Toggle element:', toggle);
    console.log('Menu element:', menu);
    
    if (toggle && menu) {
        const wasActive = menu.classList.contains('active');
        
        // Toggle all classes
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        console.log('Menu toggled from', wasActive ? 'OPEN' : 'CLOSED', 'to', wasActive ? 'CLOSED' : 'OPEN');
        console.log('Menu classes:', menu.className);
    } else {
        console.error('❌ Elements not found!');
    }
};

// Also set up event listener as backup
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMobileMenu);
} else {
    setupMobileMenu();
}

function setupMobileMenu() {
    console.log('🍔 Setting up mobile menu...');
    
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    console.log('Toggle found:', !!toggle);
    console.log('Menu found:', !!menu);
    
    if (toggle && menu) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            simpleToggle();
        });
        console.log('✅ Mobile menu ready');
    } else {
        console.error('❌ Mobile menu elements not found');
    }
}