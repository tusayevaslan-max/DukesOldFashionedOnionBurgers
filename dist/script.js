document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var toggle = document.getElementById('nav-toggle');
  var header = document.getElementById('site-header');
  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.querySelectorAll('.main-nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var jobForm = document.getElementById('job-application-form');
  if (jobForm) {
    jobForm.addEventListener('submit', function (event) {
      if (!jobForm.checkValidity()) {
        return;
      }

      event.preventDefault();

      var formData = new FormData(jobForm);
      var applicationLines = [];
      formData.forEach(function (value, key) {
        var cleanedValue = String(value).trim();
        if (cleanedValue) {
          applicationLines.push(key + ': ' + cleanedValue);
        }
      });

      var recipient = jobForm.getAttribute('data-application-email');
      var emailQuery = new URLSearchParams({
        subject: "Duke's job application",
        body: applicationLines.join('\n')
      });

      window.location.href = 'mailto:' + recipient + '?' + emailQuery.toString();
    });
  }
});
