document.addEventListener("DOMContentLoaded", () => {
  // Toggle between sign-in and sign-up mode
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");
  const rememberMeCheckbox = document.getElementById("remember-me");
  const usernameInput = document.querySelector(".sign-in-form input[type='text']");

  // Getting the github sign-up & login buttons
  const github_signIn = document.getElementById("gh-sg-btn");
  const github_login = document.getElementById("gh-lg-btn");

  // Sign up & login mode toggle
  sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });

  sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
  });

  // GitHub Authentication Setup
  const GITHUB_CLIENT_ID = "your_github_client_id";
  const BACKEND_URL = "http://localhost:3000";

  // Handle GitHub OAuth
  const handleGitHubAuth = () => {
    const params = window.location.search;
    const urlParams = new URLSearchParams(params);
    const code = urlParams.get("code");

    if (code) {
      localStorage.setItem("code", code);
      getGhUser();
    }
  };

  // Get GitHub User Data
  const getGhUser = () => {
    let code = localStorage.getItem("code");
    if (!code || code === "null") return;

    fetch(`${BACKEND_URL}/api/auth/github?code=${code}`)
      .then((res) => res.json())
      .then((response) => {
        let resData = response.data;
        let token = new URLSearchParams(resData).get("access_token");
        
        return fetch(`${BACKEND_URL}/api/auth/github/getUser`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      })
      .then((res) => res.json())
      .then((response) => {
        const { name, email } = response.user;
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            name: name,
            email: email,
          })
        );
        localStorage.removeItem("code");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("GitHub auth error:", error);
      });
  };

  // Handle initial auth check
  if (localStorage.getItem("user-info")) {
    window.location.href = "/";
  } else if (localStorage.getItem("code")) {
    getGhUser();
  }

  // GitHub button click handlers
  github_signIn.onclick = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`
    );
  };
  
  github_login.onclick = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`
    );
  };

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return false;

    const [localPart, domainPart] = email.split("@");
    if (localPart.length > 64 || domainPart.length > 255) return false;

    const domainParts = domainPart.split(".");
    if (domainParts.some((part) => part.length > 63)) return false;

    if (localPart.startsWith(".") || localPart.endsWith(".") || localPart.includes("..")) return false;

    return true;
  };

  // Username validation function
  const validateUsername = (username) => {
    const usernamePattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{3,20}$/;
    return usernamePattern.test(username);
  };

  // Sign-in form submission
  document.querySelector(".sign-in-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.querySelector(".sign-in-form input[type='text']").value;
    const password = document.querySelector(".sign-in-form input[type='password']").value;

    if (username === localStorage.getItem("username") && password === localStorage.getItem("password")) {
      if (rememberMeCheckbox.checked) {
        localStorage.setItem("rememberedUsername", username);
      } else {
        localStorage.removeItem("rememberedUsername");
      }
      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      alert("Invalid username or password");
    }
  });

  // Sign-up form submission
  document.querySelector(".sign-up-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.querySelector(".sign-up-form input[type='text']").value;
    const email = document.querySelector(".sign-up-form input[type='email']").value;
    const password = document.querySelector(".sign-up-form input[type='password']").value;
    const gitUsername = document.querySelector(".sign-up-form input[type='text'][placeholder='Git Username']").value;

    if (username === "" || email === "" || password === "" || gitUsername === "") {
      alert("Please fill in all fields");
      return;
    }

    if (!validateUsername(username)) {
      alert("Please enter a valid username (3-20 alphanumeric characters).");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("gitUsername", gitUsername);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("isLoggedIn", "true");
    
    alert("Signup successful!");
    window.location.href = "index.html";
  });

  // Password visibility toggle
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    const togglePassword = form.querySelector("#toggle-password");
    const passwordInput = form.querySelector("#password-input");

    togglePassword?.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.classList.add("fa-lock-open");
        togglePassword.classList.remove("fa-lock");
      } else {
        passwordInput.type = "password";
        togglePassword.classList.add("fa-lock");
        togglePassword.classList.remove("fa-lock-open");
      }
    });
  });

  // Load remembered username if it exists
  if (localStorage.getItem("rememberedUsername")) {
    usernameInput.value = localStorage.getItem("rememberedUsername");
    rememberMeCheckbox.checked = true;
  }
});