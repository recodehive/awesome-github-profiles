document.addEventListener("DOMContentLoaded", function () {
  const themeToggleCheckboxDesktop = document.querySelector("#theme-toggle");
  const themeToggleCheckboxMobile = document.querySelector("#theme-toggle-mobile");
  const views = document.querySelectorAll('.views');

  // Function to set the theme
  function setTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      themeToggleCheckboxDesktop.checked = true;
      themeToggleCheckboxMobile.checked = true;
      views.forEach(view => {
        view.style.color = "white";
      });
    } else {
      document.body.classList.remove("dark-mode");
      themeToggleCheckboxDesktop.checked = false;
      themeToggleCheckboxMobile.checked = false;
      views.forEach(view => {
        view.style.color = "black";
      });
    }
    localStorage.setItem("theme", theme);
  }

  // Load the theme from localStorage or set it to the system default
  const savedTheme = localStorage.getItem("theme");
  const defaultTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
  setTheme(savedTheme || defaultTheme);

  // Add event listeners to both toggle checkboxes
  themeToggleCheckboxDesktop.addEventListener("change", () => {
    const newTheme = themeToggleCheckboxDesktop.checked ? "dark" : "light";
    setTheme(newTheme);
  });

  themeToggleCheckboxMobile.addEventListener("change", () => {
    const newTheme = themeToggleCheckboxMobile.checked ? "dark" : "light";
    setTheme(newTheme);
  });
});
