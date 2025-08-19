// Simple EmailJS form handler - working version
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value || 'Not provided';
            const assets = document.getElementById('assets').value || 'Not specified';
            const consultationType = document.getElementById('consultation-type').value || 'Not specified';
            const preferredTime = document.getElementById('preferred-time').value || 'Not specified';
            const message = document.getElementById('message').value || 'No message provided';
            
            // Get services
            const serviceBoxes = document.querySelectorAll('input[name="services"]:checked');
            const services = Array.from(serviceBoxes).map(box => box.value).join(', ') || 'Not specified';
            
            // Get preferred days
            const dayBoxes = document.querySelectorAll('input[name="preferredDays"]:checked');
            const preferredDays = Array.from(dayBoxes).map(box => box.value).join(', ') || 'Not specified';
            
            // Simple validation
            if (!firstName || !lastName || !email) {
                alert('Please fill in your first name, last name, and email address.');
                return;
            }
            
            // Prepare EmailJS parameters
            const templateParams = {
                from_name: firstName + ' ' + lastName,
                from_email: email,
                phone: phone,
                assets: assets,
                services: services,
                consultation_type: consultationType,
                preferred_time: preferredTime,
                preferred_days: preferredDays,
                message: message,
                to_email: 'nasar@sporoswealth.com'
            };
            
            // Show loading
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email
            emailjs.send('service_2zugw66', 'template_y84zkx6', templateParams)
                .then(function(response) {
                    alert('Thank you! Your message has been sent successfully.');
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                })
                .catch(function(error) {
                    alert('Sorry, there was an error. Please try again or call us at (949) 729-9994.');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
});