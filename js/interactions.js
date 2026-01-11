// ==========================================
// INTERACTIONS & MICRO-ANIMATIONS
// Mobile menu, tilt effects, magnetic buttons
// ==========================================

(function() {
  // ==========================================
  // MOBILE MENU TOGGLE
  // ==========================================
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.navbar-menu');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      const isActive = mobileMenu.classList.toggle('active');
      mobileMenuToggle.setAttribute('aria-expanded', isActive);

      // Update icon
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        if (isActive) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }

      // Prevent body scroll when menu is open
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';

        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // ==========================================
  // VANILLA TILT EFFECTS
  // ==========================================
  if (typeof VanillaTilt !== 'undefined') {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    if (tiltElements.length > 0) {
      VanillaTilt.init(tiltElements, {
        max: 5,
        speed: 400,
        glare: true,
        'max-glare': 0.15,
        scale: 1.02,
        perspective: 1000
      });
    }
  }

  // ==========================================
  // MAGNETIC BUTTONS (GSAP Required)
  // ==========================================
  if (typeof gsap !== 'undefined') {
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

    magneticButtons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)'
        });
      });
    });
  }

  // ==========================================
  // KEYBOARD NAVIGATION IMPROVEMENTS
  // ==========================================

  // Focus trap for mobile menu
  if (mobileMenu) {
    const focusableElements = mobileMenu.querySelectorAll('a, button');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    mobileMenu.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    });
  }

  // ==========================================
  // SMOOTH REVEAL ON SCROLL (Fallback)
  // ==========================================

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
      }
    });
  }, observerOptions);

  // Observe elements with reveal class
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // ==========================================
  // CONSOLE MESSAGE
  // ==========================================
  console.log('%c✨ Umer Bin Shah - Portfolio', 'font-size: 16px; font-weight: 600; color: #C85D3F;');
  console.log('%cBuilt with care and attention to detail', 'font-size: 12px; color: #6B635B;');
})();
