// Animated background particles and mouse interaction
// This script appends particles into the .animated-bg .particles-container
// and performs subtle sphere movement on mousemove. It's intentionally
// scoped to elements inside `.animated-bg` to avoid affecting other page elements.

(function () {
  const containerSelector = '.animated-bg .particles-container';
  const particlesContainer = document.querySelector(containerSelector);
  if (!particlesContainer) return; // nothing to do

  const particleCount = 80;

  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    resetParticle(particle);

    particlesContainer.appendChild(particle);

    animateParticle(particle);
  }

  function resetParticle(particle) {
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = '0';
    // clear inline transition so new transition can be applied later
    particle.style.transition = '';
    return { x: posX, y: posY };
  }

  function animateParticle(particle) {
    const pos = resetParticle(particle);
    const duration = Math.random() * 10 + 10; // seconds
    const delay = Math.random() * 5; // seconds

    setTimeout(() => {
      particle.style.transition = `all ${duration}s linear`;
      particle.style.opacity = (Math.random() * 0.3 + 0.05).toString();

      const moveX = pos.x + (Math.random() * 20 - 10);
      const moveY = pos.y - Math.random() * 30; // move upwards

      particle.style.left = `${moveX}%`;
      particle.style.top = `${moveY}%`;

      setTimeout(() => {
        // loop
        animateParticle(particle);
      }, duration * 1000);
    }, delay * 1000);
  }

  // Create initial particles
  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }

  // Mouse interaction: create temporary particles and gently move spheres
  document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) * 100;
    const mouseY = (e.clientY / window.innerHeight) * 100;

    // small temporary particle at mouse
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${mouseX}%`;
    particle.style.top = `${mouseY}%`;
    particle.style.opacity = '0.6';
    particlesContainer.appendChild(particle);

    setTimeout(() => {
      particle.style.transition = 'all 2s ease-out';
      particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
      particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
      particle.style.opacity = '0';

      setTimeout(() => {
        particle.remove();
      }, 2000);
    }, 10);

    // subtle movement of gradient spheres (only those inside .animated-bg)
    const spheres = document.querySelectorAll('.animated-bg .gradient-sphere');
    const moveX = (e.clientX / window.innerWidth - 0.5) * 5; // small px offset
    const moveY = (e.clientY / window.innerHeight - 0.5) * 5;

    spheres.forEach((sphere) => {
      const currentTransform = getComputedStyle(sphere).transform;
      const base = currentTransform === 'none' ? '' : currentTransform;
      // append a small translate to existing transform so we don't remove animations
      sphere.style.transform = `${base} translate(${moveX}px, ${moveY}px)`;
    });
  });
})();
