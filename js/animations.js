// ==========================================
// GSAP ANIMATIONS
// Scroll-triggered animations with GSAP + ScrollTrigger
// ==========================================

(function() {
  // Wait for GSAP and ScrollTrigger to load
  window.addEventListener('load', () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not loaded');
      // Ensure all elements are visible if GSAP doesn't load
      document.querySelectorAll('.card, .exp-role').forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
      });
      return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Set defaults for better visibility
    gsap.defaults({
      ease: 'power2.out',
      duration: 0.8
    });

    // ==========================================
    // HERO ANIMATIONS
    // ==========================================
    const heroTimeline = gsap.timeline({ delay: 0.3 });

    heroTimeline
      .from('.hero-line', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out'
      })
      .from('.hero-meta', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4')
      .from('.scroll-indicator', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3');

    // ==========================================
    // HERO GRADIENT PARALLAX
    // ==========================================
    gsap.to('.hero-gradient', {
      y: '30%',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      }
    });

    // ==========================================
    // SECTION HEADERS
    // ==========================================
    gsap.utils.toArray('.section-header').forEach(header => {
      const title = header.querySelector('.section-title');
      const number = header.querySelector('.section-number');
      const subtitle = header.querySelector('.section-subtitle');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      });

      if (number) {
        tl.from(number, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
          immediateRender: false
        });
      }

      if (title) {
        tl.from(title, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
          immediateRender: false
        }, '-=0.4');
      }

      if (subtitle) {
        tl.from(subtitle, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
          immediateRender: false
        }, '-=0.5');
      }
    });

    // ==========================================
    // CARDS STAGGER REVEAL
    // ==========================================
    gsap.utils.toArray('.card').forEach(card => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power2.out',
        immediateRender: false
      });
    });

    // ==========================================
    // EXPERIENCE ROLE ROWS
    // ==========================================
    // Role rows fade up in sequence as the panel enters.
    gsap.utils.toArray('.exp-role').forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: '.exp-roles',
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out',
        immediateRender: false
      });
    });

    // ==========================================
    // TAGS STAGGER
    // ==========================================
    gsap.utils.toArray('.card').forEach(card => {
      const tags = card.querySelectorAll('.tag');

      if (tags.length > 0) {
        gsap.from(tags, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true
          },
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          stagger: 0.05,
          ease: 'back.out(1.2)',
          immediateRender: false
        });
      }
    });

    // ==========================================
    // PHILOSOPHY QUOTE
    // ==========================================
    const philosophyQuote = document.querySelector('#philosophy .quote');

    if (philosophyQuote) {
      gsap.from(philosophyQuote, {
        scrollTrigger: {
          trigger: philosophyQuote,
          start: 'top 70%',
          toggleActions: 'play none none none',
          once: true
        },
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: 'power2.out',
        immediateRender: false
      });
    }

    // ==========================================
    // PROJECT CARDS PARALLAX
    // ==========================================
    gsap.utils.toArray('.project-visual img').forEach(img => {
      gsap.to(img, {
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: '10%',
        ease: 'none'
      });
    });

    // ==========================================
    // CONTACT SECTION
    // ==========================================
    const contactElements = document.querySelectorAll('#contact h2, #contact p, #contact .btn-primary, #contact .btn-secondary');

    if (contactElements.length > 0) {
      gsap.from(contactElements, {
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        immediateRender: false
      });
    }

    // ==========================================
    // PARALLAX BACKGROUND GRADIENT
    // ==========================================
    const gradientBg = document.querySelector('.gradient-bg');

    if (gradientBg) {
      gsap.to(gradientBg, {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2
        },
        y: '20%',
        ease: 'none'
      });
    }

    // ==========================================
    // REDUCED MOTION CHECK
    // ==========================================
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.globalTimeline.timeScale(100);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }

    // ==========================================
    // REFRESH SCROLLTRIGGER
    // ==========================================
    // Refresh after all animations are set up
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Also refresh on window resize
    window.addEventListener('resize', () => {
      ScrollTrigger.refresh();
    });

    // ==========================================
    // PAUSE ANIMATIONS WHEN TAB NOT VISIBLE
    // ==========================================
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        gsap.globalTimeline.pause();
      } else {
        gsap.globalTimeline.resume();
      }
    });
  });
})();
