const slides = document.querySelectorAll(".slide")
const fills = document.querySelectorAll(".fill")
const current = document.getElementById("current")

let index = 0
const duration = 5000

function resetProgress(){
  fills.forEach(f=>{
    f.style.transition = "none"
    f.style.width = "0%"
  })
}

function startProgress(){

  // əvvəlki segmentləri doldur
  fills.forEach((f,i)=>{
    if(i < index){
      f.style.width = "100%"
    }
  })

  // aktiv segment animasiya
  setTimeout(()=>{
    fills[index].style.transition = duration + "ms linear"
    fills[index].style.width = "100%"
  },50)

}

function changeSlide(){

  slides[index].classList.remove("active")

  index++

  if(index >= slides.length){
    index = 0
    resetProgress()   // BURASI BUGU HƏLL EDİR
  }

  slides[index].classList.add("active")

  current.innerText = index + 1

  startProgress()

}

resetProgress()
startProgress()

setInterval(changeSlide, duration)

document.addEventListener("DOMContentLoaded", function(){

const swiper = new Swiper(".services-swiper", {

slidesPerView:3.2,
spaceBetween:30,

navigation:{
nextEl:".gallery-next",
prevEl:".gallery-prev"
},

breakpoints:{
0:{slidesPerView:1.2},
768:{slidesPerView:2},
1200:{slidesPerView:3.2}
},

on:{
init:function(){
updatePagination(this)
},

slideChange:function(){
updatePagination(this)
}

}

})

function updatePagination(swiper){

const current = swiper.realIndex + 1

// aktiv slidesPerView (breakpoint nəzərə alınır)
const slidesPerView = swiper.params.slidesPerView

// maksimum scroll step
const totalSteps = Math.ceil(swiper.slides.length - slidesPerView + 1)

document.querySelector(".gallery-current").textContent =
String(current).padStart(2,"0")

document.querySelector(".gallery-total").textContent =
String(totalSteps).padStart(2,"0")

const percent = (current / totalSteps) * 100

document.querySelector(".gallery-line-fill").style.width =
percent + "%"

}

})
const newsSwiper = new Swiper(".news-swiper", {

slidesPerView:3,
spaceBetween:30,

breakpoints:{
0:{slidesPerView:1.2},
768:{slidesPerView:2},
1200:{slidesPerView:3}
}

});

document.getElementById("year").textContent = new Date().getFullYear();

const projectsSwiper = new Swiper(".projects-swiper",{

slidesPerView:3,
spaceBetween:30,

breakpoints:{
0:{slidesPerView:1.2},
768:{slidesPerView:2},
1200:{slidesPerView:3}
}

});

window.addEventListener("scroll", function () {

const header = document.querySelector(".header")

if (window.scrollY > 50) {
header.classList.add("scrolled")
} 
else {
header.classList.remove("scrolled")
}

})