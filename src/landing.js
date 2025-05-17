import style from './landing.css' with { type: 'css' };
import DOMPurify from 'dompurify';

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
        <div class="logo-title-container">
          <div class="logo-container">
            <div class="glow"></div>
            <a href="https://jspm.org" target="_blank" rel="noopener noreferrer">
              <img class="logo fade-in" src="./jspm.png" alt="JSPM.IO Logo">
            </a>
          </div>
          <h1 class="gradient-text fade-in">JSPM.IO</h1>
        </div>
        <p class="tagline fade-in">CDN Package Provider for the JSPM Project</p>
        
        <div class="buttons-container fade-in">
          <a href="#" class="button button-primary">Getting Started</a>
          <a href="#" class="button button-secondary">4.0 Release</a>
        </div>
      </div>
      
      <div class="sponsor-section fade-in">
        <div class="sponsor-text">Infrastructure Sponsor</div>
        <div class="sponsor-logo">
          <a href="https://www.cachefly.com" target="_blank" rel="noopener noreferrer">
            <img src="./cachefly.png" alt="CacheFly" width="160">
          </a>
        </div>
      </div>
      
      <div class="used-by-section fade-in">
        <h2 class="used-by-title">Used By</h2>
        <div class="used-by-logos">
          <div class="used-by-logo">
            <a href="https://www.framer.com" target="_blank" rel="noopener noreferrer">
              <img src="./framer-logo.png" alt="Framer">
            </a>
          </div>
          <div class="used-by-logo">
            <a href="https://www.framer.com" target="_blank" rel="noopener noreferrer">
              <img src="./framer-logo.png" alt="Framer">
            </a>
          </div>
          <div class="used-by-logo">
            <a href="https://www.framer.com" target="_blank" rel="noopener noreferrer">
              <img src="./framer-logo.png" alt="Framer">
            </a>
          </div>
        </div>
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
    const baseDelay = 500; // Slower base delay
    let delay;
    
    // Synchronize logo and title to fade in together first
    if (el.classList.contains('logo') || el.classList.contains('gradient-text')) {
      delay = baseDelay;
    } else if (el.classList.contains('tagline')) {
      delay = baseDelay + 400;
    } else if (el.classList.contains('buttons-container')) {
      delay = baseDelay + 800;
    } else if (el.classList.contains('sponsor-section')) {
      delay = baseDelay + 1200;
    } else if (el.classList.contains('used-by-section')) {
      delay = baseDelay + 1600;
    } else {
      delay = baseDelay + (i * 300);
    }
    
    setTimeout(() => {
      el.style.opacity = targetOpacity;
      
      // Only add move-up animations to elements below the title
      if (el.classList.contains('tagline')) {
        el.classList.add('move-up');
      } else if (el.classList.contains('buttons-container')) {
        el.classList.add('move-up');
      } else if (el.classList.contains('sponsor-section')) {
        el.classList.add('fade-up');
      } else if (el.classList.contains('used-by-section')) {
        el.classList.add('fade-up');
      }
    }, delay);
  });
  
  // Add glow pulse animation
  glow.classList.add('glow-animate');
  
  // No confetti effect on logo click
  
  // Add hover effects to buttons
  const buttons = container.querySelectorAll('.button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.classList.add('button-hover');
    });
    button.addEventListener('mouseleave', () => {
      button.classList.remove('button-hover');
    });
    // Add a slight delay to make the hover effect more noticeable when clicking
    button.addEventListener('mousedown', () => {
      button.style.transition = 'all 0.1s ease';
      button.style.transform = 'scale(0.98)';
    });
    button.addEventListener('mouseup', () => {
      button.style.transition = 'all 0.3s ease, background-position 1.5s ease';
      button.style.transform = 'scale(1)';
    });
  });
}
