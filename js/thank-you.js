(function () {
  var link = document.getElementById('pdf-download-link');
  if (!link) return;
  window.setTimeout(function () {
    link.click();
  }, 400);
})();
