(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.primary-nav');
  var backdrop = document.querySelector('.nav-backdrop');

  function closeNav() {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  }

  function openNav() {
    toggle.setAttribute('aria-expanded', 'true');
    nav.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    document.body.classList.add('nav-open');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closeNav();
      } else {
        openNav();
      }
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.matchMedia('(max-width: 860px)').matches) closeNav();
      });
    });

    if (backdrop) backdrop.addEventListener('click', closeNav);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeNav();
        toggle.focus();
      }
    });
  }

  var form = document.querySelector('.contact-form');
  if (form) {
    var note = document.querySelector('.form-note');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (note) {
        note.hidden = false;
        note.setAttribute('tabindex', '-1');
        note.focus();
      }
      form.reset();
    });
  }
})();
