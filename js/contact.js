// =====================================================
// CONTACT PAGE SPECIFIC JAVASCRIPT
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form
    initContactForm();
    
    // Initialize newsletter form
    initNewsletterForm();
    
    // Initialize FAQ accordions
    initFAQAccordions();
    
    // Initialize form enhancements
    initFormEnhancements();
});

// =====================================================
// CONTACT FORM HANDLING
// =====================================================

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactFormSubmission(this);
    });
    
    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function handleContactFormSubmission(form) {
    // Get form data
    const formData = new FormData(form);
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        assets: formData.get('assets'),
        services: formData.getAll('services'),
        consultationType: formData.get('consultationType'),
        preferredTime: formData.get('preferredTime'),
        preferredDays: formData.getAll('preferredDays'),
        message: formData.get('message'),
        privacy: formData.get('privacy')
    };
    
    // Get submit button first
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Validate required fields
    if (!validateForm(form)) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Show loading state
    setButtonLoading(submitBtn, true);
    
    // Check if EmailJS is available (it should be loaded in the header)
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS not loaded. Check if script is included in header.');
        alert('Email service not available. Please call us directly at (714) 841-2020.');
        setButtonLoading(submitBtn, false);
        return;
    }
    
    // Make sure EmailJS is initialized
    try {
        emailjs.init('yTq_0ZL0Nj4flf6bn');
        sendEmailJS();
    } catch (error) {
        console.error('EmailJS initialization error:', error);
        alert('Email service initialization failed. Please try again.');
        setButtonLoading(submitBtn, false);
    }
    
    function sendEmailJS() {
        console.log('🔧 DEBUGGING EmailJS Configuration:');
        console.log('Service ID:', 'service_2zugw66');
        console.log('Template ID:', 'template_y84zkx6');
        console.log('API Key initialized:', typeof emailjs !== 'undefined');
        
        // Prepare email parameters
        const templateParams = {
            from_name: `${data.firstName} ${data.lastName}`,
            from_email: data.email,
            phone: data.phone || 'Not provided',
            assets: data.assets || 'Not specified',
            services: data.services.join(', ') || 'Not specified',
            consultation_type: data.consultationType || 'No preference specified',
            preferred_time: data.preferredTime || 'Not specified',
            preferred_days: data.preferredDays.join(', ') || 'No preference specified',
            message: data.message || 'No additional message',
            to_email: 'nasar@sporoswealth.com'
        };
        
        console.log('📧 Template Parameters:', templateParams);
        console.log('🚀 Sending email...');
        
        // Send email using EmailJS with detailed error handling
        emailjs.send('service_2zugw66', 'template_y84zkx6', templateParams)
            .then(function(response) {
                console.log('✅ EMAIL SENT SUCCESSFULLY!');
                console.log('Response:', response);
                console.log('Status:', response.status);
                console.log('Text:', response.text);
                
                // Simple thank you message
                alert('Thank you! Your message has been sent successfully.');
                
                // Reset form and button
                form.reset();
                setButtonLoading(submitBtn, false);
                
                // Track form submission if function exists
                if (typeof trackFormSubmission === 'function') {
                    trackFormSubmission('contact', data);
                }
            })
            .catch(function(error) {
                console.error('❌ EMAIL FAILED!');
                console.error('Full Error Object:', error);
                console.error('Error Status:', error.status);
                console.error('Error Text:', error.text);
                console.error('Error Stack:', error.stack);
                
                let errorMessage = 'Sorry, there was an error sending your message. ';
                
                // Specific error handling
                if (error.status === 400) {
                    errorMessage += 'Bad Request - Please check all form fields are filled correctly.';
                    console.error('🔍 400 Error: Likely template variable mismatch or invalid data');
                } else if (error.status === 401) {
                    errorMessage += 'Unauthorized - API key may be invalid.';
                    console.error('🔍 401 Error: Check API key: yTq_0ZL0Nj4flf6bn');
                } else if (error.status === 403) {
                    errorMessage += 'Forbidden - Service may be restricted.';
                    console.error('🔍 403 Error: Check service permissions and domain restrictions');
                } else if (error.status === 404) {
                    errorMessage += 'Not Found - Service or template may not exist.';
                    console.error('🔍 404 Error: Verify service_2zugw66 and template_y84zkx6 exist');
                } else if (error.status === 422) {
                    errorMessage += 'Unprocessable Entity - Template variables may be incorrect.';
                    console.error('🔍 422 Error: Template variable mismatch');
                } else {
                    errorMessage += 'Please try again or call us directly at (714) 841-2020.';
                }
                
                alert(errorMessage);
                setButtonLoading(submitBtn, false);
                
                // Show detailed error in console for debugging
                console.log('🔧 DEBUGGING INFO:');
                console.log('- Check if service "service_2zugw66" exists in your EmailJS dashboard');
                console.log('- Check if template "template_y84zkx6" exists in your EmailJS dashboard');
                console.log('- Verify API key "yTq_0ZL0Nj4flf6bn" is correct');
                console.log('- Check template variables match the ones being sent');
                console.log('- Verify domain restrictions in EmailJS settings');
            });
    }
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const isValid = value !== '';
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValid = emailRegex.test(value);
        setFieldValidation(field, emailValid);
        return emailValid;
    }
    
    // Phone validation (optional)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const phoneValid = phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''));
        setFieldValidation(field, phoneValid);
        return phoneValid;
    }
    
    // Checkbox validation
    if (field.type === 'checkbox' && field.required) {
        setFieldValidation(field, field.checked);
        return field.checked;
    }
    
    setFieldValidation(field, isValid);
    return isValid;
}

function setFieldValidation(field, isValid) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    formGroup.classList.remove('error', 'success');
    
    if (field.value.trim()) {
        formGroup.classList.add(isValid ? 'success' : 'error');
    }
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    if (formGroup) {
        formGroup.classList.remove('error');
    }
}

// =====================================================
// NEWSLETTER FORM
// =====================================================

function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const button = this.querySelector('button[type="submit"]');
        
        if (!email) {
            showNotification('Please enter your email address.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        setButtonLoading(button, true);
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you for subscribing! You\'ll receive our next quarterly update.');
            this.reset();
            setButtonLoading(button, false);
            
            // Track newsletter subscription
            trackFormSubmission('newsletter', { email });
        }, 1500);
    });
}

// =====================================================
// FAQ ACCORDIONS
// =====================================================

function initFAQAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });
}

// =====================================================
// FORM ENHANCEMENTS
// =====================================================

function initFormEnhancements() {
    // Auto-format phone numbers
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', formatPhoneNumber);
    });
    
    // Character counter for textarea
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        addCharacterCounter(textarea);
    });
    
    // Enhanced select styling
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        enhanceSelect(select);
    });
}

function formatPhoneNumber(e) {
    const x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
}

function addCharacterCounter(textarea) {
    const maxLength = 500;
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.style.cssText = `
        text-align: right;
        font-size: 12px;
        color: var(--text-light);
        margin-top: 5px;
    `;
    
    function updateCounter() {
        const remaining = maxLength - textarea.value.length;
        counter.textContent = `${remaining} characters remaining`;
        counter.style.color = remaining < 50 ? '#ef4444' : 'var(--text-light)';
    }
    
    textarea.setAttribute('maxlength', maxLength);
    textarea.parentNode.appendChild(counter);
    textarea.addEventListener('input', updateCounter);
    updateCounter();
}

function enhanceSelect(select) {
    // Add custom styling class
    select.classList.add('enhanced-select');
    
    // Create wrapper for custom arrow
    const wrapper = document.createElement('div');
    wrapper.className = 'select-wrapper';
    wrapper.style.cssText = `
        position: relative;
        display: inline-block;
        width: 100%;
    `;
    
    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);
    
    // Add custom arrow
    const arrow = document.createElement('div');
    arrow.className = 'select-arrow';
    arrow.style.cssText = `
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: var(--text-light);
    `;
    arrow.innerHTML = '<i class="fas fa-chevron-down"></i>';
    wrapper.appendChild(arrow);
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
        const text = button.querySelector('.btn-text');
        if (text) {
            text.setAttribute('data-original', text.textContent);
            text.textContent = 'Sending';
        }
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        const text = button.querySelector('.btn-text');
        if (text && text.hasAttribute('data-original')) {
            text.textContent = text.getAttribute('data-original');
            text.removeAttribute('data-original');
        }
    }
}

function showFormSuccess() {
    showNotification('Thank you! Your consultation request has been submitted. We\'ll contact you within 24 hours.');
}

function showFormError(message) {
    showNotification(message, 'error');
}

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#22c55e' : '#ef4444',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        zIndex: '10000',
        minWidth: '300px',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '15px'
    });
    
    // Add content styles
    const content = notification.querySelector('.notification-content');
    Object.assign(content.style, {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    });
    
    // Add close button styles
    const closeBtn = notification.querySelector('.notification-close');
    Object.assign(closeBtn.style, {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '0',
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });
    
    // Add to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        notification.remove();
    }, 300);
}

function trackFormSubmission(formType, data) {
    // Analytics tracking would go here
    console.log(`Form submission tracked: ${formType}`, data);
    
    // Example: Google Analytics 4 event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            form_type: formType,
            value: formType === 'contact' ? 1 : 0.5
        });
    }
}

function showThankYouModal() {
    const modal = document.createElement('div');
    modal.className = 'thank-you-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <i class="fas fa-check-circle"></i>
                <h2>Thank You!</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>Your consultation request has been received. A member of our team will contact you within 24 hours to schedule your complimentary consultation.</p>
                <p>In the meantime, feel free to:</p>
                <ul>
                    <li>Explore our <a href="services.html">comprehensive services</a></li>
                    <li>Learn more about our <a href="about.html#team">leadership team</a></li>
                    <li>Read our latest <a href="insights.html">market insights</a></li>
                </ul>
                <div class="modal-actions">
                    <button class="btn btn-primary close-modal">Continue Exploring</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    Object.assign(modal.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10000',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 100);
    
    // Close functionality
    const closeButtons = modal.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        });
    });
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Add thank you modal styles
const modalStyles = `
.thank-you-modal .modal-content {
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

.thank-you-modal[style*="opacity: 1"] .modal-content {
    transform: translateY(0);
}

.thank-you-modal .modal-header {
    text-align: center;
    padding: 40px 40px 20px;
    border-bottom: 1px solid var(--border-light);
    position: relative;
}

.thank-you-modal .modal-header i {
    font-size: 48px;
    color: #22c55e;
    margin-bottom: 20px;
}

.thank-you-modal .modal-header h2 {
    color: var(--primary-dark);
    margin: 0;
}

.thank-you-modal .close-modal {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: var(--text-light);
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.thank-you-modal .modal-body {
    padding: 30px 40px 40px;
}

.thank-you-modal .modal-body p {
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 20px;
}

.thank-you-modal .modal-body ul {
    margin: 20px 0;
    padding-left: 20px;
}

.thank-you-modal .modal-body li {
    color: var(--text-secondary);
    margin-bottom: 8px;
}

.thank-you-modal .modal-body a {
    color: var(--primary-gold);
    text-decoration: none;
}

.thank-you-modal .modal-body a:hover {
    text-decoration: underline;
}

.thank-you-modal .modal-actions {
    text-align: center;
    margin-top: 30px;
}
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);