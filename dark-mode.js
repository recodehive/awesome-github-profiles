document.addEventListener("DOMContentLoaded", function () {
  const themeToggleCheckbox = document.querySelector("#theme-toggle");

  // Function to set the theme
  function setTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      themeToggleCheckbox.checked = true;
    } else {
      document.body.classList.remove("dark-mode");
      themeToggleCheckbox.checked = false;
    }
    localStorage.setItem("theme", theme);
  }

  // Load the theme from localStorage
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  // Add event listener to toggle checkbox
  themeToggleCheckbox.addEventListener("change", () => {
    const newTheme = themeToggleCheckbox.checked ? "dark" : "light";
    setTheme(newTheme);
  });
});
