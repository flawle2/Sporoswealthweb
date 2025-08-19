// =====================================================
// SERVICES PAGE SPECIFIC JAVASCRIPT
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    // Service navigation scroll spy
    initServiceNavSpy();
    
    // Service navigation active states
    initServiceNavigation();
    
    // Form handlers
    initFormHandlers();
    
    // Service calculators
    initCalculators();
});

// =====================================================
// SERVICE NAVIGATION SPY
// =====================================================

function initServiceNavSpy() {
    const serviceNavItems = document.querySelectorAll('.service-nav-item');
    const serviceSections = document.querySelectorAll('.service-section');
    
    // Update active nav item based on scroll position
    function updateActiveNav() {
        let current = '';
        
        serviceSections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        serviceNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Throttled scroll handler
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial call
    updateActiveNav();
}

// =====================================================
// SERVICE NAVIGATION
// =====================================================

function initServiceNavigation() {
    const serviceNavItems = document.querySelectorAll('.service-nav-item');
    
    serviceNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            serviceNavItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Smooth scroll to target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 160; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =====================================================
// FORM HANDLERS
// =====================================================

function initFormHandlers() {
    // Estate planning guide form
    const guideForm = document.querySelector('.guide-form');
    if (guideForm) {
        guideForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate form submission
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Sending...';
            button.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you! Your estate planning guide has been sent to your email.');
                this.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 1500);
        });
    }
}

// =====================================================
// SERVICE CALCULATORS
// =====================================================

function initCalculators() {
    // Estate tax calculator
    const estateCalculator = document.querySelector('.estate-calculator .btn');
    if (estateCalculator) {
        estateCalculator.addEventListener('click', function(e) {
            e.preventDefault();
            openEstateCalculator();
        });
    }
}

function openEstateCalculator() {
    // Create modal for estate calculator
    const modal = document.createElement('div');
    modal.className = 'calculator-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Estate Tax Calculator</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <form class="calculator-form">
                    <div class="form-group">
                        <label for="estate-value">Total Estate Value</label>
                        <input type="number" id="estate-value" placeholder="Enter estate value" min="0" step="1000">
                    </div>
                    <div class="form-group">
                        <label for="exemption">Federal Exemption (2024)</label>
                        <input type="number" id="exemption" value="13610000" readonly>
                    </div>
                    <div class="form-group">
                        <label for="state-exemption">State Exemption (if applicable)</label>
                        <input type="number" id="state-exemption" placeholder="Enter state exemption" min="0" step="1000">
                    </div>
                    <button type="submit" class="btn btn-primary">Calculate</button>
                </form>
                <div class="calculator-results" style="display: none;">
                    <h4>Estimated Estate Tax</h4>
                    <div class="result-item">
                        <span>Taxable Estate:</span>
                        <span class="result-value" id="taxable-estate">$0</span>
                    </div>
                    <div class="result-item">
                        <span>Federal Estate Tax:</span>
                        <span class="result-value" id="federal-tax">$0</span>
                    </div>
                    <div class="result-item">
                        <span>State Estate Tax:</span>
                        <span class="result-value" id="state-tax">$0</span>
                    </div>
                    <div class="result-item total">
                        <span>Total Estate Tax:</span>
                        <span class="result-value" id="total-tax">$0</span>
                    </div>
                    <p class="disclaimer">
                        *This is an estimate for educational purposes only. Consult with our estate planning team for personalized advice.
                    </p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    const form = modal.querySelector('.calculator-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateEstateTax(modal);
    });
    
    // Handle modal close
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Animate modal in
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
}

function calculateEstateTax(modal) {
    const estateValue = parseFloat(modal.querySelector('#estate-value').value) || 0;
    const federalExemption = parseFloat(modal.querySelector('#exemption').value) || 0;
    const stateExemption = parseFloat(modal.querySelector('#state-exemption').value) || 0;
    
    // Calculate federal estate tax
    const federalTaxableEstate = Math.max(0, estateValue - federalExemption);
    const federalTaxRate = 0.40; // 40% top rate
    const federalTax = federalTaxableEstate * federalTaxRate;
    
    // Calculate state estate tax (simplified)
    const stateTaxableEstate = Math.max(0, estateValue - stateExemption);
    const stateTaxRate = 0.12; // Average state rate
    const stateTax = stateExemption > 0 ? stateTaxableEstate * stateTaxRate : 0;
    
    const totalTax = federalTax + stateTax;
    
    // Update results
    modal.querySelector('#taxable-estate').textContent = formatCurrency(Math.max(federalTaxableEstate, stateTaxableEstate));
    modal.querySelector('#federal-tax').textContent = formatCurrency(federalTax);
    modal.querySelector('#state-tax').textContent = formatCurrency(stateTax);
    modal.querySelector('#total-tax').textContent = formatCurrency(totalTax);
    
    // Show results
    modal.querySelector('.calculator-results').style.display = 'block';
}

// =====================================================
// SERVICE TIER INTERACTIONS
// =====================================================

// Add hover effects to tier cards
document.querySelectorAll('.tier-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (this.classList.contains('featured')) {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        } else {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// =====================================================
// INTERACTIVE SERVICE FEATURES
// =====================================================

// Process step hover effects
document.querySelectorAll('.process-step').forEach(step => {
    step.addEventListener('mouseenter', function() {
        const stepNumber = this.querySelector('.step-number');
        stepNumber.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    step.addEventListener('mouseleave', function() {
        const stepNumber = this.querySelector('.step-number');
        stepNumber.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Banking card flip effect
document.querySelectorAll('.banking-card').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
});

// Option card selection
document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', function() {
        // Remove selection from other cards
        document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        
        // Add selection to clicked card
        this.classList.add('selected');
        
        // Show more information (you could expand this)
        showNotification('Great choice! Contact us to learn more about this option.');
    });
});

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#22c55e' : '#ef4444',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    // Add to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// =====================================================
// SERVICE PAGE ANIMATIONS
// =====================================================

// Animate statistics when they come into view
const observeStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value, .metric-value');
            if (statValue && !statValue.classList.contains('animated')) {
                animateStatValue(statValue);
                statValue.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.service-stats .stat, .metrics-grid .metric').forEach(stat => {
    observeStats.observe(stat);
});

function animateStatValue(element) {
    const finalValue = element.textContent;
    const numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
    
    // If there's no numeric value, don't animate (for text like "Active")
    if (isNaN(numericValue)) {
        element.textContent = finalValue;
        return;
    }
    
    const prefix = finalValue.replace(/[0-9.]/g, '').split(numericValue.toString())[0] || '';
    const suffix = finalValue.replace(/[0-9.]/g, '').split(numericValue.toString())[1] || '';
    
    let current = 0;
    const increment = numericValue / 60; // 60 frames for smooth animation
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        
        let displayValue;
        if (numericValue < 10) {
            displayValue = current.toFixed(1);
        } else {
            displayValue = Math.floor(current);
        }
        
        element.textContent = prefix + displayValue + suffix;
    }, 16); // ~60fps
}

// Add CSS for calculator modal
const modalStyles = `
.calculator-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.calculator-modal.show {
    opacity: 1;
}

.modal-content {
    background: white;
    border-radius: 20px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    transform: translateY(50px);
    transition: transform 0.3s ease;
}

.calculator-modal.show .modal-content {
    transform: translateY(0);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 30px 20px;
    border-bottom: 1px solid #e5e5e5;
}

.modal-header h3 {
    margin: 0;
    color: var(--primary-dark);
}

.close-modal {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: var(--text-secondary);
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-body {
    padding: 30px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: var(--primary-dark);
    font-weight: 500;
}

.form-group input {
    width: 100%;
    padding: 12px 20px;
    border: 2px solid var(--border-light);
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: var(--primary-gold);
}

.calculator-results {
    margin-top: 30px;
    padding: 20px;
    background: var(--bg-light);
    border-radius: 10px;
}

.calculator-results h4 {
    margin-bottom: 20px;
    color: var(--primary-dark);
}

.result-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid var(--border-light);
}

.result-item.total {
    border-bottom: none;
    border-top: 2px solid var(--primary-gold);
    font-weight: 600;
    font-size: 18px;
    color: var(--primary-dark);
}

.result-value {
    font-weight: 600;
    color: var(--primary-gold);
}

.disclaimer {
    margin-top: 15px;
    font-size: 12px;
    color: var(--text-light);
    font-style: italic;
}

.option-card.selected {
    border: 2px solid var(--primary-gold);
    box-shadow: 0 0 0 4px rgba(212, 165, 116, 0.1);
}
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);