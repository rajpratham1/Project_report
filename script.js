document.addEventListener('DOMContentLoaded', function() {
    // --- Back to Top Button ---
    let backToTopButton = document.getElementById('back-to-top');

    window.onscroll = function() {
        // Show/hide button
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            if (backToTopButton.style.display !== 'block') {
                backToTopButton.style.display = 'block';
            }
        } else {
            if (backToTopButton.style.display !== 'none') {
                backToTopButton.style.display = 'none';
            }
        }
    };

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Active navigation link highlighting on scroll ---
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('nav ul li a');

    const activateNav = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    };

    // --- Scroll Fade-in Animations ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    // Add scroll listener for nav highlighting
    window.addEventListener('scroll', activateNav);
});