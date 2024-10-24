// Wait until the DOM is fully loaded before executing
document.addEventListener('DOMContentLoaded', () => {

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

  // Toggle password visibility for sign-up form
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    const togglePassword = form.querySelector('#toggle-password');
    const passwordInput = form.querySelector('#password-input');
  
    togglePassword.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.classList.add('fa-lock-open');
        togglePassword.classList.remove('fa-lock');
      } else {
        passwordInput.type = 'password';
        togglePassword.classList.add('fa-lock');
        togglePassword.classList.remove('fa-lock-open');
      }
    });
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