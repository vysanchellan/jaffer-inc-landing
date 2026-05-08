// navbar scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// reveal animation
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('active');
      io.unobserve(e.target);
    }
  });
}, {threshold: 0.1});

reveals.forEach(r => io.observe(r));

// counters
const counters = document.querySelectorAll('[data-count]');
const animate = (el) => {
  const target = +el.dataset.count;
  let cur = 0;
  const step = Math.ceil(target / 80);
  const tick = () => {
    cur += step;
    if (cur >= target) el.textContent = target;
    else { el.textContent = cur; requestAnimationFrame(tick); }
  };
  tick();
};

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      counters.forEach(animate);
      statsObserver.disconnect();
    }
  });
}, {threshold: 0.2});

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

// interactive hover tilt for hero card
const heroCard = document.querySelector('.hero__card');
if (heroCard) {
  heroCard.addEventListener('mousemove', (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 6;
    const rotateX = ((y / rect.height) - 0.5) * -6;
    heroCard.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  heroCard.addEventListener('mouseleave', () => {
    heroCard.style.transform = '';
  });
}
