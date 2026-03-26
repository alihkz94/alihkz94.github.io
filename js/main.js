/*global $, jQuery */
$(document).ready(function() {
  'use strict';

  const path = window.location.pathname.split('/').pop() || 'index.html';

  $('.hamburger').on('click', function(e) {
    e.preventDefault();
    $('.nav-links').slideToggle();
    $(this).toggleClass('active');
  });

  $('.nav-links a').on('click', function() {
    if ($(window).width() < 768) {
      $('.nav-links').slideUp();
      $('.hamburger').removeClass('active');
    }
  });

  $('.nav-links a').each(function() {
    const href = $(this).attr('href');
    if (!href) {
      return;
    }

    const normalizedHref = href.split('#')[0] || 'index.html';
    const normalizedPath = path === '' ? 'index.html' : path;

    if (normalizedHref === normalizedPath) {
      $(this).addClass('active');
    }
  });

  $('a[href^="#"]').on('click', function(e) {
    const target = $(this.getAttribute('href'));
    if (!target.length) {
      return;
    }

    e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: target.offset().top - 80
    }, 500, 'swing');
  });

  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    if (!navbar) {
      return;
    }

    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      navbar.classList.remove('scroll-up');
      return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
      navbar.classList.remove('scroll-up');
      navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
      navbar.classList.remove('scroll-down');
      navbar.classList.add('scroll-up');
    }

    lastScroll = currentScroll;
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section, .page-shell').forEach((el) => {
    observer.observe(el);
  });

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }

  if ($('.popup-img').length) {
    $('.popup-img').magnificPopup({
      type: 'image',
      removalDelay: 300,
      mainClass: 'mfp-with-zoom',
      gallery: { enabled: true },
      zoom: {
        enabled: true,
        duration: 300,
        easing: 'ease-in-out',
        opener: function(openerElement) {
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  }

  if ($('.services-carousel').length) {
    $('.services-carousel').owlCarousel({
      autoplay: true,
      loop: true,
      margin: 20,
      dots: true,
      nav: false,
      responsiveClass: true,
      responsive: { 0: { items: 1 }, 768: { items: 2 }, 900: { items: 4 } }
    });
  }
});