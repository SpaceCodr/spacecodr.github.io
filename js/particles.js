// ==========================================
// PARTICLE ANIMATION
// Canvas-based background particles
// ==========================================

(function() {
  const canvas = document.getElementById('particles-canvas');

  if (!canvas || !canvas.getContext) {
    return;
  }

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrameId;

  // Adjust particle count based on device
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 20 : 50;

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  // Particle class
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

      // Wrap around edges
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.fillStyle = `rgba(200, 93, 63, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Initialize particles
  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  // Pause animation when tab is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    } else {
      animate();
    }
  });

  // Start animation
  initParticles();
  animate();

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    canvas.style.display = 'none';
  }
})();
