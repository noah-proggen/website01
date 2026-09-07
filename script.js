// Seebad Caputh - Website JavaScript

// Mobile Menu Toggle (falls benötigt)
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-header nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });
}

// Smooth Scroll für Ankerlinks
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Reservierungsformular-Handling
const reservationForm = document.getElementById('reservation-form');
if (reservationForm) {
  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(reservationForm);
    const data = Object.fromEntries(formData);
    
    // Validierung
    if (!data.name || !data.guests || !data.date || !data.time) {
      alert('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }
    
    // Simulierte Bestätigung
    alert(`Vielen Dank für Ihre Reservierungsanfrage, ${data.name}!\n\n` +
          `Wir haben Ihre Anfrage für ${data.guests} Personen am ${data.date} um ${data.time} Uhr erhalten.\n` +
          `Sie erhalten in Kürze eine Bestätigung per E-Mail oder Telefon.`);
    
    reservationForm.reset();
  });
}

// Galerie - Lightbox (einfache Implementierung)
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
`;

const lightboxImg = document.createElement('img');
lightboxImg.style.cssText = `max-width: 90%; max-height: 90%; border-radius: 8px;`;
lightbox.appendChild(lightboxImg);

document.body.appendChild(lightbox);

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.querySelector('img').src;
    lightboxImg.src = imgSrc;
    lightbox.style.opacity = '1';
    lightbox.style.pointerEvents = 'auto';
  });
});

// Lightbox schließen
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.opacity = '0';
    lightbox.style.pointerEvents = 'none';
  }
});

// Header Scroll-Effekt
theme: {
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      header.classList.remove('scrolled');
      return;
    }
    if (currentScroll > lastScroll && !header.classList.contains('scrolling-down')) {
      header.classList.add('scrolling-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scrolling-down')) {
      header.classList.remove('scrolling-down');
    }
    lastScroll = currentScroll;
  });
}

// Intersection Observer für Animationen
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

// Beobachte alle Sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s, transform 0.6s';
  observer.observe(section);
});

// CSS für sichtbare Sections
const style = document.createElement('style');
style.textContent = `
  section.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Aktuelles Jahr im Footer
const yearSpan = document.createElement('span');
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
  const currentYear = new Date().getFullYear();
  footerText.innerHTML = footerText.innerHTML.replace('2024', currentYear);
}

console.log('Seebad Caputh Website - JavaScript geladen');
