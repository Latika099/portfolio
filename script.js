// =============================================
//  THEME TOGGLE
// =============================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Persistence
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// =============================================
//  HAMBURGER TOGGLE
// =============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-link')) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

// =============================================
//  ACTIVE NAV LINK ON SCROLL
// =============================================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => a.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => navObserver.observe(s));

// =============================================
//  NAVBAR SHADOW ON SCROLL
// =============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20
    ? 'var(--shadow-md)'
    : 'none';
});

// =============================================
//  SCROLL FADE-IN ANIMATIONS
// =============================================
const fadeEls = document.querySelectorAll('.fade-hidden');

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger cards within the same parent
        const siblings = Array.from(
          entry.target.parentElement.querySelectorAll('.fade-hidden')
        );
        const delay = siblings.indexOf(entry.target) * 80;
        setTimeout(() => entry.target.classList.add('fade-visible'), delay);
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

fadeEls.forEach((el) => fadeObserver.observe(el));

// =============================================
//  CONTACT FORM HANDLER
// =============================================
const contactForm = document.getElementById('contact-form');
const sendBtn = document.getElementById('send-btn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name && email && message) {
    sendBtn.textContent = '✓ Message Sent!';
    sendBtn.disabled = true;
    setTimeout(() => {
      sendBtn.textContent = 'Send Message';
      sendBtn.disabled = false;
      contactForm.reset();
    }, 3000);
  }
});

// =============================================
//  CERTIFICATE SLIDER — Arrows + Drag Scroll
// =============================================
const certSlider = document.getElementById('cert-slider');
const certPrev = document.getElementById('cert-prev');
const certNext = document.getElementById('cert-next');

const SCROLL_AMOUNT = 260;

certPrev.addEventListener('click', () => {
  certSlider.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
});

certNext.addEventListener('click', () => {
  certSlider.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
});

// Mouse drag-to-scroll
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

certSlider.addEventListener('mousedown', (e) => {
  isDragging = true;
  certSlider.classList.add('dragging');
  startX = e.pageX - certSlider.offsetLeft;
  scrollLeft = certSlider.scrollLeft;
});

certSlider.addEventListener('mouseleave', () => {
  isDragging = false;
  certSlider.classList.remove('dragging');
});

certSlider.addEventListener('mouseup', () => {
  isDragging = false;
  certSlider.classList.remove('dragging');
});

certSlider.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - certSlider.offsetLeft;
  const walk = (x - startX) * 1.5;
  certSlider.scrollLeft = scrollLeft - walk;
});
// =============================================
//  SKILLS PROGRESS BARS ANIMATION
// =============================================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-progress');
        entry.target.style.width = targetWidth + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));

// =============================================
//  PROJECTS CAROUSEL DRAG
// =============================================
const pCarousel = document.querySelector('.projects-carousel');
if (pCarousel) {
  let isDown = false, startX, sLeft;
  pCarousel.addEventListener('mousedown', (e) => {
    isDown = true; pCarousel.classList.add('dragging');
    startX = e.pageX - pCarousel.offsetLeft; sLeft = pCarousel.scrollLeft;
  });
  pCarousel.addEventListener('mouseleave', () => { isDown = false; pCarousel.classList.remove('dragging'); });
  pCarousel.addEventListener('mouseup', () => { isDown = false; pCarousel.classList.remove('dragging'); });
  pCarousel.addEventListener('mousemove', (e) => {
    if (!isDown) return; e.preventDefault();
    const x = e.pageX - pCarousel.offsetLeft; const walk = (x - startX) * 2;
    pCarousel.scrollLeft = sLeft - walk;
  });
}
