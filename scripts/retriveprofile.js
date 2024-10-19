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

let currentPage=1;
const profilesPerPage = 20; // Number of profiles per page

document.addEventListener("DOMContentLoaded", function () {
  let contributors = [];
  const noProfilesMessage = document.querySelector(".no-profiles-message");
  noProfilesMessage.style.display="none"
  function renderProfiles(filter = "", page=1, profilesPerPage=12) {
  
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

     // Calculate start and end index for pagination
    const startIndex = (page - 1) * profilesPerPage;
    const endIndex = startIndex + profilesPerPage;

    // Slice the filtered contributors based on the current page
    const paginatedContributors = filteredContributors.slice(startIndex, endIndex);

    paginatedContributors.forEach((contributor,index) => {
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
        let masterDiv=document.createElement('p')
        masterDiv.classList='views-likes'
        let div=document.createElement('p')
        div.className="view"
        div.id=contributor.login
        profileRefLikes.on("value", (snapshot) => {
          let isRed=false
          let item=JSON.parse(localStorage.getItem('isLike'))
          if(item&&item.includes(contributor.login)){
            isRed=true
          }
          if (snapshot.exists()) {
            div.innerHTML = `<i class="fa fa-heart ${isRed?"like-red":""}"></i> Likes: ${snapshot.val()}`;
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
        masterDiv.appendChild(viewCount)
        masterDiv.appendChild(div)
        card.appendChild(masterDiv);

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
        
          // Call renderProfiles to update the UI
          // renderProfiles();
        });
        
      
      }
    });

    // Update pagination controls
    updatePaginationControls(page, profilesPerPage, filteredContributors.length);


  }

  function updatePaginationControls(currentPage, profilesPerPage, totalProfiles) {
    const totalPages = Math.ceil(totalProfiles / profilesPerPage);
    const pageInfo = document.getElementById("page-info");
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  
    // Disable previous button if on the first page
    document.getElementById("prev-page").disabled = currentPage === 1;
  
    // Disable next button if on the last page
    document.getElementById("next-page").disabled = currentPage === totalPages;
  }

  document.getElementById("prev-page").addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      renderProfiles("", currentPage, profilesPerPage);
    }
  });
  
  document.getElementById("next-page").addEventListener("click", function () {
    currentPage++;
    renderProfiles("", currentPage, profilesPerPage);
  });

  // Fetch contributors data
  fetch("https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/.all-contributorsrc")
    .then((response) => response.json())
    .then((data) => {
      contributors = data.contributors;
      renderProfiles("", 1, profilesPerPage); //Start on page one
    });

  // Add event listener to the search bar
  const searchBar = document.querySelector(".search-input");
  searchBar.addEventListener("input", () => {
    renderProfiles(searchBar.value);
  });
  searchBar.addEventListener("click", () => {
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
  contributors.forEach((contributor,index) => {
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
      let masterDiv=document.createElement('p')
      masterDiv.classList='views-likes'
      let div=document.createElement('p')
      div.className="view"
      div.id=contributor.login
      profileRefLikes.on("value", (snapshot) => {
        let isRed=false
        let item=JSON.parse(localStorage.getItem('isLike'))
        if(item&&item.includes(contributor.login)){
          isRed=true
        }
        if (snapshot.exists()) {
          div.innerHTML = `<i class="fa fa-heart ${isRed?"like-red":""}"></i> Likes: ${snapshot.val()}`;
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
      masterDiv.appendChild(viewCount)
      masterDiv.appendChild(div)
      card.appendChild(masterDiv);

      card.classList.add("profile-card");

      container.appendChild(card);
      div.addEventListener('click', (e) => {
        e.preventDefault();  // Prevent the default action
        e.stopPropagation(); // Prevent event bubbling
      
        const targetId = e.target.id;
      
        // Get current 'isLike' list from LocalStorage
        let item = JSON.parse(localStorage.getItem('isLike')) || [];
      
        if (item.includes(targetId)) {
          // If the target ID is already in the 'isLike' list, remove it
          const idx = item.indexOf(targetId);
          item.splice(idx, 1);
      
          // Update LocalStorage
          if (item.length === 0) {
            localStorage.removeItem('isLike');
          } else {
            localStorage.setItem('isLike', JSON.stringify(item));
          }
          showToast("You UnLiked the Profile","like")
          // Decrement the like count
          profileRefLikes.transaction((currentViews) => (currentViews || 1) - 1);
        } else {
          // If the target ID is not in the 'isLike' list, add it
          item.push(targetId);
          localStorage.setItem('isLike', JSON.stringify(item));
          showToast("You Liked the Profile","like")

          // Increment the like count
          profileRefLikes.transaction((currentViews) => (currentViews || 0) + 1);
        }
      
        // // Call renderProfiles to update the UI
        // renderProfiles();
      });
      
    
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('myModal');
  const caretDown = document.getElementById('caret-down');
  const closeButton = document.getElementById('close-button');
  const views = document.getElementsByClassName('views');

  // Existing code for rendering profiles, pagination, etc.
  // ... (keep all existing functions and code here)

  // Sorting functionality
  Array.from(views).forEach((ele) => {


    ele.addEventListener('click', (e) => {
      close();
      switch (e.target.innerHTML) {
        case "Least Views":
          sortProfiles('views', 'asc');
          break;
        case "Most Views":
          sortProfiles('views', 'desc');
          break;
        case "Least Likes":
          sortProfiles('likes', 'asc');
          break;
        case "Most Likes":
          sortProfiles('likes', 'desc');
          break;
        case "Most Followers":
          sortProfiles('followers', 'desc');
          break;
        case "Least Followers":
          sortProfiles('followers', 'asc');
          break;
        case "Sort by Region":
          sortByRegion();
          break;
      }
    });
  });

  function sortProfiles(criteria, order) {
    fetch("https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/.all-contributorsrc")
      .then((response) => response.json())
      .then((data) => {
        contributors = data.contributors;
        const promises = contributors.map(contributor => 
          fetch(`https://api.github.com/users/${contributor.login}`)
            .then(res => res.json())
            .then(userData => {
              contributor[criteria] = userData[criteria] || 0;
              return contributor;
            })
        );
        
        Promise.all(promises).then(() => {
          contributors.sort((a, b) => order === 'asc' ? a[criteria] - b[criteria] : b[criteria] - a[criteria]);
          renderProfiles("", 1, profilesPerPage);
        });
      });
  }

  function sortByRegion() {
    fetch("https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/.all-contributorsrc")
      .then((response) => response.json())
      .then((data) => {
        contributors = data.contributors;
        const promises = contributors.map(contributor => 
          fetch(`https://api.github.com/users/${contributor.login}`)
            .then(res => res.json())
            .then(userData => {
              contributor.location = userData.location || 'Unknown';
              return contributor;
            })
        );
        
        Promise.all(promises).then(() => {
          contributors.sort((a, b) => a.location.localeCompare(b.location));
          renderProfiles("", 1, profilesPerPage);
        });
      });
  }

 caretDown.addEventListener('click', (event) => {
    if(modal.style.display=="block"){
      modal.style.display="none"
      return 
    }
    event.stopPropagation(); // Prevents event from bubbling up
    const rect = caretDown.getBoundingClientRect();
    modal.style.display = 'block';
    modal.style.top = `${rect.bottom+30}px`; // Position modal just below the caret-down
    modal.style.left = `${rect.left-170}px`; // Align modal with the caret-down
  });

  let close=() => {
    modal.style.display = 'none';
  };

  // Close the modal if clicked outside of it
  window.onclick = function (event) {
    close()
  };
});

// Function to create and show toast notifications
function showToast(message, type) {
  const toastContainer = document.getElementById('toast-container');

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast ${type} show`;
  toast.textContent = message;

  // Add close button
  const closeBtn = document.createElement('span');
  let line=document.createElement('div')
  closeBtn.className = 'close-btn';
  closeBtn.textContent = '×';
  closeBtn.onclick = () => {
    toast.remove();
  };
  line.className="line"
  toast.appendChild(closeBtn);
  toastContainer.appendChild(line)
  // Append toast to container
  toastContainer.appendChild(toast);

  // Remove toast after a delay
  setTimeout(() => {
    toast.classList.remove('show');
    toastContainer.removeChild(line)
  }, 3000);
}


// ... (keep existing code) ...

let currentFilters = {
  skills: [],
  role: ""
};

function renderProfiles(filter = "", page = 1, profilesPerPage = 12) {
  const container = document.querySelector(".profiles");
  container.innerHTML = "";
  const noProfilesMessage = document.querySelector(".no-profiles-message");

  const filteredContributors = contributors.filter(contributor => {
    const nameMatch = contributor.login.toLowerCase().includes(filter.toLowerCase());
    const skillMatch = currentFilters.skills.length === 0 || 
      currentFilters.skills.some(skill => contributor.skills.includes(skill));
    const roleMatch = !currentFilters.role || contributor.role === currentFilters.role;
    return nameMatch && skillMatch && roleMatch;
  });

  // ... (keep existing pagination logic) ...

  filteredContributors.slice(startIndex, endIndex).forEach((contributor) => {
    // ... (keep existing profile rendering logic) ...

    // Add skill tags to the profile card
    const skillTags = document.createElement("div");
    skillTags.className = "skill-tags";
    contributor.skills.forEach(skill => {
      const tag = document.createElement("span");
      tag.className = "skill-tag";
      tag.textContent = skill;
      tag.addEventListener("click", () => addSkillFilter(skill));
      skillTags.appendChild(tag);
    });
    card.appendChild(skillTags);

    // ... (keep existing code for views and likes) ...
  });

  updatePaginationControls(page, profilesPerPage, filteredContributors.length);
}

function addSkillFilter(skill) {
  if (!currentFilters.skills.includes(skill)) {
    currentFilters.skills.push(skill);
    updateFilterUI();
    renderProfiles();
  }
}

function updateFilterUI() {
  const skillTags = document.querySelector(".skill-tags");
  skillTags.innerHTML = "";
  currentFilters.skills.forEach(skill => {
    const tag = document.createElement("span");
    tag.className = "skill-tag active";
    tag.textContent = skill;
    tag.addEventListener("click", () => removeSkillFilter(skill));
    skillTags.appendChild(tag);
  });
}

function removeSkillFilter(skill) {
  currentFilters.skills = currentFilters.skills.filter(s => s !== skill);
  updateFilterUI();
  renderProfiles();
}

// Add event listener for role filter
document.getElementById("role-filter").addEventListener("change", function() {
  currentFilters.role = this.value;
  renderProfiles();
});

// Add event listener for filter button
document.querySelector(".filter-button").addEventListener("click", function() {
  const filterOptions = document.querySelector(".filter-options");
  filterOptions.style.display = filterOptions.style.display === "none" ? "block" : "none";
});

// ... (keep existing code) ...