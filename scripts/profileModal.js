document.addEventListener("DOMContentLoaded", function() {
    // Get modal element
    const profileModal = document.getElementById("profileModal");

    // Get close button
    const closeModal = document.getElementById("closeModal");

    // Function to check if modal has already been shown
    function checkModal() {
        return localStorage.getItem("modalShown") === "true";
    }

    // Function to show the modal
    function showModal() {
        if (!checkModal()) {
            profileModal.style.display = "block"; // Show the modal
        }
    }

    // Function to hide the modal
    function hideModal() {
        profileModal.style.display = "none"; // Hide the modal
        localStorage.setItem("modalShown", "true"); // Set item in local storage
    }

    // Clear local storage item on page refresh
    localStorage.removeItem("modalShown");

    // Function to check if user has reached near the bottom
    function checkIfBottom() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;

        // If user has scrolled to the bottom or near the bottom (e.g., 100px from the bottom)
        if (pageHeight - scrollPosition < 100) {
            showModal();
            window.removeEventListener("scroll", checkIfBottom); // Remove listener after showing modal
        }
    }

    // Add scroll event listener to detect if user reaches near the bottom of the page
    window.addEventListener("scroll", checkIfBottom);

    // Close modal when the close button is clicked
    closeModal.onclick = hideModal;

    // Close modal when clicking outside of the modal content
    window.onclick = function(event) {
        if (event.target === profileModal) {
            hideModal();
        }
    };
});
