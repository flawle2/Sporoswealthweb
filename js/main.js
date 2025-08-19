// =====================================================
// SPOROS WEALTH MANAGEMENT - MAIN JAVASCRIPT
// =====================================================

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-out',
        once: true,
        offset: 100
    });
});

// =====================================================
// NAVIGATION FUNCTIONALITY
// =====================================================

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// =====================================================
// SMOOTH SCROLLING
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =====================================================
// PARALLAX EFFECTS
// =====================================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const heroImage = document.querySelector('.hero-bg-image');
    if (heroImage) {
        const speed = 0.5;
        heroImage.style.transform = `translateY(${scrolled * speed}px)`;
    }
    
    // Philosophy section parallax
    const philosophyImage = document.querySelector('.philosophy-image');
    if (philosophyImage) {
        const rect = philosophyImage.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.3;
            const yPos = -(scrolled - rect.top) * speed;
            philosophyImage.style.transform = `translateY(${yPos}px)`;
        }
    }
});

// =====================================================
// TESTIMONIAL SLIDER
// =====================================================

class TestimonialSlider {
    constructor() {
        this.testimonials = [
            {
                text: "Sporos Wealth Management transformed our approach to wealth. Their sophisticated strategies and personal attention have exceeded our expectations. They don't just manage our assets; they've become trusted advisors to our entire family.",
                author: "Michael Richardson",
                position: "CEO, Tech Innovations Inc.",
                rating: 5
            },
            {
                text: "Working with Sporos has been a game-changer for our financial future. Their team combines institutional-level expertise with genuinely caring personal service. I couldn't be more pleased with the results.",
                author: "Sarah Chen",
                position: "Founder, Chen Medical Group",
                rating: 5
            },
            {
                text: "The level of sophistication and attention to detail at Sporos is unmatched. They've helped us navigate complex financial situations with grace and expertise. Truly a premier wealth management firm.",
                author: "David & Jennifer Williams",
                position: "Real Estate Developers",
                rating: 5
            }
        ];
        
        this.currentIndex = 0;
        this.init();
    }
    
    init() {
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            this.next();
        }, 5000);
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.updateTestimonial();
    }
    
    updateTestimonial() {
        const testimonialCard = document.querySelector('.testimonial-card');
        if (!testimonialCard) return;
        
        // Fade out
        testimonialCard.style.opacity = '0';
        
        setTimeout(() => {
            const current = this.testimonials[this.currentIndex];
            
            // Update content
            const textElement = testimonialCard.querySelector('.testimonial-text');
            const authorName = testimonialCard.querySelector('.author-info h4');
            const authorPosition = testimonialCard.querySelector('.author-info p');
            
            if (textElement) textElement.textContent = current.text;
            if (authorName) authorName.textContent = current.author;
            if (authorPosition) authorPosition.textContent = current.position;
            
            // Fade in
            testimonialCard.style.opacity = '1';
        }, 300);
    }
}

// Initialize testimonial slider if on homepage (now using grid layout)
// Note: Testimonials now use a static grid layout instead of auto-rotating slider

// =====================================================
// FORM HANDLING
// =====================================================

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send the data to a server
        console.log('Form submission:', data);
        
        // Show success message
        showNotification('Thank you for your inquiry. We will contact you within 24 hours.');
        
        // Reset form
        this.reset();
    });
}

// Newsletter subscription
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would normally send the email to a server
        console.log('Newsletter subscription:', email);
        
        // Show success message
        showNotification('Thank you for subscribing to our insights.');
        
        // Reset form
        this.reset();
    });
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// =====================================================
// LAZY LOADING IMAGES
// =====================================================

// Intersection Observer for lazy loading
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        }
    });
}, {
    rootMargin: '50px'
});

// Observe all images with data-src
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// =====================================================
// COUNTER ANIMATION
// =====================================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number based on type
        if (element.dataset.format === 'currency') {
            element.textContent = '$' + Math.floor(current).toLocaleString() + 'B+';
        } else if (element.dataset.format === 'percentage') {
            element.textContent = 'Top ' + Math.floor(current) + '%';
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation when in view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            entry.target.classList.add('animated');
        }
    });
}, {
    threshold: 0.5
});

// Observe all counter elements
document.querySelectorAll('[data-counter]').forEach(counter => {
    counterObserver.observe(counter);
});

// =====================================================
// INTERACTIVE HOVER EFFECTS
// =====================================================

// Service cards 3D tilt effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// =====================================================
// PAGE LOADER
// =====================================================

window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.remove();
            }, 300);
        }, 500);
    }
});

// =====================================================
// SCROLL TO TOP BUTTON
// =====================================================

// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =====================================================
// DYNAMIC COPYRIGHT YEAR
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
});