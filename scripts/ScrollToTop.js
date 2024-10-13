document.addEventListener('scroll', () => {
  const button = document.getElementById('scrollToTop');
  if (window.scrollY > 300) { // Adjust this value based on when you want the button to appear
    button.classList.add('show');
  } else {
    button.classList.remove('show');
  }
});

document.getElementById('scrollToTop').addEventListener('click', () => {
  scrollToTop();
});

// Function to scroll to the top smoothly
function scrollToTop() {
  const currentScroll = window.scrollY;
  const targetScroll = 0; // Scroll target
  const startTime = performance.now(); // Record the start time
  const duration = 500; // Duration of the scroll in milliseconds

  function animation(currentTime) {
    const elapsedTime = currentTime - startTime; // Calculate elapsed time
    const progress = Math.min(elapsedTime / duration, 1); // Normalize to [0, 1]

    // Ease out effect (you can adjust this for different easing)
    const easeOut = progress * (2 - progress);
    
    // Calculate the current scroll position
    const scrollPosition = currentScroll * (1 - easeOut);

    // Scroll to the calculated position
    window.scrollTo(0, scrollPosition);

    // Continue the animation if not finished
    if (progress < 1) {
      requestAnimationFrame(animation); // Request the next frame
    }
  }

  requestAnimationFrame(animation); // Start the animation
}

window.onscroll = function () {
  updateProgressBar();
};


function updateProgressBar() {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrollPercent = (scrollTop / scrollHeight) * 100;

  document.getElementById("progressBar").style.width = scrollPercent + "%";
}