document.addEventListener('scroll', () => {
    const button = document.getElementById('scrollToTop');
    if (window.scrollY > 300) { // Adjust this value based on when you want the button to appear
      button.classList.add('show');
    } else {
      button.classList.remove('show');
    }
  });
  
  document.getElementById('scrollToTop').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  