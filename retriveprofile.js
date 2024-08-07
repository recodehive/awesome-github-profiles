// Firebase configuration
var firebaseConfig = {
//Add Config Files here 
  apiKey: "AIzaSyBSiO9d5tHuyyAeUCt37pxDWTT7jPSigaU",
  authDomain: "awesome-github-profiles.firebaseapp.com",
  databaseURL: "https://awesome-github-profiles-default-rtdb.firebaseio.com",
  projectId: "awesome-github-profiles",
  storageBucket: "awesome-github-profiles.appspot.com",
  messagingSenderId: "490821849262",
  appId: "1:490821849262:web:7e97984d98f578b81f9d3f",
  measurementId: "G-WM33JZYEV0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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

        const viewCount = document.createElement("p");
        viewCount.className = "view-count";
        viewCount.innerHTML = '<i class="fa fa-eye"></i> Views: Loading...'; // Placeholder text

        // Retrieve and listen to view count from Firebase
        const profileRef = firebase.database().ref(`profiles/${contributor.login}/views`);
        profileRef.on("value", (snapshot) => {
          if (snapshot.exists()) {
            viewCount.innerHTML = `<i class="fa fa-eye"></i> Views: ${snapshot.val()}`;
          } else {
            // Handle new profile
            profileRef.set(0);
            viewCount.innerHTML = '<i class="fa fa-eye"></i> Views: 0';
          }
        });

        // Increment view count on click
        card.addEventListener("click", (e) => {
          e.preventDefault();
          profileRef.transaction((currentViews) => {
            return (currentViews || 0) + 1;
          }).then(() => {
            window.open(card.href, "_blank");
          });
        });

        card.appendChild(imgContainer);
        card.appendChild(name);
        card.appendChild(viewCount);
        card.classList.add("profile-card");

        container.appendChild(card);
      }
    });
  }

  // Fetch contributors data
  fetch("https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/.all-contributorsrc")
    .then((response) => response.json())
    .then((data) => {
      contributors = data.contributors;
      renderProfiles();
    });

  // Add event listener to the search bar
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
