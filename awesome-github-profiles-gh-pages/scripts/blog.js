document.addEventListener("DOMContentLoaded", () => {
    fetch("../blog.json")
      .then((response) => response.json())
      .then((data) => {
        const blogContainer = document.getElementById("blogContainer");
        // Get saved blogs from local storage
        const savedBlogs = JSON.parse(localStorage.getItem("savedBlogs")) || [];
  
        // Render blogs
        data.forEach((blog) => {
          const blogCard = document.createElement("div");
          blogCard.className = "blog-card blog-post";
          blogCard.innerHTML = `
                      <div class="image-wrapper">
                          <img src="${blog.image}" alt="${blog.title}">
                      </div>
                      <div class="blog-card-content">
                          <div class="category">${blog.category}</div>
                          <div class="blogtitle">${blog.title}</div>
                          <div class="meta">
                              <i class="fas fa-user"></i> ${blog.author} · 
                              <i class="fas fa-calendar-alt"></i> ${blog.date} · 
                              <i class="fas fa-comments"></i> ${
                                blog.comments
                              } Comments
                          </div>
                          <div class="excerpt">${blog.excerpt}</div>
                          <div class="blog-save">
                              <a class="read-more" href="${
                                blog.link
                              }">Read More</a>
                              <div class="save-btn">${
                                isBlogSaved(blog)
                                  ? '<i class="fa fa-trash"></i> Unsave Blog'
                                  : '<i class="fa fa-save"></i> Save Blog'
                              }</div>
                          </div>
                      </div>
                  `;
  
          const saveBtn = blogCard.querySelector(".save-btn");
  
          // Check if blog is already saved
          if (isBlogSaved(blog)) {
            saveBtn.classList.add("saved");
          }
  
          saveBtn.addEventListener("click", () => {
            if (isBlogSaved(blog)) {
              unsaveBlog(blog);
              saveBtn.innerHTML = '<i class="fa fa-save"></i> Save Blog';
              saveBtn.classList.remove("saved");
              showToast("Blog Unsaved", "unlike");
            } else {
              saveBlog(blog);
              saveBtn.innerHTML = '<i class="fa fa-trash"></i> Unsave Blog';
              saveBtn.classList.add("saved");
              showToast("Blog Saved For Later", "like");
            }
          });
  
          const imageWrapper = blogCard.querySelector(".image-wrapper");
          const blogTitle = blogCard.querySelector(".blogtitle");
  
          imageWrapper.addEventListener("click", () => {
            window.location.href = blog.link;
          });
  
          blogTitle.addEventListener("click", () => {
            window.location.href = blog.link;
          });
  
          blogContainer.appendChild(blogCard);
        });
  
        // Search functionality
        const searchInput = document.getElementById("search-input");
        const searchButton = document.getElementById("search-btn");
        searchButton.addEventListener("click", () => {
          const query = searchInput.value.toLowerCase();
          const blogPosts = document.querySelectorAll(".blog-post");
  
          blogPosts.forEach((post) => {
            const title = post.querySelector(".blogtitle").innerText.toLowerCase();
            if (title.includes(query)) {
              post.style.display = "block";
            } else {
              post.style.display = "none";
            }
          });
        });
  
        // Search on Enter key press
        searchInput.addEventListener("keyup", (event) => {
          if (event.key === "Enter") {
            searchButton.click();
          }
        });
      })
      .catch((error) => console.error("Error fetching blog data:", error));

    function saveBlog(blog) {
      let savedBlogs = JSON.parse(localStorage.getItem("savedBlogs")) || [];
      if (!savedBlogs.find((b) => b.title === blog.title)) {
        savedBlogs.push(blog);
        localStorage.setItem("savedBlogs", JSON.stringify(savedBlogs));
      }
    }
  
    function unsaveBlog(blog) {
      let savedBlogs = JSON.parse(localStorage.getItem("savedBlogs")) || [];
      savedBlogs = savedBlogs.filter((b) => b.title !== blog.title);
      localStorage.setItem("savedBlogs", JSON.stringify(savedBlogs));
    }
  
    function isBlogSaved(blog) {
      const savedBlogs = JSON.parse(localStorage.getItem("savedBlogs")) || [];
      return savedBlogs.some((b) => b.title === blog.title);
    }

    // Function to create and show toast notifications
    function showToast(message, type) {
      const toastContainer = document.getElementById("toast-container");
      // Create toast element
      const toast = document.createElement("div");
      toast.className = `toast ${type} show`;
      toast.textContent = message;
      // Add close button
      const closeBtn = document.createElement("span");
      closeBtn.className = "close-btn";
      closeBtn.textContent = "×";
      closeBtn.onclick = () => {
        toast.remove();
      };
      toast.appendChild(closeBtn);
      // Append toast to container
      toastContainer.appendChild(toast);
      // Remove toast after a delay
      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    }
});
