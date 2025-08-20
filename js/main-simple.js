// SIMPLE MAIN JAVASCRIPT - Clean rewrite
console.log('Loading main JavaScript...');

// Initialize AOS animations
document.addEventListener('DOMContentLoaded', function() {
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
    
    // DESKTOP ONLY - Handle dropdowns (screen width > 968px)
    if (window.innerWidth > 968) {
        console.log('Desktop mode - enabling dropdowns');
        
        // Find dropdown parent links
        const dropdownParents = document.querySelectorAll('.has-dropdown > .nav-link');
        
        dropdownParents.forEach(link => {
            link.addEventListener('click', function(e) {
                // On desktop, prevent navigation for dropdown parents
                e.preventDefault();
                
                // Toggle dropdown
                const parent = this.parentElement;
                parent.classList.toggle('active');
                
                // Close other dropdowns
                document.querySelectorAll('.has-dropdown').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('active');
                    }
                });
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.has-dropdown')) {
                document.querySelectorAll('.has-dropdown').forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    } else {
        console.log('Mobile mode - dropdowns disabled, direct navigation enabled');
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('Main JavaScript ready');
});