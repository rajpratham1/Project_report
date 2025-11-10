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

    
    // --- UPDATED: Header Scroll (Autohide) Effect ---
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY; // Store the last scroll position

    if (header) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                // Scrolling Down
                if (currentScrollY > 150) { // Only hide after scrolling down 150px
                    header.classList.add('header-hidden');
                }
            } else {
                // Scrolling Up
                header.classList.remove('header-hidden');
            }
            
            // Keep the padding-shrink effect (this is separate)
            if (currentScrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            lastScrollY = currentScrollY < 0 ? 0 : currentScrollY; // Update last scroll position
        });

        // Show header when mouse is near the top of the screen (for desktop)
        document.addEventListener('mousemove', (e) => {
            if (e.clientY < 60) { // If mouse is in the top 60px of the viewport
                header.classList.remove('header-hidden');
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
            if (backToTopButton && backToTopButton.style.display !== 'block') {
                backToTopButton.style.display = 'block';
                backToTopButton.style.opacity = '1';
            }
        } else {
            if (backToTopButton && backToTopButton.style.display !== 'none') {
                backToTopButton.style.opacity = '0';
                // Wait for transition to finish before hiding
                setTimeout(() => { 
                    if (backToTopButton) { backToTopButton.style.display = 'none'; }
                }, 300);
            }
        }
    };

    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Download PDF Button ---
    const downloadPdfButton = document.getElementById('download-pdf');
    if (downloadPdfButton) {
        downloadPdfButton.addEventListener('click', () => {
            window.print();
        });
    }


    // --- Active navigation link highlighting on scroll ---
    const sections = document.querySelectorAll('main section');
    const navHighlightLinks = document.querySelectorAll('nav ul li a');

    const activateNav = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) { // 60 is an offset for the header
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
