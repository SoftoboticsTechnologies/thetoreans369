/* Toreans Diagnostics – homepage interactions (vanilla JS, no dependencies) */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Booking form configuration.
     The static site has no backend. Leave FORM_ENDPOINT empty to hand the
     booking off to the clinic's existing WhatsApp number; set it to a form
     service URL (e.g. Formspree / Getform / your own API) to POST instead.
     ------------------------------------------------------------------ */
  var FORM_ENDPOINT = '';
  var WHATSAPP_NUMBER = '916287995812';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var desktopNav = window.matchMedia('(min-width: 1140px)');

  /* ---------- Sticky header shadow ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation drawer ---------- */
  var nav = document.getElementById('site-nav');
  var burger = document.querySelector('[data-nav-open]');
  var backdrop = document.querySelector('.nav-backdrop');
  var closeButtons = document.querySelectorAll('[data-nav-close]');

  function openNav() {
    nav.classList.add('is-open');
    backdrop.hidden = false;
    burger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
    var first = nav.querySelector('.nav__close');
    if (first) first.focus();
  }
  function closeNav(returnFocus) {
    if (!nav.classList.contains('is-open')) return;
    nav.classList.remove('is-open');
    backdrop.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
    if (returnFocus) burger.focus();
  }
  burger.addEventListener('click', openNav);
  closeButtons.forEach(function (b) { b.addEventListener('click', function () { closeNav(true); }); });

  // Close the drawer after a link is chosen
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) { closeNav(false); closeSubmenus(); }
  });

  // Trap focus inside the open drawer
  nav.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' || !nav.classList.contains('is-open')) return;
    var focusables = Array.prototype.filter.call(
      nav.querySelectorAll('a[href], button:not([disabled])'),
      function (el) { return el.offsetParent !== null; }
    );
    var first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  desktopNav.addEventListener('change', function (mq) { if (mq.matches) closeNav(false); });

  /* ---------- Dropdown submenus ---------- */
  var toggles = document.querySelectorAll('.nav__toggle');
  function closeSubmenus(except) {
    toggles.forEach(function (t) {
      if (t === except) return;
      t.setAttribute('aria-expanded', 'false');
      t.closest('.nav__item').classList.remove('is-open');
    });
  }
  toggles.forEach(function (t) {
    t.addEventListener('click', function () {
      var item = t.closest('.nav__item');
      var open = t.getAttribute('aria-expanded') !== 'true';
      closeSubmenus(t);
      t.setAttribute('aria-expanded', String(open));
      item.classList.toggle('is-open', open);
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav__item.has-sub')) closeSubmenus();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openToggle = document.querySelector('.nav__toggle[aria-expanded="true"]');
    if (openToggle) { closeSubmenus(); openToggle.focus(); return; }
    closeNav(true);
  });

  /* ---------- Hero background slideshow (fade + Ken Burns, as on the source site) ---------- */
  var hero = document.querySelector('.hero');
  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero__slide'));
  var pauseBtn = document.querySelector('[data-hero-pause]');
  var slideIndex = 0, slideTimer = null, paused = false;
  var SLIDE_MS = 6000;

  function loadSlide(s) {
    var src = s.getAttribute('data-bg');
    if (src) { s.style.backgroundImage = "url('" + src + "')"; s.removeAttribute('data-bg'); }
  }
  function nextSlide() {
    var current = slides[slideIndex];
    slideIndex = (slideIndex + 1) % slides.length;
    var next = slides[slideIndex];
    loadSlide(next);
    // restart Ken Burns on the incoming slide
    next.classList.remove('is-active'); void next.offsetWidth;
    next.classList.add('is-active');
    current.classList.remove('is-active');
    loadSlide(slides[(slideIndex + 1) % slides.length]); // preload the one after
  }
  function startSlides() {
    if (slideTimer || paused || reduceMotion.matches || slides.length < 2) return;
    slideTimer = setInterval(nextSlide, SLIDE_MS);
  }
  function stopSlides() { clearInterval(slideTimer); slideTimer = null; }
  function setPaused(p) {
    paused = p;
    hero.classList.toggle('is-paused', p);
    pauseBtn.setAttribute('aria-label', p ? 'Play background slideshow' : 'Pause background slideshow');
    pauseBtn.querySelector('use').setAttribute('href', p ? '#i-play' : '#i-pause');
    p ? stopSlides() : startSlides();
  }
  if (hero && pauseBtn && slides.length) {
    window.addEventListener('load', function () { loadSlide(slides[1]); startSlides(); });
    pauseBtn.addEventListener('click', function () { setPaused(!paused); });
    document.addEventListener('visibilitychange', function () { document.hidden ? stopSlides() : startSlides(); });
    reduceMotion.addEventListener('change', function (mq) { mq.matches ? stopSlides() : startSlides(); });
  }

  /* ---------- Booking form validation ---------- */
  (function initBookingForm() {
    var form = document.getElementById('book-form');
    if (!form) return;
    var statusEl = form.querySelector('[data-form-status]');
    var noteEl = form.querySelector('[data-form-note]');
    if (FORM_ENDPOINT) noteEl.textContent = 'We will contact you on the number provided to confirm your booking.';

    var rules = {
      'your-name': function (v) {
        if (!v) return 'Please enter your name.';
        if (v.length < 2) return 'Please enter your full name.';
        return '';
      },
      'tel-956': function (v) {
        if (!v) return 'Please enter your phone number.';
        var digits = v.replace(/[\s\-()]/g, '');
        if (!/^\+?\d{10,13}$/.test(digits)) return 'Please enter a valid phone number (10 digits, optionally with +91).';
        return '';
      },
      'Subject': function (v) {
        if (!v) return 'Please tell us which test you would like to book.';
        return '';
      }
    };

    function validateField(input) {
      var msg = rules[input.name](input.value.trim());
      var err = document.getElementById(input.getAttribute('aria-describedby'));
      err.textContent = msg;
      if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
      return !msg;
    }

    Array.prototype.forEach.call(form.querySelectorAll('input'), function (input) {
      input.addEventListener('blur', function () { if (input.value.trim()) validateField(input); });
      input.addEventListener('input', function () { if (input.getAttribute('aria-invalid')) validateField(input); });
    });

    function setStatus(msg, type) {
      statusEl.textContent = msg;
      statusEl.className = 'book-form__status' + (type ? ' is-' + type : '');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      setStatus('', '');
      var inputs = Array.prototype.slice.call(form.querySelectorAll('input'));
      var firstInvalid = null;
      inputs.forEach(function (i) { if (!validateField(i) && !firstInvalid) firstInvalid = i; });
      if (firstInvalid) { firstInvalid.focus(); return; }

      var data = {
        name: form.elements['your-name'].value.trim(),
        number: form.elements['tel-956'].value.trim(),
        subject: form.elements['Subject'].value.trim()
      };

      if (FORM_ENDPOINT) {
        var btn = form.querySelector('[type="submit"]');
        btn.disabled = true;
        fetch(FORM_ENDPOINT, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
          .then(function (r) {
            if (!r.ok) throw new Error(r.status);
            form.reset();
            setStatus('Thank you! Your request has been sent. Our team will contact you shortly.', 'success');
          })
          .catch(function () {
            setStatus('Sorry, your request could not be sent. Please call +91 62879 95812 or use WhatsApp.', 'error');
          })
          .finally(function () { btn.disabled = false; });
        return;
      }

      // No endpoint configured: hand off to the existing WhatsApp booking number.
      var text = 'Hello Toreans Diagnostics, I would like to book a test.\n' +
        'Name: ' + data.name + '\nNumber: ' + data.number + '\nSubject: ' + data.subject;
      var url = 'https://api.whatsapp.com/send?phone=' + WHATSAPP_NUMBER + '&text=' + encodeURIComponent(text);
      // ('noopener' in the features string would make window.open return null, hiding pop-up blocking)
      var win = window.open(url, '_blank');
      if (win) {
        win.opener = null;
        setStatus('WhatsApp has opened with your details. Press send there to complete your booking.', 'success');
      } else {
        setStatus('', '');
        statusEl.innerHTML = '';
        var a = document.createElement('a');
        a.href = url; a.target = '_blank'; a.rel = 'noopener';
        a.textContent = 'Open WhatsApp to send your booking';
        statusEl.appendChild(document.createTextNode('Your browser blocked the pop-up. '));
        statusEl.appendChild(a);
        statusEl.className = 'book-form__status is-error';
      }
    });
  })();

  /* ---------- Article comment forms ----------
     Posts natively to the site's existing WordPress endpoint (wp-comments-post.php), exactly
     as the source pages do; WordPress handles moderation and the confirmation page. This only
     adds client-side validation and the "save my details" option. */
  (function initCommentForms() {
    var STORE_KEY = 'toreans-comment-author';
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var rules = {
      comment: function (v) { return v ? '' : 'Please type your comment.'; },
      author: function (v) { return v ? '' : 'Please enter your name.'; },
      email: function (v) {
        if (!v) return 'Please enter your email address.';
        return emailRe.test(v) ? '' : 'Please enter a valid email address.';
      },
      url: function (v) {
        if (!v) return '';
        try { new URL(/^https?:\/\//i.test(v) ? v : 'http://' + v); return ''; }
        catch (e) { return 'Please enter a valid website address.'; }
      }
    };

    function readSaved() {
      try { return JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); } catch (e) { return null; }
    }
    function writeSaved(data) {
      try { data ? localStorage.setItem(STORE_KEY, JSON.stringify(data)) : localStorage.removeItem(STORE_KEY); } catch (e) { /* storage unavailable */ }
    }

    Array.prototype.forEach.call(document.querySelectorAll('[data-comment-form]'), function (form) {
      var fields = ['comment', 'author', 'email', 'url'].map(function (n) { return form.elements[n]; });
      var consent = form.elements['wp-comment-cookies-consent'];

      var saved = readSaved();
      if (saved) {
        form.elements.author.value = saved.author || '';
        form.elements.email.value = saved.email || '';
        form.elements.url.value = saved.url || '';
        consent.checked = true;
      }

      function check(input) {
        var msg = rules[input.name](input.value.trim());
        var err = document.getElementById(input.id + '-err');
        err.textContent = msg;
        if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
        return !msg;
      }
      fields.forEach(function (input) {
        input.addEventListener('blur', function () { if (input.value.trim()) check(input); });
        input.addEventListener('input', function () { if (input.getAttribute('aria-invalid')) check(input); });
      });

      form.addEventListener('submit', function (e) {
        var firstInvalid = null;
        fields.forEach(function (i) { if (!check(i) && !firstInvalid) firstInvalid = i; });
        if (firstInvalid) { e.preventDefault(); firstInvalid.focus(); return; }
        writeSaved(consent.checked ? {
          author: form.elements.author.value.trim(),
          email: form.elements.email.value.trim(),
          url: form.elements.url.value.trim()
        } : null);
        // valid: let the browser submit to WordPress
      });
    });
  })();

  /* ---------- Keep the floating WhatsApp button off the booking form and the footer's
     bottom bar (where the "Powered by" attribution sits bottom-right) ---------- */
  var waFloat = document.querySelector('.wa-float');
  var waTargets = [document.getElementById('book'), document.querySelector('.footer__bottom')].filter(Boolean);
  if (waFloat && waTargets.length && 'IntersectionObserver' in window) {
    var visible = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target); });
      waFloat.classList.toggle('is-hidden', visible.size > 0);
    }, { threshold: 0.15 });
    waTargets.forEach(function (t) { io.observe(t); });
  }

  /* ---------- Testimonials carousel (scroll-snap + buttons + dots) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-carousel]'), function (root) {
    var track = root.querySelector('[data-carousel-track]');
    var items = Array.prototype.slice.call(track.children);
    var controls = root.querySelector('[data-carousel-controls]');
    var dotsWrap = root.querySelector('[data-carousel-dots]');
    if (items.length < 2) return;
    controls.hidden = false;

    var dots = items.map(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Show testimonial ' + (i + 1) + ' of ' + items.length);
      b.addEventListener('click', function () { go(i); });
      dotsWrap.appendChild(b);
      return b;
    });

    var current = 0;
    function go(i) {
      current = (i + items.length) % items.length;
      track.scrollTo({ left: items[current].offsetLeft - track.offsetLeft, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      mark();
    }
    function mark() {
      dots.forEach(function (d, i) {
        if (i === current) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
      items.forEach(function (it, i) { it.setAttribute('aria-hidden', String(i !== current)); });
    }
    root.querySelector('[data-carousel-prev]').addEventListener('click', function () { go(current - 1); });
    root.querySelector('[data-carousel-next]').addEventListener('click', function () { go(current + 1); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
    });

    // keep state in sync with touch swipes
    var t;
    track.addEventListener('scroll', function () {
      clearTimeout(t);
      t = setTimeout(function () {
        var i = Math.round(track.scrollLeft / track.clientWidth);
        if (i !== current && items[i]) { current = i; mark(); }
      }, 80);
    }, { passive: true });

    mark();
  });
})();
