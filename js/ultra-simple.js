// ULTRA SIMPLE MOBILE MENU
console.log('🍔 Mobile menu script loading...');
console.log('Document ready state:', document.readyState);

// IMMEDIATE TEST - Force show menu right now
setTimeout(function() {
    console.log('🔥 FORCING MENU TO SHOW FOR TESTING');
    const menu = document.querySelector('.nav-menu');
    if (menu) {
        menu.classList.add('active');
        menu.style.right = '0px';
        menu.style.backgroundColor = 'yellow';
        console.log('Menu forced visible with yellow background');
    }
}, 1000);

// Global function first
window.simpleToggle = function() {
    console.log('🍔 SimpleToggle called - BUTTON ACTUALLY CLICKED!');
    
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    const body = document.body;
    
    console.log('Toggle element found:', !!toggle);
    console.log('Menu element found:', !!menu);
    console.log('Toggle classes before:', toggle ? toggle.className : 'NO TOGGLE');
    console.log('Menu classes before:', menu ? menu.className : 'NO MENU');
    
    if (toggle && menu) {
        const wasActive = menu.classList.contains('active');
        
        // Toggle all classes
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        console.log('🎯 CLASSES TOGGLED!');
        console.log('Menu classes after:', menu.className);
        console.log('Toggle classes after:', toggle.className);
        console.log('Body classes:', body.className);
        
        // FORCE VISIBILITY FOR TESTING
        if (menu.classList.contains('active')) {
            menu.style.right = '0px';
            menu.style.backgroundColor = 'yellow';
            console.log('🟡 MENU FORCED VISIBLE WITH YELLOW');
        } else {
            menu.style.right = '-100%';
            console.log('📵 MENU HIDDEN');
        }
    } else {
        console.error('❌ Elements not found! Toggle:', !!toggle, 'Menu:', !!menu);
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