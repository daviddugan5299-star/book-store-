// Contact page functionality for BookHaven
class ContactManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupFormSubmission();
        this.setupFAQToggles();
    }

    setupFormSubmission() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const contactData = Object.fromEntries(formData.entries());
            
            // Validate required fields
            if (!this.validateForm(contactData)) {
                return;
            }

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitButton.disabled = true;

            try {
                // Simulate form submission (in real app, send to server)
                await this.submitContactForm(contactData);
                
                // Show success message
                this.showNotification('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
                
                // Reset form
                contactForm.reset();
                
            } catch (error) {
                console.error('Form submission error:', error);
                this.showNotification('Failed to send message. Please try again or contact us directly.', 'error');
            } finally {
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }

    setupFAQToggles() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('i');

            question.addEventListener('click', () => {
                const isOpen = !answer.classList.contains('hidden');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-question i');
                        otherAnswer.classList.add('hidden');
                        otherIcon.classList.remove('rotate-180');
                    }
                });

                // Toggle current item
                if (isOpen) {
                    answer.classList.add('hidden');
                    icon.classList.remove('rotate-180');
                } else {
                    answer.classList.remove('hidden');
                    icon.classList.add('rotate-180');
                }
            });
        });
    }

    validateForm(data) {
        const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
        
        for (const field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                this.showNotification(`Please fill in the ${this.getFieldLabel(field)} field.`, 'error');
                return false;
            }
        }

        // Validate email format
        if (!this.validateEmail(data.email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return false;
        }

        return true;
    }

    getFieldLabel(fieldName) {
        const labels = {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email Address',
            subject: 'Subject',
            message: 'Message'
        };
        return labels[fieldName] || fieldName;
    }

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    async submitContactForm(contactData) {
        // In a real application, this would submit to your contact form handler
        // For now, we'll simulate the submission and optionally add to newsletter
        
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // If user opted for newsletter, add them
            if (contactData.newsletterSignup === 'on') {
                await this.subscribeToNewsletter(contactData.email, `${contactData.firstName} ${contactData.lastName}`);
            }

            // Log contact submission (in real app, send to server)
            console.log('Contact form submitted:', {
                name: `${contactData.firstName} ${contactData.lastName}`,
                email: contactData.email,
                phone: contactData.phone,
                subject: contactData.subject,
                message: contactData.message,
                newsletterSignup: contactData.newsletterSignup === 'on',
                timestamp: new Date().toISOString()
            });

            return true;
        } catch (error) {
            throw new Error('Failed to submit contact form');
        }
    }

    async subscribeToNewsletter(email, name = '') {
        try {
            const response = await fetch('tables/newsletters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    name: name,
                    preferences: ['new-books', 'offers', 'recommendations'],
                    is_active: true,
                    subscription_date: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error('Newsletter subscription failed');
            }
        } catch (error) {
            console.warn('Newsletter subscription failed:', error);
            // Don't throw error here as contact form submission is more important
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 
            type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
        }`;
        
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Initialize contact manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('contact.html')) {
        new ContactManager();
    }
});