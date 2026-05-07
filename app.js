// Animated counters
const counters = document.querySelectorAll(".stat-number");

const animateCount = (el) => {
  const target = +el.dataset.count;
  let current = 0;
  const increment = Math.ceil(target / 120);

  const update = () => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
    } else {
      el.textContent = current;
      requestAnimationFrame(update);
    }
  };
  update();
};

const onScroll = () => {
  counters.forEach((counter) => {
    const rect = counter.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100 && !counter.classList.contains("done")) {
      counter.classList.add("done");
      animateCount(counter);
    }
  });
};

window.addEventListener("scroll", onScroll);
onScroll();

// Theme toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
});
