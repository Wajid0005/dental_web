/* =========================================
   INDIRA DENTAL CLINIC - JS MAGIC
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // 1. PRELOADER
  const preloader = document.createElement('div');
  preloader.id = 'preloader';
  preloader.innerHTML = '<div class="loader-spinner"></div>';
  document.body.prepend(preloader);

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hide');
      setTimeout(() => preloader.remove(), 600);
    }, 300); // subtle delay for premium feel
  });

  // 2. NAVBAR SCROLL EFFECT
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  // 3. MOBILE MENU
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });
  }

  // 4. ELEGANT SCROLL REVEAL (INTERSECTION OBSERVER)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add a slight stagger if there are multiple reveals close to each other
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach((el, index) => {
    // optional stagger based on dom index for grids
    if(el.parentElement.classList.contains('grid-3') || el.parentElement.classList.contains('gallery-grid')) {
      const siblingIndex = Array.from(el.parentElement.children).indexOf(el);
      el.dataset.delay = siblingIndex * 100; // 100ms stagger
    }
    observer.observe(el);
  });

  // 5. HERO AUTO SLIDER (ONLY FOR HOME PAGE)
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 0) {
    let currentSlide = 0;
    
    // Set first slide active initially
    slides[currentSlide].classList.add('active');

    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 6000); // Change image every 6 seconds
  }

  // 6. GALLERY FILTER (IF PRESENT)
  window.filterGallery = function(cat, btn) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    
    document.querySelectorAll('.gallery-item').forEach(item => {
      // Add subtle scale out animation
      item.style.transform = 'scale(0.95)';
      item.style.opacity = '0';
      
      setTimeout(() => {
        if (cat === 'all' || item.dataset.cat === cat) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.transform = 'scale(1)';
            item.style.opacity = '1';
          }, 50);
        } else {
          item.style.display = 'none';
        }
      }, 300);
    });
  };

  // 7. LIGHTBOX (IF PRESENT)
  window.openLightbox = function(el) {
    const img = el.querySelector('img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    if (img && lightbox && lightboxImg) {
      lightboxImg.src = img.src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };
  
  window.closeLightbox = function(e) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    if (!e || e.target !== lightboxImg) {
      if(lightbox) lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  };
  
  document.addEventListener('keydown', e => { 
    if (e.key === 'Escape') closeLightbox(); 
  });

  // 8. PARALLAX EFFECT FOR IMAGES ON SCROLL
  const parallaxImages = document.querySelectorAll('.parallax-img');
  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY;
    parallaxImages.forEach(img => {
      let speed = img.dataset.speed || 0.15;
      img.style.transform = `translateY(${scrollPos * speed}px)`;
    });
  });

});
