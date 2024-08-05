document.addEventListener("DOMContentLoaded", function () {
  let contributors = [];
  const noProfilesMessage = document.querySelector(".no-profiles-message");
  noProfilesMessage.style.display="none"
  function renderProfiles(filter = "") {
  
    const container = document.querySelector(".profiles");
    container.innerHTML = "";
    const noProfilesMessage = document.querySelector(".no-profiles-message");

    const filteredContributors = contributors.filter(contributor =>
      contributor.login.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredContributors.length === 0) {
      noProfilesMessage.style.display = "block";
      console.log('sdsds')

      return
    } 
    contributors.forEach((contributor) => {
      noProfilesMessage.style.display = "none";

      if (contributor.login.toLowerCase().includes(filter.toLowerCase())) {
        const card = document.createElement("a");
        card.href = `https://github.com/${contributor.login}`;
        card.className = "profile";
        card.target = "_blank";

        const imgContainer = document.createElement("div");
        imgContainer.className = "img-container";

        const img = document.createElement("img");
        const screenshotSrc = `https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/screenshots/${contributor.login}.png`;
        img.src = screenshotSrc;
        img.alt = `Avatar of ${contributor.login}`;
        img.className = "profile-img";

        img.onload = function () {
          if (img.src === screenshotSrc) {
            imgContainer.classList.add("scroll-on-hover");
            imgContainer.dataset.imgHeight = img.naturalHeight;
          }
        };

        img.onerror = function () {
          img.src = contributor.avatar_url;
          imgContainer.classList.remove("scroll-on-hover");
        };

        imgContainer.appendChild(img);

        const name = document.createElement("p");
        name.textContent = contributor.login;

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

document.addEventListener("mouseover", function (e) {
  if (e.target.tagName === "IMG" && e.target.closest(".scroll-on-hover")) {
    const imgContainer = e.target.closest(".img-container");
    const imgHeight = e.target.naturalHeight;
    const containerHeight = imgContainer.clientHeight;

    if (imgHeight > containerHeight) {
      const translateValue = ((imgHeight - containerHeight - 1000) / imgHeight) * 100;
      e.target.style.transform = `translateY(-${translateValue}%)`;
    }
  }
});

document.addEventListener("mouseout", function (e) {
  if (e.target.tagName === "IMG" && e.target.closest(".scroll-on-hover")) {
    e.target.style.transform = "translateY(0)";
  }
});
