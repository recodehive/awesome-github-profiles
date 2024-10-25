document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");

    hamburger.addEventListener("click", function() {
        hamburger.classList.toggle("active");
        if (mobileMenu.classList.contains("show")) {
            mobileMenu.classList.remove("show");
            setTimeout(() => mobileMenu.style.display = "none", 300);
        } else {
            mobileMenu.style.display = "flex";
            setTimeout(() => mobileMenu.classList.add("show"), 10);
        }
    });
});

