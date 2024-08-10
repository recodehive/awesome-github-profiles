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
            img.style.opacity = '1';
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
        
          // Call renderProfiles to update the UI
          // renderProfiles();
        });
        
      
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



document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('myModal');
  const caretDown = document.getElementById('caret-down');
  const closeButton = document.getElementById('close-button');
  const views = document.getElementsByClassName('views');


  Array.from(views).map((ele)=>{
    ele.addEventListener(('click'),(e)=>{
      close()
      if(e.target.innerHTML=="Least Views"){
   
        fetch("https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/.all-contributorsrc")
        .then((response) => response.json())
        .then((data) => {
          contributors = data.contributors;
         contributors.map((data)=>{
           const profileRef = firebase.database().ref(`profiles/${data.login}/views`)
           profileRef.on("value", (snapshot) => {
             if (snapshot.exists()) {
              data['views']=snapshot.val()
            } else {
              // Handle new profile
              profileRef.set(0);
            }
          });
         })
         contributors=contributors.sort((a,b)=>a.views-b.views)
          renderProfiles();
        });
      }else{
        fetch("https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/.all-contributorsrc")
        .then((response) => response.json())
        .then((data) => {
          contributors = data.contributors;
         contributors.map((data)=>{
           const profileRef = firebase.database().ref(`profiles/${data.login}/views`)
           profileRef.on("value", (snapshot) => {
             if (snapshot.exists()) {
              data['views']=snapshot.val()
            } else {
              // Handle new profile
              profileRef.set(0);
            }
          });
         })
         contributors=contributors.sort((a,b)=>b.views-a.views)
          renderProfiles();
        });
      }
    })
  })
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


