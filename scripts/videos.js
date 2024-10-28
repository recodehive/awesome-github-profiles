// Function to highlight the active link based on the current hash
const links = document.querySelectorAll(".nav--link");

function highlightActiveLink() {
    const currentHash = window.location.hash;
    links.forEach((link, id) => {
        if (currentHash === "" && id === 0) {
            link.classList.add("hash--active");
        } else if (link.getAttribute("href") === currentHash) {
            link.classList.add("hash--active");
        } else {
            link.classList.remove("hash--active");
        }
    });
}

window.addEventListener("hashchange", highlightActiveLink);
window.addEventListener("load", highlightActiveLink());