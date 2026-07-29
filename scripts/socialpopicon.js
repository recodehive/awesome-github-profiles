  const socialToggleBtn = document.getElementById('socialToggleBtn');
  const socialPopup = document.getElementById('socialPopup');

  // Show toggle button on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
      socialPopup.classList.remove('show');
    }
  });

  // Toggle popup
  socialToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent closing when clicking button
    socialPopup.classList.toggle('show');
  });

  // Close popup if clicked outside
  document.addEventListener('click', (e) => {
    if (!socialPopup.contains(e.target) && !socialToggleBtn.contains(e.target)) {
      socialPopup.classList.remove('show');
    }
  });
