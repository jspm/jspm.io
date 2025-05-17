import style from './landing.css' with { type: 'css' };

if (!document.adoptedStyleSheets.includes(style))
  document.adoptedStyleSheets.push(style);

// Render landing page
export function render() {
  return `
    <div class="container">
      <div class="gradient-background">
        <div class="gradient-blob gradient-blob-1"></div>
        <div class="gradient-blob gradient-blob-2"></div>
        <div class="gradient-blob gradient-blob-3"></div>
      </div>
      <div class="landing">
        <div class="logo-container">
          <div class="glow"></div>
          <img class="logo fade-in" src="/jspm.png" alt="JSPM Logo">
        </div>
        <h1 class="gradient-text fade-in">JSPM</h1>
        <p class="tagline fade-in">Standards-based import map package management</p>
      </div>
    </div>
  `;
}

// Attach animations and interactions
export function attach(container) {
  const logo = container.querySelector('.logo');
  const glow = container.querySelector('.glow');
  const fadeElements = container.querySelectorAll('.fade-in');
  
  // Trigger fade-ins and move animations with delay
  fadeElements.forEach((el, i) => {
    const targetOpacity = el.classList.contains('logo') ? '0.8' : '1';
    setTimeout(() => {
      el.style.opacity = targetOpacity;
      
      // Add classes for animations
      if (el.classList.contains('gradient-text')) {
        el.classList.add('move-up');
      } else if (el.classList.contains('tagline')) {
        el.classList.add('move-up');
      }
    }, 300 + i * 500);
  });
  
  // Add glow pulse animation
  glow.classList.add('glow-animate');
  
  // Add confetti on logo click
  logo.addEventListener('click', async () => {
    const confetti = (await import('canvas-confetti')).default;
    const rect = logo.getBoundingClientRect();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { 
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      colors: ['#78a7d8', '#FFD966', '#d0d0d0']
    });
  });
}
