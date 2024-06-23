'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click',function(e){
  e.preventDefault();
  section1.scrollIntoView({behavior:'smooth'})
  
})

// Array.from(document.querySelectorAll('.nav__link')).forEach((e)=>{
//     e.addEventListener('click',()=>{
//       console.log(`LINK`);
      
//     })
// })

const operationBtns = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click',(e)=>{
  e.preventDefault();
  if(e.target.classList.contains('operations__tab')){
    const tab = e.target;
    document.querySelector('.operations__tab--active').classList.remove('operations__tab--active');
    document.querySelector('.operations__content--active').classList.remove('operations__content--active');
    const dateTab = tab.getAttribute('data-tab');
    document.querySelector(`.operations__tab--${dateTab}`).classList.add('operations__tab--active'); 
    document.querySelector(`.operations__content--${dateTab}`).classList.add('operations__content--active'); 
  }
  
})

const nav = document.querySelector('.nav');
const navLinksDiv = document.querySelector('.nav__links');
const navLinks = document.querySelectorAll('.nav__link');
function opacityLinks(e){
  const link = e.target;
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('img');
  
  siblings.forEach(e=>{
    if(e != link)
      e.style.opacity = this;
  })
  logo.style.opacity = this;
}

// here event will be automatically passed into the function and 'this' will focus on 0.5 and 1
// .bind() function will return the function with opacity as arguments
navLinks.forEach(e=>{
  e.addEventListener('mouseenter',opacityLinks.bind(0.5))
  e.addEventListener('mouseleave',opacityLinks.bind(1));
});


// Sticky nav
// window.addEventListener('scroll',function(e){
//   console.log(section1.getBoundingClientRect());
  
//   if(section1.getBoundingClientRect().y <=50){
//     document.querySelector('.nav').classList.add('sticky')
//   }
//   else{
//     document.querySelector('.nav').classList.remove('sticky')
//   }
// })

function obsCallback(entries){  
  // entres will be an object with 1 entry, so we will fetch out the first entry
  const [entry] = entries;

  if(entry.isIntersecting === true){
    nav.classList.remove('sticky');
  }
  else{
    nav.classList.add('sticky');
  }

}
const obsOptions = {
  root: null, // means viewport
  threshold: 0 // whenever the intersection is 0% we will have intersection properties
  // the callback function will be called whenever there is 0% intersection once when intersection just happened and other when intersection no longer happen
}
const navStickyObserver = new IntersectionObserver(obsCallback,obsOptions);
const header = document.querySelector('.header');
navStickyObserver.observe(header);


// Adding animation to section when they show up
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver(function(entries){
  const [entry] = entries;
  
  if(entry.isIntersecting == false){
    return;
  } 

  entry.target.classList.remove('section--hidden');
  sectionObserver.unobserve(entry.target);  
},{
  root: null,
  threshold: 0,
})
sections.forEach(e=>sectionObserver.observe(e));



// Image loading
const images = document.querySelectorAll('.features__img');
const imageObserver = new IntersectionObserver(function(entries){
  const [entry] = entries;
  if(entry.isIntersecting == false) return;

  entry.target.setAttribute('src',entry.target.getAttribute('data-src'));
  entry.target.classList.remove('lazy-img')
  imageObserver.unobserve(entry.target);
},{
  root: null,
  threshold: 0.1
})
images.forEach(i=>imageObserver.observe(i));


// Slider
const slides = Array.from(document.querySelectorAll('.slide'));
const slider = document.querySelector('.slider');

const nextSlide = document.querySelector('.slider__btn--right');
const prevSlide = document.querySelector('.slider__btn--left');

const dots = document.querySelector('.dots');
const dotsArray = document.querySelectorAll('.dots__dot');


slides.forEach((slide,i)=>{
  slide.style.transform = `translateX(${i*100}%)`
})
let currSlide = 0;
let maxSlides =slides.length - 1;



function gotToSlide(slides){
  slides.forEach((slide,i) =>{
    slide.style.transform = `translateX(${100*(i-currSlide)}%)`
  })
  document.querySelector('.dots__dot--active').classList.remove('dots__dot--active');
  dotsArray[currSlide].classList.add('dots__dot--active');

}
function nextSlideFunc(){
  if(currSlide === maxSlides){
    currSlide = 0;
  }else{
    currSlide++;
  }

  gotToSlide(slides)

}
dots.addEventListener('click',(e)=>{
  if(e.target.classList.contains('dots__dot')){
    console.log('clicked');
    
    currSlide = +e.target.getAttribute('data-slide');
    gotToSlide(slides);
  }
})
function prevSlideFunc(){
  if(currSlide === 0){
    currSlide = maxSlides;
  }else{
    currSlide--;
  }

  gotToSlide(slides);

}


nextSlide.addEventListener('click',nextSlideFunc);
prevSlide.addEventListener('click',prevSlideFunc);
document.addEventListener('keydown',(e)=>{  
  if(e.key === 'ArrowRight'){
    nextSlideFunc();
  }
  if(e.key === 'ArrowLeft'){
    prevSlideFunc();
  }
})
