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
    var note = document.querySelector('.form-note:not(.form-error)');
    var errorNote = document.querySelector('.form-note.form-error');
    var submitBtn = form.querySelector('button[type="submit"]');

    var TOPIC_LABELS = {
      'leading-psychological-safety-in-times-of-change': 'Leading Psychological Safety in Times of Change',
      'building-psychological-safety-brick-by-brick': 'Building Psychological Safety Brick by Brick',
      'discover-your-superpower': 'Discover Your Superpower',
      'leading-in-modern-times': 'Leading in Modern Times',
      'what-happens-after-r-u-ok': 'What Happens After "R U OK?"'
    };

    var topicField = document.getElementById('topic-field');
    var topicSlug = new URLSearchParams(window.location.search).get('topic');
    var topicLabel = topicSlug && TOPIC_LABELS[topicSlug];

    if (topicField && topicLabel) {
      topicField.value = topicSlug;

      var topicNote = document.getElementById('topic-note');
      var topicNoteName = document.getElementById('topic-note-name');
      if (topicNote && topicNoteName) {
        topicNoteName.textContent = topicLabel;
        topicNote.hidden = false;
      }

      var messageField = document.getElementById('message');
      if (messageField && !messageField.value) {
        messageField.value = 'I\'m interested in booking: ' + topicLabel + '\n\n';
      }
    }

    function showNote(el) {
      if (note) note.hidden = true;
      if (errorNote) errorNote.hidden = true;
      if (el) {
        el.hidden = false;
        el.setAttribute('tabindex', '-1');
        el.focus();
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submitBtn) submitBtn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            showNote(note);
            form.reset();
          } else {
            showNote(errorNote);
          }
        })
        .catch(function () {
          showNote(errorNote);
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
})();
