/* ============================================
   UNIDAS SYSTEMS — Premium Interactions
   ============================================ */

// --- FAQ Accordion ---
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// --- Stagger Reveal (IntersectionObserver) ---
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Calculate stagger delay based on siblings
      const parent = entry.target.parentElement;
      const siblings = Array.from(parent.querySelectorAll('.stagger:not(.visible)'));
      const siblingIndex = siblings.indexOf(entry.target);
      const delay = Math.min(siblingIndex * 80, 400);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      staggerObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.stagger').forEach(el => staggerObserver.observe(el));

// --- Navbar scroll effect ---
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 50) {
    navbar.style.borderBottomColor = 'rgba(255,255,255,0.08)';
  } else {
    navbar.style.borderBottomColor = 'rgba(255,255,255,0.06)';
  }
});

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- Feature card tilt on hover (desktop only) ---
if (window.matchMedia('(min-width: 769px)').matches) {
  document.querySelectorAll('.feature-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `translateY(-6px) perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) perspective(500px) rotateX(0) rotateY(0)';
    });
  });
}
