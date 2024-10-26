// Firebase configuration
var firebaseConfig = {
  // Add Config Files here 
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

let currentPage = 1;
const profilesPerPage = 18; // Number of profiles per page

document.addEventListener("DOMContentLoaded", function () {
  let contributors = [];
  const noProfilesMessage = document.querySelector(".no-profiles-message");
  noProfilesMessage.style.display = "none";

  function renderProfiles(filter = "", page = 1, profilesPerPage = 12) {
    const container = document.querySelector(".profiles");
    container.innerHTML = "";
    const filteredContributors = contributors.filter(contributor =>
      contributor.login.toLowerCase().includes(filter.toLowerCase())
    );
    if (filteredContributors.length === 0) {
      noProfilesMessage.style.display = "block";
      console.log('sdsds')
      return;
    }
    // Calculate start and end index for pagination
    const startIndex = (page - 1) * profilesPerPage;
    const endIndex = startIndex + profilesPerPage;
    // Slice the filtered contributors based on the current page
    const paginatedContributors = filteredContributors.slice(startIndex, endIndex);
    paginatedContributors.forEach((contributor, index) => {
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
        const profileRefLikes = firebase.database().ref(`profiles/${contributor.login}/likes`);
        profileRef.on("value", (snapshot) => {
          if (snapshot.exists()) {
            viewCount.innerHTML = `<i class="fa fa-eye"></i> Views: ${snapshot.val()}`;
          } else {
            // Handle new profile
            profileRef.set(0);
            viewCount.innerHTML = '<i class="fa fa-eye"></i> Views: 0';
          }
        });
        let masterDiv = document.createElement('p');
        masterDiv.classList = 'views-likes';
        let div = document.createElement('p');
        div.className = "view";
        div.id = contributor.login;
        profileRefLikes.on("value", (snapshot) => {
          let isRed = false;
          let item = JSON.parse(localStorage.getItem('isLike'));
          if (item && item.includes(contributor.login)) {
            isRed = true;
          }
          if (snapshot.exists()) {
            div.innerHTML = `<i class="fa fa-heart ${isRed ? "like-red" : ""}"></i> Likes: ${snapshot.val()}`;
          } else {
            // Handle new profile
            profileRef.set(0);
            div.innerHTML = '<i class="fa fa-heart"></i> Likes: 0';
          }
        });
        // Increment view count on click
        card.addEventListener("click", (e) => {
          e.preventDefault();
          const viewedProfiles = JSON.parse(localStorage.getItem('viewedProfiles')) || [];
          if (!viewedProfiles.includes(contributor.login)) {
            // Increment view count
            profileRef.transaction((currentViews) => (currentViews || 0) + 1).then(() => {
              // Mark the profile as viewed in localStorage
              viewedProfiles.push(contributor.login);
              localStorage.setItem('viewedProfiles', JSON.stringify(viewedProfiles));
              // Open the profile in a new tab
              window.open(card.href, "_blank");
            });
          } else {
            // If the profile has been viewed, just open it in a new tab
            window.open(card.href, "_blank");
          }
        });
        card.appendChild(imgContainer);
        card.appendChild(name);
        masterDiv.appendChild(viewCount);
        masterDiv.appendChild(div);
        card.appendChild(masterDiv);
        // Add social sharing buttons
        const shareContainer = document.createElement('div');
        shareContainer.className = 'social-share';
        shareContainer.innerHTML = `
          <a href="#" class="share-btn main-share-btn" aria-label="Share">
            <i class="fas fa-share-alt"></i>
          </a>
          <div class="share-icons">
            <a href="#" class="share-btn" data-platform="twitter" aria-label="Share on Twitter">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="share-btn" data-platform="whatsapp" aria-label="Share on WhatsApp">
              <i class="fab fa-whatsapp"></i>
            </a>
            <a href="#" class="share-btn" data-platform="linkedin" aria-label="Share on LinkedIn">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="#" class="share-btn" data-platform="instagram" aria-label="Share on Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="share-btn" data-platform="github" aria-label="Share on GitHub">
              <i class="fab fa-github"></i>
            </a>
          </div>
        `;
        card.appendChild(shareContainer);
        card.classList.add("profile-card");
        container.appendChild(card);
        div.addEventListener('click', (e) => {
          e.preventDefault();  // Prevent the default action
          e.stopPropagation(); // Prevent event bubbling
          const targetId = div.id;  // Use div.id for the profile ID
          const heartIcon = div.querySelector(".fa-heart");
          // Get current 'isLike' list from LocalStorage
          let likedProfiles = JSON.parse(localStorage.getItem('isLike')) || [];
          if (likedProfiles.includes(targetId)) {
            // If already liked, unlike it (remove from localStorage and decrement count)
            likedProfiles = likedProfiles.filter(id => id !== targetId);
            localStorage.setItem('isLike', JSON.stringify(likedProfiles));
            showToast("You Unliked the Profile", "like");
            // Change the heart icon color back and decrement the like count
            heartIcon.classList.remove("like-red");
            profileRefLikes.transaction((currentLikes) => (currentLikes || 1) - 1);
          } else {
            // If not liked yet, like it (add to localStorage and increment count)
            likedProfiles.push(targetId);
            localStorage.setItem('isLike', JSON.stringify(likedProfiles));
            showToast("You Liked the Profile", "like");
            // Change the heart icon color to red and increment the like count
            heartIcon.classList.add("like-red");
            profileRefLikes.transaction((currentLikes) => (currentLikes || 0) + 1);
          }
        });

        // Add event listeners for social sharing buttons
        const shareButtons = shareContainer.querySelectorAll('.share-btn');
        shareButtons.forEach(button => {
          button.addEventListener('click', function (event) {
            event.preventDefault();
            const platform = this.getAttribute('data-platform');
            const url = card.href;
            const text = `Check out this awesome GitHub profile: ${contributor.login}`;

            let shareUrl = '';

            switch (platform) {
              case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                break;
              case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
                break;
              case 'linkedin':
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
                break;
              case 'instagram':
                // Instagram does not support direct URL sharing, so we can just open the profile page
                shareUrl = `https://www.instagram.com/`;
                break;
              case 'github':
                shareUrl = `https://github.com/${contributor.login}`;
                break;
            }

            window.open(shareUrl, '_blank', 'width=600,height=400');
          });
        });
      }
    });
    // Update pagination controls
    updatePaginationControls(page, profilesPerPage, filteredContributors.length);
  }

  // Fetch contributors data
  fetch("https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/.all-contributorsrc")
    .then((response) => response.json())
    .then((data) => {
      contributors = data.contributors;
      renderProfiles();
    });

  // Add event listeners for pagination
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProfiles("", currentPage, profilesPerPage);
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    currentPage++;
    renderProfiles("", currentPage, profilesPerPage);
  });

  // Add event listener for search
  document.getElementById("search-input").addEventListener("input", (event) => {
    const filter = event.target.value;
    renderProfiles(filter, 1, profilesPerPage);
  });
});