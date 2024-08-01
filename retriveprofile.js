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
  
          const img = document.createElement("img");
          img.src = contributor.avatar_url;
          img.alt = `Avatar of ${contributor.login}`;
          img.style.maxWidth = "100%";
          img.style.borderRadius = "10px";
  
          const name = document.createElement("p");
          name.textContent = contributor.login;
  
          card.appendChild(img);
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
  