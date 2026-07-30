document.addEventListener("DOMContentLoaded", () => {
  const github_auth_btn = document.getElementById("gh-auth-btn");

  // GitHub Authentication Setup
  const GITHUB_CLIENT_ID = "Ov23liz64bw3989HVcKK";
  const BACKEND_URL = "http://localhost:3000";

  // GitHub button click handler
  const initiateGitHubAuth = () => {
    const authUrl = new URL('https://github.com/login/oauth/authorize');
    authUrl.searchParams.append('client_id', GITHUB_CLIENT_ID);
    authUrl.searchParams.append('scope', 'user');
    // Add parameters to force authorization screen
    authUrl.searchParams.append('prompt', 'consent');
    // Clear any existing sessions
    authUrl.searchParams.append('login', '');
    window.location.href = authUrl.toString();
  };

  github_auth_btn.onclick = initiateGitHubAuth;
  
  // GitHub auth handler
  const handleGitHubAuth = () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    
    if (code) {
      getGhUser(code);
    }
  };

  // Get GitHub user data
  const getGhUser = (code) => {
    fetch(`${BACKEND_URL}/api/auth/github?code=${code}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(response => {
        if (!response.data || !response.data.access_token) {
          throw new Error('No access token received');
        }
        
        const token = response.data.access_token;
        
        return fetch(`${BACKEND_URL}/api/auth/github/getUser`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(response => {
        if (!response.user) {
          throw new Error('No user data received');
        }
        
        const { name, email } = response.user;
        localStorage.setItem('user-info', JSON.stringify({ name, email }));
        localStorage.setItem('isLoggedIn', 'true');
      
        // Clean up URL
        const cleanUrl = window.location.href.split('?')[0];
        window.history.replaceState({}, '', cleanUrl);
        
        // Redirect to home page
        window.location.href = "/";
      })
      .catch(error => {
        console.error("Authentication error:", error);
        alert("Failed to authenticate with GitHub. Please try again.");
      });
  };

  // Handle GitHub auth on page load
  if (window.location.search.includes("code")) {
    handleGitHubAuth();
  }
});