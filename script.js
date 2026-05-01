// ===== NAVIGATION SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 80) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ===== SMOOTH NAVIGATION LINKS =====
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll, .tour-row').forEach(el => {
    observer.observe(el);
});

// ===== PACKAGE PRICING CONFIGURATION =====
const packagePrices = {
    'standard': 2000.00,
    'vip': 4500.00,
    'vvip': 7000.00,
    'premium': 10000.00
};

const packageNames = {
    'standard': 'Standard',
    'vip': 'VIP',
    'vvip': 'VVIP',
    'premium': 'Premium'
};

// ===== BOOKING FORM HANDLING =====
const bookingForm = document.getElementById('booking-form');
const packageSelect = document.getElementById('package-type');
const quotePackage = document.getElementById('quote-package');
const quotePrice = document.getElementById('quote-price');
const quoteTotal = document.getElementById('quote-total');

if (packageSelect) {
    packageSelect.addEventListener('change', updateQuote);
}

function updateQuote() {
    const selectedPackage = packageSelect.value;
    
    if (selectedPackage && packagePrices[selectedPackage]) {
        const price = packagePrices[selectedPackage];
        quotePackage.textContent = packageNames[selectedPackage];
        quotePrice.textContent = '$' + price.toFixed(2);
        quoteTotal.textContent = '$' + price.toFixed(2);
    } else {
        quotePackage.textContent = 'Select a package';
        quotePrice.textContent = '$0.00';
        quoteTotal.textContent = '$0.00';
    }
}

// ===== FORM VALIDATION =====
function validateForm() {
    const fields = [
        { id: 'event-name', type: 'text' },
        { id: 'contact-name', type: 'text' },
        { id: 'email', type: 'email' },
        { id: 'phone', type: 'tel' },
        { id: 'event-date', type: 'date' },
        { id: 'event-location', type: 'text' },
        { id: 'package-type', type: 'select' },
        { id: 'guest-count', type: 'number' },
        { id: 'event-details', type: 'text' }
    ];

    let isValid = true;

    fields.forEach(field => {
        const element = document.getElementById(field.id);
        const formGroup = element.closest('.form-group');
        
        if (!element.value.trim()) {
            formGroup.classList.add('error');
            isValid = false;
        } else {
            formGroup.classList.remove('error');
        }

        // Email validation
        if (field.id === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(element.value)) {
                formGroup.classList.add('error');
                isValid = false;
            } else {
                formGroup.classList.remove('error');
            }
        }

        // Phone validation
        if (field.id === 'phone') {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(element.value)) {
                formGroup.classList.add('error');
                isValid = false;
            } else {
                formGroup.classList.remove('error');
            }
        }
    });

    return isValid;
}

// ===== FORM SUBMISSION =====
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Collect form data
            const formData = {
                eventName: document.getElementById('event-name').value,
                contactName: document.getElementById('contact-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                eventDate: document.getElementById('event-date').value,
                eventLocation: document.getElementById('event-location').value,
                packageType: document.getElementById('package-type').value,
                guestCount: document.getElementById('guest-count').value,
                eventDetails: document.getElementById('event-details').value,
                submittedAt: new Date().toLocaleString()
            };

            // Log form data (in real app, send to server)
            console.log('Booking Request:', formData);

            // Show success message
            bookingForm.style.display = 'none';
            document.getElementById('form-success').classList.remove('hidden');

            // Send email notification (replace with your email service)
            sendBookingNotification(formData);

            // Reset form after 3 seconds
            setTimeout(() => {
                bookingForm.reset();
                bookingForm.style.display = 'block';
                document.getElementById('form-success').classList.add('hidden');
                updateQuote();
            }, 3000);
        }
    });

    // Real-time form validation
    ['event-name', 'contact-name', 'email', 'phone', 'event-date', 'event-location', 'package-type', 'guest-count', 'event-details'].forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', function() {
                const formGroup = this.closest('.form-group');
                if (this.value.trim()) {
                    formGroup.classList.remove('error');
                }
            });
        }
    });
}

// ===== SEND BOOKING NOTIFICATION =====
function sendBookingNotification(formData) {
    // This would integrate with your email service (Formspree, SendGrid, etc.)
    // For now, it just logs to console
    const emailBody = `
New Booking Request:
- Event: ${formData.eventName}
- Name: ${formData.contactName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Date: ${formData.eventDate}
- Location: ${formData.eventLocation}
- Package: ${packageNames[formData.packageType]}
- Guests: ${formData.guestCount}
- Details: ${formData.eventDetails}
- Submitted: ${formData.submittedAt}
    `;
    
    console.log('Email would be sent to: booking@michaelblaustein.com');
    console.log(emailBody);
}

// ===== REDIRECT TICKET SALES TO PACKAGES =====
document.querySelectorAll('.btn-ticket').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.textContent.includes('TICKETS')) {
            e.preventDefault();
            document.querySelector('#packages').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== PAGE LOAD ANIMATIONS =====
window.addEventListener('load', () => {
    // Trigger animations on page load
    document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
        el.style.animationDelay = (index * 0.1) + 's';
    });
});
