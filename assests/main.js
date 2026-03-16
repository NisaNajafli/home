const slides = document.querySelectorAll(".slide")
const fills = document.querySelectorAll(".fill")
const segments = document.querySelectorAll(".segment")
const current = document.getElementById("current")
const heroSlider = document.querySelector(".hero-slider")

let index = 0
const duration = 5000
let autoTimer = null

function resetProgress() {
  fills.forEach((f) => {
    f.style.transition = "none"
    f.style.width = "0%"
  })
}

function startProgress() {
  fills.forEach((f, i) => {
    if (i < index) {
      f.style.width = "100%"
    }
  })

  setTimeout(() => {
    if (fills[index]) {
      fills[index].style.transition = duration + "ms linear"
      fills[index].style.width = "100%"
    }
  }, 50)
}

function goToSlide(newIndex, restartTimer = true) {
  if (!slides.length) return

  slides[index].classList.remove("active")

  index = (newIndex + slides.length) % slides.length

  slides[index].classList.add("active")
  current.innerText = index + 1

  resetProgress()
  startProgress()

  if (restartTimer) {
    if (autoTimer) clearInterval(autoTimer)
    autoTimer = setInterval(() => goToSlide(index + 1, false), duration)
  }
}

resetProgress()
startProgress()
autoTimer = setInterval(() => goToSlide(index + 1, false), duration)

segments.forEach((segment, i) => {
  segment.style.cursor = "pointer"
  segment.addEventListener("click", () => {
    goToSlide(i)
  })
})

let touchStartX = 0
let touchEndX = 0
const swipeThreshold = 50

if (heroSlider) {
  heroSlider.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].clientX
    },
    { passive: true },
  )

  heroSlider.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].clientX
      const diff = touchEndX - touchStartX

      if (Math.abs(diff) > swipeThreshold) {
        if (diff < 0) {
          goToSlide(index + 1)
        } else {
          goToSlide(index - 1)
        }
      }
    },
    { passive: true },
  )
}

document.addEventListener("DOMContentLoaded", function () {
  const advantagesSwiper = new Swiper(".advantages-swiper", {
    slidesPerView: 3.2,
    spaceBetween: 30,
    navigation: {
      nextEl: ".advantages-next",
      prevEl: ".advantages-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1.2 },
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3.2 },
    },
  })

  const servicesSwiper = new Swiper(".services-swiper", {
    slidesPerView: 3.2,
    spaceBetween: 30,
    navigation: {
      nextEl: ".gallery-next",
      prevEl: ".gallery-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1.2 },
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3.2 },
    },
    on: {
      init: function () {
        updateServicesPagination(this)
      },
      slideChange: function () {
        updateServicesPagination(this)
      },
    },
  })

  function updateServicesPagination(swiper) {
    const current = swiper.realIndex + 1
    const slidesPerView = swiper.params.slidesPerView
    const totalSteps = Math.ceil(swiper.slides.length - slidesPerView + 1)

    document.querySelector(".gallery-current").textContent =
      String(current).padStart(2, "0")

    document.querySelector(".gallery-total").textContent =
      String(totalSteps).padStart(2, "0")

    const percent = (current / totalSteps) * 100
    document.querySelector(".gallery-line-fill").style.width = percent + "%"
  }
})

const newsSwiper = new Swiper(".news-swiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  breakpoints: {
    0: { slidesPerView: 1.2 },
    768: { slidesPerView: 2 },
    1200: { slidesPerView: 3 },
  },
})

document.getElementById("year").textContent = new Date().getFullYear()

const projectsSwiper = new Swiper(".projects-swiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  breakpoints: {
    0: { slidesPerView: 1.2 },
    768: { slidesPerView: 2 },
    1200: { slidesPerView: 3 },
  },
})

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header")

  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

const modal = document.querySelector("[data-modal]");
const openModalBtn = document.querySelector("[data-open-modal]");
const closeModalButtons = document.querySelectorAll("[data-close-modal]");

if (modal && openModalBtn) {
  const openModal = () => {
    modal.classList.remove("is-closing");
    modal.classList.add("is-active");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    modal.classList.remove("is-active");
    modal.classList.add("is-closing");

    setTimeout(() => {
      modal.classList.remove("is-closing");
      document.body.classList.remove("modal-open");
    }, 550);
  };

  openModalBtn.addEventListener("click", openModal);

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-active")) {
      closeModal();
    }
  });
}
document.querySelectorAll("[data-open-modal]").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault()
  })
})