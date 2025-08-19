// BRAND NEW COMPREHENSIVE CONTACT FORM
document.addEventListener('DOMContentLoaded', function() {
    console.log('New comprehensive contact form loaded');
    
    const form = document.getElementById('new-contact-form');
    const phoneInput = document.getElementById('client-phone');
    
    // Phone number formatting
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove all non-digits
            
            if (value.length >= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            } else if (value.length >= 3) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }
            
            e.target.value = value;
        });
    }
    
    if (form) {
        console.log('New comprehensive form found');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('New comprehensive form submitted');
            
            // Get basic info
            const firstName = document.getElementById('client-firstname').value.trim();
            const lastName = document.getElementById('client-lastname').value.trim();
            const email = document.getElementById('client-email').value.trim();
            const phone = document.getElementById('client-phone').value.trim() || 'Not provided';
            
            // Get additional fields
            const assets = document.getElementById('client-assets').value || 'Not specified';
            const consultationType = document.getElementById('client-consultation-type').value || 'Not specified';
            const preferredTime = document.getElementById('client-preferred-time').value || 'Not specified';
            const message = document.getElementById('client-message').value.trim() || 'No message provided';
            
            // Get services checkboxes
            const serviceCheckboxes = document.querySelectorAll('input[name="clientServices"]:checked');
            const services = Array.from(serviceCheckboxes).map(cb => cb.value).join(', ') || 'Not specified';
            
            // Get preferred days checkboxes
            const dayCheckboxes = document.querySelectorAll('input[name="clientPreferredDays"]:checked');
            const preferredDays = Array.from(dayCheckboxes).map(cb => cb.value).join(', ') || 'Not specified';
            
            console.log('Complete form data:', {
                firstName, lastName, email, phone, assets, services, 
                consultationType, preferredTime, preferredDays, message
            });
            
            // Simple validation
            if (!firstName || !lastName || !email) {
                alert('Please fill in your first name, last name, and email address.');
                return;
            }
            
            // Get submit button
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading
            submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';
            submitBtn.disabled = true;
            
            // EmailJS parameters for new template
            const params = {
                client_name: firstName + ' ' + lastName,
                client_firstname: firstName,
                client_lastname: lastName,
                client_email: email,
                client_phone: phone,
                client_assets: assets,
                client_services: services,
                client_consultation_type: consultationType,
                client_preferred_time: preferredTime,
                client_preferred_days: preferredDays,
                client_message: message,
                to_email: 'nasar@sporoswealth.com'
            };
            
            console.log('Sending with comprehensive params:', params);
            
            // Send with new template ID
            emailjs.send('service_2zugw66', 'template_v4ovcy9', params)
                .then(function(response) {
                    console.log('Success!', response);
                    alert('Thank you! Your consultation request has been sent successfully. We will contact you within 24 hours.');
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    alert('Sorry, there was an error sending your message. Please try again or call us at (949) 729-9994.');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    } else {
        console.log('New comprehensive form not found');
    }
});