(() => {
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.getElementById('primary-navigation');
  const body = document.body;

  const closeNav = () => {
    body.classList.remove('nav-open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
    }
  };

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeNav();
      }
    });
  }

  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const searchParams = new URLSearchParams(window.location.search);
  const netlifyForms = document.querySelectorAll('form[data-netlify="true"]');

  netlifyForms.forEach((form) => {
    const successMessage = form.querySelector('[data-success-message]');
    const formName = form.getAttribute('name') || '';

    if (successMessage) {
      successMessage.hidden = true;
      if (!successMessage.hasAttribute('role')) {
        successMessage.setAttribute('role', 'status');
      }
      if (!successMessage.hasAttribute('aria-live')) {
        successMessage.setAttribute('aria-live', 'polite');
      }
      successMessage.dataset.defaultText = successMessage.textContent.trim();

      const submittedParam = searchParams.get('submitted');
      if (submittedParam && submittedParam === formName) {
        successMessage.hidden = false;
      }
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const submitButton = form.querySelector('[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
      }

      const formData = new FormData(form);
      if (!formData.get('form-name')) {
        formData.set('form-name', formName || 'form');
      }

      const endpoint = form.getAttribute('action') || '/';

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString(),
        });

        if (!response.ok) {
          throw new Error('Form submission failed');
        }

        form.reset();

        if (successMessage) {
          successMessage.textContent = successMessage.dataset.defaultText || successMessage.textContent;
          successMessage.hidden = false;
          if (typeof successMessage.focus === 'function') {
            successMessage.focus({ preventScroll: false });
          }
        }
      } catch (error) {
        if (successMessage) {
          successMessage.textContent = successMessage.dataset.errorMessage ||
            'We were unable to submit your request. Please email info@monthavencapital.com.';
          successMessage.hidden = false;
          if (typeof successMessage.focus === 'function') {
            successMessage.focus({ preventScroll: false });
          }
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
        }
      }
    });
  });
})();
