// ==========================================
// MINIMALIST PORTFOLIO - REFINED EDITION
// Inspired by Stripe Press & B-Egg Farm
// ==========================================

// ==========================================
// 1. LOADING SCREEN
// ==========================================
// Ensure body is scrollable initially
document.body.style.overflow = 'visible';

window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const loadingProgress = document.querySelector('.loading-progress');
  const loadingCounter = document.querySelector('.loading-counter');

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;

    loadingProgress.style.width = progress + '%';
    loadingCounter.textContent = Math.floor(progress) + '%';

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          document.body.style.overflow = 'visible';
          initAnimations();
        }, 400);
      }, 300);
    }
  }, 50);
});

// ==========================================
// 2. SUBTLE BACKGROUND PARTICLES
// ==========================================
const canvas = document.getElementById('particles-canvas');

if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 50; // Reduced for minimalism

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.3 - 0.15;
      this.speedY = Math.random() * 0.3 - 0.15;
      this.opacity = Math.random() * 0.3 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ==========================================
// 3. LENIS SMOOTH SCROLL
// ==========================================
let lenis;

// Initialize Lenis only if available
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.2,
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
}

// Smooth scroll for anchor links (works with or without Lenis)
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
      }
    }
  });
});

// ==========================================
// 4. SCROLL PROGRESS BAR
// ==========================================
window.addEventListener('scroll', function() {
  const scrollBar = document.getElementById('scroll-progress');
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollBar.style.width = scrollPercent + '%';
});

// ==========================================
// 5. GSAP SCROLL ANIMATIONS (MINIMAL)
// ==========================================
function initAnimations() {
  // Check if GSAP is loaded
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded, skipping animations');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Subtle fade-in for hero elements
  gsap.from('.hero-greeting', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.2,
    ease: 'power2.out'
  });

  gsap.from('.hero-title', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.4,
    ease: 'power2.out'
  });

  gsap.from('.hero-subtitle', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.6,
    ease: 'power2.out'
  });

  gsap.from('.hero-cta', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.8,
    ease: 'power2.out'
  });

  // Subtle parallax for hero gradient
  gsap.to('.hero-gradient', {
    y: '20%',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5
    }
  });

  // Section title animations
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  // Subtle card reveals
  gsap.utils.toArray('.project-card, .experience-card, .cert-card, .skill-category').forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  // Skill tags - minimal stagger
  gsap.utils.toArray('.skill-tag').forEach((tag, index) => {
    gsap.from(tag, {
      scrollTrigger: {
        trigger: tag.closest('.skill-category'),
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      delay: index * 0.03,
      ease: 'power2.out'
    });
  });
}

// ==========================================
// 6. VANILLA TILT (SUBTLE)
// ==========================================
window.addEventListener('load', () => {
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 3,
      speed: 400,
      glare: true,
      "max-glare": 0.1,
      scale: 1.02
    });
  }
});

// ==========================================
// 7. MAGNETIC BUTTONS (SUBTLE)
// ==========================================
if (typeof gsap !== 'undefined') {
  const magneticButtons = document.querySelectorAll('.btn-hero, .btn-contact, .btn-resume');

  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.15,
        y: y * 0.15,
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
// 8. DARK MODE TOGGLE
// ==========================================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// ==========================================
// 9. INTERSECTION OBSERVER (FALLBACK)
// ==========================================
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

document.querySelectorAll('.fade-in-up, .fade-in').forEach(el => {
  observer.observe(el);
});

// ==========================================
// 10. NAVBAR GLASS EFFECT
// ==========================================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
});

// ==========================================
// 11. SCROLL INDICATOR
// ==========================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  window.addEventListener('scroll', () => {
    if (typeof gsap !== 'undefined') {
      if (window.scrollY > 100) {
        gsap.to(scrollIndicator, {
          opacity: 0,
          duration: 0.3
        });
      } else {
        gsap.to(scrollIndicator, {
          opacity: 1,
          duration: 0.3
        });
      }
    } else {
      // Fallback without GSAP
      scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
    }
  });
}

// ==========================================
// 12. GRADIENT BACKGROUND ANIMATION
// ==========================================
const gradientBg = document.querySelector('.gradient-bg');
let gradientAngle = 0;

function animateGradient() {
  gradientAngle += 0.1;
  gradientBg.style.background = `
    linear-gradient(${gradientAngle}deg,
      rgba(102, 126, 234, 0.02) 0%,
      rgba(118, 75, 162, 0.02) 50%,
      rgba(240, 147, 251, 0.02) 100%)
  `;
  requestAnimationFrame(animateGradient);
}

animateGradient();

// ==========================================
// 13. PERFORMANCE OPTIMIZATIONS
// ==========================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  if (typeof gsap !== 'undefined') {
    gsap.globalTimeline.timeScale(100);
  }
  if (lenis) {
    lenis.destroy();
  }
}

document.addEventListener('visibilitychange', () => {
  if (typeof gsap !== 'undefined') {
    if (document.hidden) {
      gsap.globalTimeline.pause();
    } else {
      gsap.globalTimeline.resume();
    }
  }
});

// ==========================================
// 14. CONSOLE MESSAGE (MINIMAL)
// ==========================================
console.log('%c✨ Umer Bin Shah - Portfolio', 'font-size: 16px; font-weight: 600; color: #667eea;');
console.log('%cBuilt with care and attention to detail', 'font-size: 12px; color: #64748b;');
