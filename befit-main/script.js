function showLogin() {
    document.getElementById('loginModal').style.display = 'block';
    document.getElementById('signupModal').style.display = 'none';
}

function showSignup() {
    document.getElementById('signupModal').style.display = 'block';
    document.getElementById('loginModal').style.display = 'none';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add login logic here
    window.location.href = 'user.html';
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add signup logic here
    window.location.href = 'user.html';
});

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
}