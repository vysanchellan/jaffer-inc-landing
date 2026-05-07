// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Scroll Reveal Observer
const revealElements = document.querySelectorAll('.reveal');
const staggerContainers = document.querySelectorAll('.grid-3, .services-wrapper');

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    
    // Add active class to main reveal element
    entry.target.classList.add('active');
    
    // Handle staggered children if present
    const staggerItems = entry.target.querySelectorAll('.stagger-item');
    if (staggerItems.length > 0) {
      staggerItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('active');
        }, index * 100); // 100ms delay between items
      });
    }
    
    // Trigger counters if this is the stats section
    if (entry.target.querySelector('.stat-num')) {
      const counters = entry.target.querySelectorAll('.stat-num');
      counters.forEach(counter => animateCount(counter));
    }

    observer.unobserve(entry.target);
  });
}, revealOptions);

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// Counter Animation
function animateCount(el) {
  const target = +el.getAttribute('data-count');
  if (isNaN(target)) return; // skip the % sign

  let current = 0;
  const duration = 2000; // ms
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);
  const increment = target / totalFrames;

  const update = () => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
    } else {
      el.textContent = Math.ceil(current);
      requestAnimationFrame(update);
    }
  };
  update();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if(targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if(targetElement) {
      const offset = 80; // height of navbar
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});