AOS.init({
  delay: 200, // values from 0 to 3000, with step 50ms
  duration: 1500, // values from 0 to 3000, with step 50ms
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
})

// QUERY SELETORS
const submit = document.querySelector('.submit')
const input = document.querySelector('.input')
const required1 = document.querySelector('.require')
const required2 = document.querySelector('.require2')
const required3 = document.querySelector('.require3')
const navUl = document.querySelector('.menu')
const nav = document.querySelector('.header')

;(() => {
  const openNavMenu = document.querySelector('.open-nav-menu'),
    closeNavMenu = document.querySelector('.close-nav-menu'),
    navMenu = document.querySelector('.nav-menu'),
    menuOverlay = document.querySelector('.menu-overlay'),
    mediaSize = 991

  openNavMenu.addEventListener('click', toggleNav)
  closeNavMenu.addEventListener('click', toggleNav)
  // close the navMenu by clicking outside
  menuOverlay.addEventListener('click', toggleNav)

  function toggleNav() {
    navMenu.classList.toggle('open')
    menuOverlay.classList.toggle('active')
    document.body.classList.toggle('hidden-scrolling')
  }

  navMenu.addEventListener('click', (event) => {
    if (
      event.target.hasAttribute('data-toggle') &&
      window.innerWidth <= mediaSize
    ) {
      // prevent default anchor click behavior
      event.preventDefault()
      const menuItemHasChildren = event.target.parentElement
      // if menuItemHasChildren is already expanded, collapse it
      if (menuItemHasChildren.classList.contains('active')) {
        collapseSubMenu()
      } else {
        // collapse existing expanded menuItemHasChildren
        if (navMenu.querySelector('.menu-item-has-children.active')) {
          collapseSubMenu()
        }
        // expand new menuItemHasChildren
        menuItemHasChildren.classList.add('active')
        const subMenu = menuItemHasChildren.querySelector('.sub-menu')
        subMenu.style.maxHeight = subMenu.scrollHeight + 'px'
      }
    }
  })
  function collapseSubMenu() {
    navMenu
      .querySelector('.menu-item-has-children.active .sub-menu')
      .removeAttribute('style')
    navMenu
      .querySelector('.menu-item-has-children.active')
      .classList.remove('active')
  }
  function resizeFix() {
    // if navMenu is open ,close it
    if (navMenu.classList.contains('open')) {
      toggleNav()
    }
    // if menuItemHasChildren is expanded , collapse it
    if (navMenu.querySelector('.menu-item-has-children.active')) {
      collapseSubMenu()
    }
  }

  window.addEventListener('resize', function () {
    if (this.innerWidth > mediaSize) {
      resizeFix()
    }
  })
})()

// Add active class nav on scroll
window.addEventListener('scroll', fixNav)

function fixNav() {
  if (window.scrollY > navUl.offsetHeight + 150) {
    nav.classList.add('active')
  } else {
    nav.classList.remove('active')
  }
}

// Blur Background Image on Scroll
$(window).scroll(function () {
  let scroll = $(window).scrollTop()
  $('.background__image').css({
    filter: 'blur(' + scroll / 30 + 'px)',
  })
})

// Prevent defualt behavior of form submission onclick and display required
function displayRequiredFormData() {
  required1.style.display = 'block'
  required2.style.display = 'block'
  required3.style.display = 'block'
}

submit.onclick = function (e) {
  e.preventDefault()
  if (document.forms['form'].name.value === '') {
    displayRequiredFormData()
  } else if (document.forms['form'].email.value === '') {
    displayRequiredFormData()
  } else if (document.forms['form'].phone.value === '') {
    displayRequiredFormData()
  } else {
    return true
  }
}
