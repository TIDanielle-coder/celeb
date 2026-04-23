// 1. Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 80) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

// 2. Reveal Animations on Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// 3. Form Validation & Submission
const bookingForm = document.getElementById('booking-form');
bookingForm.addEventListener('submit', function(e) {
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        e.preventDefault();
        document.querySelector('#email + .error-msg').style.display = 'block';
    } else {
        // Formspree handles the actual POST
        document.getElementById('form-success').classList.remove('hidden');
        bookingForm.style.display = 'none';
    }
});
