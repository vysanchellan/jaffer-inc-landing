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
