// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBEBhBv7AcPhmWS1JwfXijBEarDjsz16xM",
  authDomain: "lupo-7ba5f.firebaseapp.com",
  databaseURL: "https://lupo-7ba5f-default-rtdb.firebaseio.com",
  projectId: "lupo-7ba5f",
  storageBucket: "lupo-7ba5f.appspot.com",
  messagingSenderId: "418172032930",
  appId: "1:418172032930:web:b28842c67139e5c0e6c4fb",
  measurementId: "G-1NVNFSWR1M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Wait for the DOM to load
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
        viewCount.innerHTML = '<i class="fa fa-eye"></i> <span>Views: Loading...</span>'; // Placeholder text

        // Retrieve and listen to view count from Firebase
        const profileRef = firebase.database().ref(`profiles/${contributor.login}/views`);
        profileRef.on("value", (snapshot) => {
          if (snapshot.exists()) {
            viewCount.innerHTML = `<i class="fa fa-eye"></i> <span>Views: ${snapshot.val()} </span>`;
          } else {
            // Handle new profile
            profileRef.set(0);
            viewCount.innerHTML = '<i class="fa fa-eye"></i><span> Views: 0 </span>';
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
