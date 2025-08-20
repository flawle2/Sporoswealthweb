// SUPER SIMPLE Mobile Menu - Absolutely no link interference
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
        
        // Close menu when navigation links are clicked (but don't interfere with the navigation)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 968) {
                    console.log('Mobile nav link clicked, closing menu:', this.href);
                    // Close menu but let the link work normally
                    toggle.classList.remove('active');
                    menu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    // Important: Don't preventDefault() - let navigation happen
                }
            });
        });
        
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