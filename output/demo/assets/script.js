// AOS (scroll animations)
AOS.init({ duration: 800, once: true });

// Swiper carousels
const awardsSwiper = new Swiper(".awards-swiper", {
  slidesPerView: 1,
  spaceBetween: 16,
  autoplay: { delay: 2500, disableOnInteraction: false },
  pagination: { el: ".awards-swiper .swiper-pagination", clickable: true },
  breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
});

const testimonialsSwiper = new Swiper(".testimonials-swiper", {
  slidesPerView: 1,
  spaceBetween: 16,
  autoplay: { delay: 4000, disableOnInteraction: false },
  pagination: { el: ".testimonials-swiper .swiper-pagination", clickable: true },
  breakpoints: { 768: { slidesPerView: 2 } }
});

// Lightbox2 basic config
lightbox.option({
  fadeDuration: 200,
  imageFadeDuration: 200,
  resizeDuration: 200,
  wrapAround: true
});

// Counter animations for achievements
function animateCounters(){
  document.querySelectorAll("[data-counter]").forEach(el=>{
    const targetStr = el.getAttribute("data-value");
    const suffix = el.getAttribute("data-suffix") || "";
    const target = parseFloat(String(targetStr).replace(/[^\d.]/g, "")) || 0;
    const isInt = Number.isInteger(target);
    const duration = 1200;
    const start = performance.now();

    function tick(now){
      const p = Math.min(1, (now - start) / duration);
      const val = target * p;
      el.textContent = (isInt ? Math.round(val) : val.toFixed(1)) + (suffix || (/\D/.test(targetStr) ? targetStr.replace(/[\d.]/g,"") : ""));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}
window.addEventListener("load", animateCounters);

// Charts (Chart.js) for businessData
function initCharts(){
  const canvases = document.querySelectorAll(".biz-chart");
  canvases.forEach(cv=>{
    const type = cv.dataset.type || "bar";
    const metric = cv.dataset.metric || "";
    const unit = cv.dataset.unit || "";
    let values = [];
    try { values = JSON.parse(cv.dataset.values || "[]"); } catch(e){ values = []; }

    const labels = values.map((_, i) => `T${i+1}`);
    const data = {
      labels,
      datasets: [{
        label: unit ? `${metric} (${unit})` : metric,
        data: values,
        borderWidth: 2
      }]
    };
    new Chart(cv, {
      type: (type === "counter" ? "bar" : type),
      data,
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  });
}
window.addEventListener("load", initCharts);

// Gallery filters
(function(){
  const buttons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".gallery-item");
  buttons.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      buttons.forEach(b=>b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.dataset.filter;
      items.forEach(it=>{
        const cat = it.getAttribute("data-category");
        it.style.display = (filter === "all" || filter === cat) ? "block" : "none";
      });
    });
  });
})();
