/**
* Template Name: OnePage
* Updated: Jan 29 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/onepage-multipurpose-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

/*form*
let userData = {};

  function showForm() {
    document.getElementById('form-container').style.display = 'block';
  }

  function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    userData = { name, email };

    // Hide form and show map
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('map-container').style.display = 'block';

    // Display map with the location
    displayMap();
  }

  function displayMap() {
    const mapContainer = document.getElementById('map');
    const iframe = document.createElement('iframe');

    iframe.style.border = '0';
    iframe.style.width = '100%';
    iframe.style.height = '270px';
    iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4045.0545138915286!2d77.64316999534576!3d12.891723646688373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1526dc247ba9%3A0xebdd6b6714bfaabc!2sBHIVE%20Workspace%2C%20HSR%20Campus!5e0!3m2!1sen!2sin!4v1701104636158!5m2!1sen!2sin';
    iframe.frameBorder = '0';
    iframe.allowfullscreen = true;

    mapContainer.appendChild(iframe);
  }

  // Check if user details are stored in userData
  if (Object.keys(userData).length === 0) {
    // If details do not exist, show the form
    showForm();
  } else {
    // Otherwise, show the map with the location
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('map-container').style.display = 'block';
    displayMap();
  }
  //gtb*
  // Create a button element
var getStartedButton = document.createElement('button');
getStartedButton.id = 'getStartedButton';
getStartedButton.textContent = 'Get Started';

// Append the button to the body of the HTML document
document.body.appendChild(getStartedButton);

// Add a click event listener to the button
getStartedButton.addEventListener('click', function() {
    // Open the Google Form URL in a new tab
    window.open('https://forms.gle/zcXM6YwiU4bwxmy1A', '_blank');
});

  
  /*get started button*/
// document.getElementById('getStartedButton').addEventListener('click', function () {
//   // Redirect to the Google Form URL after clicking the button
//   window.location.href = 'https://forms.gle/zcXM6YwiU4bwxmy1A';
// });
/*map*
document.getElementById('getStartedButtonn').addEventListener('click', function() {
  // Replace the iframe source with the Google Map URL
  var mapIframe = document.createElement('iframe');
  mapIframe.setAttribute('src', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4045.0545138915286!2d77.64316999534576!3d12.891723646688373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1526dc247ba9%3A0xebdd6b6714bfaabc!2sBHIVE%20Workspace%2C%20HSR%20Campus!5e0!3m2!1sen!2sin!4v1701104636158!5m2!1sen!2sin');
  mapIframe.setAttribute('width', '600');
  mapIframe.setAttribute('height', '450');
  mapIframe.setAttribute('frameborder', '0');
  mapIframe.setAttribute('style', 'border:0;');
  
  // Clear the existing content and append the new iframe
  document.body.innerHTML = '';
  document.body.appendChild(mapIframe);
});*/

// know more - student card


document.addEventListener('DOMContentLoaded', function () {
  // Add click event listener to 'Know more' button
  const knowMoreBtn = document.querySelector('.know-more-btn');
  if (knowMoreBtn) {
    knowMoreBtn.addEventListener('click', function () {
      const targetSection = document.querySelector(this.getAttribute('data-href'));
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});




document.getElementById('getStartedButtonn').addEventListener('click', function () {
  // Redirect to the Google Form URL after clicking the button
  window.location.href = 'https://forms.gle/zcXM6YwiU4bwxmy1A';
})

document.getElementById('getStartedButtonn1').addEventListener('click', function () {
  // Redirect to the Google Form URL after clicking the button
  window.location.href = 'https://forms.gle/zcXM6YwiU4bwxmy1A';
})

document.getElementById('getStartedButtonn2').addEventListener('click', function () {
  // Redirect to the Google Form URL after clicking the button
  window.location.href = 'https://forms.gle/zcXM6YwiU4bwxmy1A';
})

/*get started button*/
document.getElementById('getStartedButtoon').addEventListener('click', function () {
  // Redirect to the Google Form URL after clicking the button
  window.location.href = 'https://forms.gle/zcXM6YwiU4bwxmy1A';
});