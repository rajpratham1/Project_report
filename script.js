document.addEventListener('DOMContentLoaded', function() {

    // --- Theme Switcher Logic ---
    const themeButtons = document.querySelectorAll('.theme-btn');
    const docElement = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'light';

    function setTheme(theme) {
        docElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update active button state
        themeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });
    }

    // Set initial theme on load
    setTheme(currentTheme);

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            setTheme(button.dataset.theme);
        });
    });

    
    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }


    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('nav');
    const contentWrapper = document.querySelector('.content-wrapper');
    const navLinks = document.querySelectorAll('nav ul li a');


    // --- Sidebar Toggle ---
    function toggleSidebar() {
        const isSidebarOpen = document.body.classList.toggle('sidebar-open');
        // On mobile, prevent body scroll when nav is open
        if (window.innerWidth <= 768) {
            document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
        }
    }

    if (menuIcon) {
        menuIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebar();
        });
    }


    // --- Close Sidebar Logic ---
    function closeSidebar() {
        if (document.body.classList.contains('sidebar-open') && window.innerWidth <= 768) {
            document.body.classList.remove('sidebar-open');
            document.body.style.overflow = '';
        }
    }

    // Close sidebar when clicking on the main content overlay (on mobile)
    if (contentWrapper) {
        contentWrapper.addEventListener('click', closeSidebar);
    }

    // Close sidebar when a navigation link is clicked (on mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });


    // --- Back to Top Button ---
    let backToTopButton = document.getElementById('back-to-top');

    window.onscroll = function() {
        // Show/hide button
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            if (!backToTopButton || backToTopButton.style.display !== 'block') {
                backToTopButton.style.display = 'block';
                backToTopButton.style.opacity = '1';
            }
        } else {
            if (!backToTopButton || backToTopButton.style.display !== 'none') {
                backToTopButton.style.opacity = '0';
                // Wait for transition to finish before hiding
                setTimeout(() => { backToTopButton.style.display = 'none'; }, 300);
            }
        }
    };

    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // --- Active navigation link highlighting on scroll ---
    const sections = document.querySelectorAll('main section');
    const navHighlightLinks = document.querySelectorAll('nav ul li a');

    const activateNav = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) { // 60 is header height
                current = section.getAttribute('id');
            }
        });

        navHighlightLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === current) {
                a.classList.add('active');
            }
        });
    };


    // --- Scroll Fade-in Animations (Updated to .fade-in-up) ---
    const faders = document.querySelectorAll('.fade-in-up');
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


    // --- Sidebar behavior based on screen size ---
    const mediaQuery = window.matchMedia('(min-width: 769px)');

    function handleTabletChange(e) {
        // If media query matches (desktop view)
        if (e.matches) {
            document.body.classList.add('sidebar-open');
            document.body.style.overflow = ''; // Ensure body scroll is enabled
        } else {
            // On mobile view, ensure sidebar is closed by default
            document.body.classList.remove('sidebar-open');
        }
    }

    // Initial check
    handleTabletChange(mediaQuery);

    // Listen for changes in screen size
    mediaQuery.addEventListener('change', handleTabletChange);
});
