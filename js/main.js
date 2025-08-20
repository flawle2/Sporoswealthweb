// Main JavaScript for Sporos Wealth Management
console.log('Main JavaScript loading...');

// Initialize AOS animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // DESKTOP ONLY - Handle dropdown menus (screen width > 968px)
    function setupDesktopDropdowns() {
        if (window.innerWidth > 968) {
            console.log('Desktop mode - enabling dropdown menus');
            
            // Remove any mobile-specific handlers
            const dropdownParents = document.querySelectorAll('.has-dropdown');
            
            dropdownParents.forEach(item => {
                // Remove old listeners by cloning
                const newItem = item.cloneNode(true);
                item.parentNode.replaceChild(newItem, item);
            });
            
            // Re-query after cloning
            const newDropdownParents = document.querySelectorAll('.has-dropdown');
            
            newDropdownParents.forEach(item => {
                // Hover effect for desktop
                item.addEventListener('mouseenter', function() {
                    this.classList.add('active');
                });
                
                item.addEventListener('mouseleave', function() {
                    this.classList.remove('active');
                });
                
                // Click on parent link for desktop - prevent default only if has dropdown
                const parentLink = item.querySelector('.nav-link');
                if (parentLink) {
                    parentLink.addEventListener('click', function(e) {
                        // On desktop, clicking parent toggles dropdown
                        e.preventDefault();
                        const parent = this.parentElement;
                        parent.classList.toggle('active');
                        
                        // Close other dropdowns
                        document.querySelectorAll('.has-dropdown').forEach(other => {
                            if (other !== parent) {
                                other.classList.remove('active');
                            }
                        });
                    });
                }
            });
            
            // Close dropdowns when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.has-dropdown')) {
                    document.querySelectorAll('.has-dropdown').forEach(item => {
                        item.classList.remove('active');
                    });
                }
            });
        }
    }
    
    // Set up desktop dropdowns initially
    setupDesktopDropdowns();
    
    // Re-setup on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            setupDesktopDropdowns();
        }, 250);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Mobile menu functionality
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (mobileToggle && navMenu) {
        // Remove onclick attribute if it exists
        mobileToggle.removeAttribute('onclick');
        
        // Add event listener for mobile menu toggle
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                // Close menu
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.classList.remove('menu-open');
            } else {
                // Open menu
                navMenu.classList.add('active');
                mobileToggle.classList.add('active');
                body.classList.add('menu-open');
            }
        });
    }
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Only close on mobile
            if (window.innerWidth <= 968) {
                if (navMenu && mobileToggle) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    body.classList.remove('menu-open');
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 968) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.classList.remove('menu-open');
            }
        }
    });
    
    console.log('Main JavaScript ready');
});

// Global mobile toggle function for backwards compatibility
window.simpleToggle = function() {
    const menu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    const body = document.body;
    
    if (menu && toggle) {
        const isActive = menu.classList.contains('active');
        
        if (isActive) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
            body.classList.remove('menu-open');
        } else {
            menu.classList.add('active');
            toggle.classList.add('active');
            body.classList.add('menu-open');
        }
    }
};