(function () {
  var form = document.getElementById('mc-embedded-subscribe-form');
  if (!form) return;

  var successNote = document.getElementById('mce-success-response');
  var errorNote = document.getElementById('mce-error-response');
  var submitBtn = document.getElementById('mc-embedded-subscribe');

  function showResponse(el, message) {
    [successNote, errorNote].forEach(function (n) {
      if (n) n.hidden = true;
    });
    if (el) {
      el.textContent = message;
      el.hidden = false;
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (submitBtn) submitBtn.disabled = true;

    var action = form.action.replace('/post?', '/post-json?');
    var params = new URLSearchParams(new FormData(form));
    var callbackName = 'mcSignupCallback' + Date.now();
    var script = document.createElement('script');
    var settled = false;

    function cleanup() {
      clearTimeout(timeoutId);
      try { delete window[callbackName]; } catch (err) { window[callbackName] = undefined; }
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    function fail(message) {
      if (settled) return;
      settled = true;
      cleanup();
      showResponse(errorNote, message);
      if (submitBtn) submitBtn.disabled = false;
    }

    var timeoutId = setTimeout(function () {
      fail('Something went wrong submitting the form. Please try again, or email tanya@tipt.com.au directly.');
    }, 10000);

    window[callbackName] = function (data) {
      if (settled) return;
      settled = true;
      cleanup();
      if (data && data.result === 'success') {
        window.location.href = 'thank-you.html';
      } else {
        var msg = (data && data.msg) ? data.msg.replace(/<[^>]*>/g, '') : 'Something went wrong. Please try again.';
        showResponse(errorNote, msg);
        if (submitBtn) submitBtn.disabled = false;
      }
    };

    script.src = action + '&' + params.toString() + '&c=' + callbackName;
    script.onerror = function () {
      fail('Something went wrong submitting the form. Please try again, or email tanya@tipt.com.au directly.');
    };
    document.body.appendChild(script);
  });
})();
