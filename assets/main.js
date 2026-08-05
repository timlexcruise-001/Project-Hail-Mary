// Nav background solidifies once the hero has scrolled past on pages
// with a transparent-start hero; mobile menu toggle; enquiry form submit.

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('siteNav');
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');

  if (nav && nav.dataset.transparentStart === 'true') {
    const toggleNav = () => {
      if (window.scrollY > 80) nav.classList.remove('at-top');
      else nav.classList.add('at-top');
    };
    window.addEventListener('scroll', toggleNav, { passive: true });
    toggleNav();
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  const form = document.getElementById('enquiryForm');
  const statusEl = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      statusEl.className = 'form-status';

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          statusEl.textContent = "Thanks — we've got your enquiry and will reply within 24 hours.";
          statusEl.classList.add('show', 'ok');
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        statusEl.textContent = "Something went wrong sending that. Please try WhatsApp or email us directly below.";
        statusEl.classList.add('show', 'err');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Enquiry';
      }
    });
  }
});
