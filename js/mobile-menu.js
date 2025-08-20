// Simple, bulletproof mobile menu implementation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile menu script starting...');
    
    // Wait a bit for DOM to fully settle
    setTimeout(function() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.nav-menu');
        
        console.log('Looking for mobile elements...');
        console.log('Toggle found:', !!toggle);
        console.log('Menu found:', !!menu);
        
        if (toggle && menu) {
            // Remove any existing listeners
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);
            
            // Add fresh click listener
            newToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Menu toggle clicked!');
                
                // Toggle classes
                this.classList.toggle('active');
                menu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
                
                // Log current state
                console.log('Toggle active:', this.classList.contains('active'));
                console.log('Menu active:', menu.classList.contains('active'));
            });
            
            // Also handle touch for iOS
            let touchHandled = false;
            newToggle.addEventListener('touchend', function(e) {
                if (!touchHandled) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('Menu toggle touched!');
                    
                    this.classList.toggle('active');
                    menu.classList.toggle('active');
                    document.body.classList.toggle('menu-open');
                    
                    touchHandled = true;
                    setTimeout(() => { touchHandled = false; }, 300);
                }
            });
            
            console.log('Mobile menu handlers attached successfully!');
            
            // Close menu when clicking main navigation links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 968) {
                        // For mobile, make all nav links work normally (navigate to pages)
                        // Remove any preventDefault that might be stopping navigation
                        console.log('Nav link clicked:', this.href);
                        
                        // Close the menu after a short delay to allow navigation
                        setTimeout(() => {
                            newToggle.classList.remove('active');
                            menu.classList.remove('active');
                            document.body.classList.remove('menu-open');
                        }, 100);
                    }
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (menu.classList.contains('active')) {
                    if (!menu.contains(e.target) && !newToggle.contains(e.target)) {
                        newToggle.classList.remove('active');
                        menu.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                }
            });
            
        } else {
            console.error('Could not find mobile menu elements!');
            if (!toggle) console.error('Toggle button not found');
            if (!menu) console.error('Nav menu not found');
        }
    }, 100);
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