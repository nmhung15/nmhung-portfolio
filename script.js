/* ---------------- TYPING EFFECT ---------------- */
const roles = ["Junior Data Analyst.", "Analytics Engineer.", "Data Scientist."];
let roleIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById("typing");

function tick() {
  if (!typingEl) return;
  const full = roles[roleIdx];
  if (!deleting) {
    charIdx++;
    typingEl.textContent = full.slice(0, charIdx);
    if (charIdx === full.length) {
      deleting = true;
      setTimeout(tick, 1200);
      return;
    }
  } else {
    charIdx--;
    typingEl.textContent = full.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(tick, deleting ? 50 : 90);
}
document.addEventListener("DOMContentLoaded", tick);

/* ---------------- PARTICLES ---------------- */
(function particles() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, dots;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    const count = Math.max(50, Math.floor(w * h / 20000));
    dots = Array.from({ length: count }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.5
    }));
  }
  window.addEventListener("resize", resize);
  resize();

  function step() {
    ctx.clearRect(0, 0, w, h);
    for (const d of dots) {
      d.x += d.vx;
      d.y += d.vy;

      // bounce edges
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;

      // draw glow particle
      const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 4);
      grad.addColorStop(0, `rgba(255,213,74,${d.alpha})`);
      grad.addColorStop(0.4, `rgba(255,238,0,${d.alpha * 0.3})`);
      grad.addColorStop(1, "rgba(240, 225, 23, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
})();

// ==== Back-to-top ====
const backBtn = document.getElementById("back-to-top");
if (backBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backBtn.classList.add("show");
    } else {
      backBtn.classList.remove("show");
    }
  });

  backBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==== Scroll animations ====
const scrollEls = document.querySelectorAll('.fade-up, .slide-left, .slide-right');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });   // thấp hơn để khối cao (3 card xếp dọc trên mobile) vẫn hiện

scrollEls.forEach(el => scrollObserver.observe(el));

/* ---------------- PROJECTS CAROUSEL ---------------- */
document.addEventListener("DOMContentLoaded", function () {
  const el = document.querySelector(".projects-swiper");
  if (!el || typeof Swiper === "undefined") return;

  new Swiper(el, {
    slidesPerView: 3,
    spaceBetween: 22,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // Cho phép chọn chữ trong vùng .no-swipe
    noSwiping: true,
    noSwipingClass: 'no-swipe',
    touchStartPreventDefault: false,

    breakpoints: {
      0: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
});

// Smooth scroll khi click vào navbar
// Smooth scroll cho mọi link nội bộ (navbar + nút trong hero)
function scrollToTarget(target) {
  const OFFSET = 70; // chiều cao navbar
  const getY = () => target.getBoundingClientRect().top + window.scrollY - OFFSET;

  window.scrollTo({ top: getY(), behavior: "smooth" });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    scrollToTarget(target);
  });
});