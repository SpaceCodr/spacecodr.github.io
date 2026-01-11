// ==========================================
// SMOOTH SCROLL & SCROLL PROGRESS
// Lenis smooth scroll + progress bar
// ==========================================

(function() {
  let lenis;

  // Initialize Lenis smooth scroll
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
      wheelMultiplier: 1.0,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Make lenis globally accessible
    window.lenis = lenis;
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.getAttribute('href');

      if (target && target !== '#') {
        const targetElement = document.querySelector(target);

        if (targetElement) {
          if (lenis) {
            lenis.scrollTo(target, {
              offset: -80,
              duration: 1.2
            });
          } else {
            // Fallback to native smooth scroll
            const targetPosition = targetElement.offsetTop - 80;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }

          // Close mobile menu if open
          const mobileMenu = document.querySelector('.navbar-menu');
          if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
          }
        }
      }
    });
  });

  // Scroll progress bar
  const scrollProgressBar = document.querySelector('.scroll-progress-bar');

  if (scrollProgressBar) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgressBar.style.width = scrollPercent + '%';
    });
  }

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }

  // Scroll indicator fade out
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'all';
      }
    });
  }

  // Disable smooth scroll if reduced motion is preferred
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (lenis) {
      lenis.destroy();
    }
  }
})();
