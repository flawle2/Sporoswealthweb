// SUPER SIMPLE Mobile Menu - No conflicts
document.addEventListener('DOMContentLoaded', function() {
    console.log('Simple mobile menu loading...');
    
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
        console.log('Mobile elements found - setting up simple handlers');
        
        // Simple toggle function
        function toggleMenu() {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            console.log('Menu toggled - active:', menu.classList.contains('active'));
        }
        
        // Only handle the toggle button
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
        
        // Don't interfere with navigation links at all
        // Let them work naturally
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (menu.classList.contains('active')) {
                if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                    toggle.classList.remove('active');
                    menu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });
        
        console.log('Simple mobile menu ready!');
    } else {
        console.error('Mobile menu elements not found');
    }
});

// Backup inline onclick handler
window.toggleMobileMenu = function() {
    console.log('Inline toggle called');
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
};

// Backup navigation function for mobile
window.navigateToPage = function(url) {
    console.log('Direct navigation to:', url);
    
    // Close mobile menu
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    // Navigate directly
    window.location.href = url;
};