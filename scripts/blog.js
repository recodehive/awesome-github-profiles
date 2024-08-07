document.addEventListener("DOMContentLoaded", () => {
    fetch('blog.json')
        .then(response => response.json())
        .then(data => {
            const blogContainer = document.getElementById('blogContainer');
            data.forEach(blog => {
                const blogCard = document.createElement('div');
                blogCard.className = 'blog-card';
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
                            <i class="fas fa-comments"></i> ${blog.comments} Comments
                        </div>
                        <div class="excerpt">${blog.excerpt}</div>
                        <a class="read-more" href="${blog.link}">Read More</a>
                    </div>
                `;

               
                const imageWrapper = blogCard.querySelector('.image-wrapper');
                const blogTitle = blogCard.querySelector('.blogtitle');
                
                imageWrapper.addEventListener('click', () => {
                    window.location.href = blog.link;
                });

                blogTitle.addEventListener('click', () => {
                    window.location.href = blog.link;
                });

                blogContainer.appendChild(blogCard);
            });
        })
        .catch(error => console.error('Error fetching blog data:', error));
});
