// ==========================================
// MAIN INITIALIZATION
// Loading screen and core setup
// ==========================================

(function() {
  // Ensure body is scrollable initially
  document.body.style.overflow = 'visible';

  // ==========================================
  // LOADING SCREEN
  // ==========================================
  window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingCounter = document.querySelector('.loading-counter');

    if (!loadingScreen || !loadingProgress || !loadingCounter) {
      return;
    }

    let progress = 0;

    const interval = setInterval(() => {
      // Random increment for natural feel
      progress += Math.random() * 15;

      if (progress > 100) {
        progress = 100;
      }

      // Update progress bar and counter
      loadingProgress.style.width = progress + '%';
      loadingCounter.textContent = Math.floor(progress) + '%';

      // When complete, fade out loading screen
      if (progress === 100) {
        clearInterval(interval);

        setTimeout(() => {
          loadingScreen.style.opacity = '0';

          setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.style.overflow = 'visible';
          }, 400);
        }, 300);
      }
    }, 50);
  });

  // ==========================================
  // GRADIENT BACKGROUND ANIMATION
  // ==========================================
  const gradientBg = document.querySelector('.gradient-bg');

  if (gradientBg) {
    let gradientAngle = 0;

    function animateGradient() {
      gradientAngle += 0.1;

      gradientBg.style.background = `
        linear-gradient(${gradientAngle}deg,
          rgba(200, 93, 63, 0.08) 0%,
          rgba(184, 122, 92, 0.06) 50%,
          rgba(139, 154, 124, 0.04) 100%)
      `;

      requestAnimationFrame(animateGradient);
    }

    animateGradient();

    // Pause when tab not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Animation continues but we could pause if needed
      }
    });
  }

  // ==========================================
  // ACTIVE NAVIGATION LINK HIGHLIGHTING
  // ==========================================
  const navLinks = document.querySelectorAll('.navbar-link');
  const sections = document.querySelectorAll('section[id]');

  function highlightNavigation() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');

          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);

  // ==========================================
  // EXTERNAL LINKS - OPEN IN NEW TAB
  // ==========================================
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.hasAttribute('target')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // ==========================================
  // ERROR HANDLING FOR MISSING ASSETS
  // ==========================================
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      console.warn(`Failed to load image: ${this.src}`);
      this.style.display = 'none';
    });
  });

  // ==========================================
  // PERFORMANCE MONITORING (Optional)
  // ==========================================
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];

        if (perfData) {
          const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
          const domReady = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;

          console.log(`%cPerformance Metrics:`, 'font-weight: bold; color: #C85D3F;');
          console.log(`DOM Ready: ${Math.round(domReady)}ms`);
          console.log(`Total Load: ${Math.round(loadTime)}ms`);
        }

        // Measure LCP (Largest Contentful Paint)
        if ('PerformanceObserver' in window) {
          try {
            new PerformanceObserver((list) => {
              const entries = list.getEntries();
              const lastEntry = entries[entries.length - 1];
              const lcp = lastEntry.renderTime || lastEntry.loadTime;
              console.log(`LCP: ${Math.round(lcp)}ms`);
            }).observe({ entryTypes: ['largest-contentful-paint'] });
          } catch (e) {
            // Observer not supported
          }
        }
      }, 0);
    });
  }

  // ==========================================
  // SERVICE WORKER (Optional - for PWA)
  // ==========================================
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js')
    //   .then(reg => console.log('Service Worker registered'))
    //   .catch(err => console.log('Service Worker registration failed'));
  }

  // ==========================================
  // PREVENT FOUC (Flash of Unstyled Content)
  // ==========================================
  document.documentElement.classList.add('js-enabled');
})();
