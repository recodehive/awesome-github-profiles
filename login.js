// Wait until the DOM is fully loaded before executing
document.addEventListener('DOMContentLoaded', () => {

  // Toggle password visibility for both sign-in and sign-up forms
  const togglePasswordIcons = document.querySelectorAll('.toggle-password');

  togglePasswordIcons.forEach(iconWrapper => {
    iconWrapper.addEventListener('click', function () {
      const passwordField = this.previousElementSibling;
      const icon = this.querySelector('i');

      // Toggle password visibility
      const isPasswordVisible = passwordField.type === 'password';
      passwordField.type = isPasswordVisible ? 'text' : 'password';

      // Toggle icon between eye and eye-slash
      icon.classList.toggle('fa-eye', !isPasswordVisible);
      icon.classList.toggle('fa-eye-slash', isPasswordVisible);
    });
  });

  // Toggle between sign-in and sign-up mode
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");

  sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });

  sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
  });

  // Sign-in form submission
  document.querySelector(".sign-in-form").addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the input values
    const username = document.querySelector(".sign-in-form input[type='text']").value;
    const password = document.querySelector(".sign-in-form input[type='password']").value;

    // Dummy login logic for demo purposes
    if (username === 'admin' && password === 'password') {
      alert('Login successful!');
      // Redirect to dashboard page
      window.location.href = 'index.html';
    } else {
      alert('Invalid username or password');
    }
  });

  // Sign-up form submission
  document.querySelector(".sign-up-form").addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the input values
    const username = document.querySelector(".sign-up-form input[type='text']").value;
    const email = document.querySelector(".sign-up-form input[type='email']").value;
    const password = document.querySelector(".sign-up-form input[type='password']").value;

    if (username === '' || email === '' || password === '') {
      alert('Please fill in all fields');
      return;
    }

    // Dummy signup logic for demo purposes
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('isLoggedIn', 'true');

    alert('Signup successful!');
    // Redirect to dashboard page
    window.location.href = 'index.html';
  });

  // Check password strength for sign-up form
  function checkPasswordStrength() {
    const password = document.querySelector(".sign-up-form input[type='password']").value;
    const strengthWeak = document.getElementById('strength-weak');
    const strengthMedium = document.getElementById('strength-medium');
    const strengthStrong = document.getElementById('strength-strong');

    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    // Reset classes
    strengthWeak.className = '';
    strengthMedium.className = '';
    strengthStrong.className = '';

    // Apply strength classes based on criteria
    if (strength >= 1) strengthWeak.className = 'weak';
    if (strength >= 3) strengthMedium.className = 'medium';
    if (strength >= 5) strengthStrong.className = 'strong';
  }

  // Monitor password input on the sign-up form to check password strength
  document.querySelector(".sign-up-form input[type='password']").addEventListener('input', checkPasswordStrength);

});
