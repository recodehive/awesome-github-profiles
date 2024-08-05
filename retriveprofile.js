document.addEventListener("DOMContentLoaded", function () {
  let contributors = [];

  function renderProfiles(filter = "") {
    const container = document.querySelector(".profiles");
    container.innerHTML = "";
    contributors.forEach((contributor) => {
      if (contributor.login.toLowerCase().includes(filter.toLowerCase())) {
        const card = document.createElement("a");
        card.href = `https://github.com/${contributor.login}`;
        card.className = "profile";
        card.target = "_blank";

        // Create the div container for the img element
        const imgContainer = document.createElement("div");
        imgContainer.className = "img-container"; // Add a class for styling

        const img = document.createElement("img");
        const screenshotSrc = `https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/screenshots/${contributor.login}.png`;
        img.src = screenshotSrc;
        img.alt = `Avatar of ${contributor.login}`;
        img.className = "profile-img"; // Add a class for the img

        // Check if the image is from the specific source
        if (img.src === screenshotSrc) {
          imgContainer.classList.add("scroll-on-hover"); // Add a specific class for scroll on hover
        }

        // Fallback to avatar_url if the screenshot is not found
        img.onerror = function () {
          img.src = contributor.avatar_url;
          imgContainer.classList.remove("scroll-on-hover"); // Remove the scroll-on-hover class if fallback image is used
        };

        // Append the img to the imgContainer
        imgContainer.appendChild(img);

        const name = document.createElement("p");
        name.textContent = contributor.login;

        // Append the imgContainer and name to the card
        card.appendChild(imgContainer);
        card.appendChild(name);

        container.appendChild(card);
      }
    });
  }

  fetch("https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/.all-contributorsrc")
    .then((response) => response.json())
    .then((data) => {
      contributors = data.contributors;
      renderProfiles();
    });

  const searchBar = document.querySelector(".search-input");
  searchBar.addEventListener("input", () => {
    renderProfiles(searchBar.value);
  });
});
