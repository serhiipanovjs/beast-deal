// Retrieve the current theme setting from localStorage
const currentThemeSetting = localStorage.getItem("theme");

// Check if the retrieved theme setting is 'dark'
if (currentThemeSetting === 'dark') {
  // If the theme setting is 'dark', set the "data-theme" attribute of the <html> element to 'dark'
  document.querySelector("html").setAttribute("data-theme", currentThemeSetting);
}
