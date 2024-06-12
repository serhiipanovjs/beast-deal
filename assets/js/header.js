// Select all elements with the aria-label attribute set to "Toggle Dark Mode"
const themeButtons = document.querySelectorAll('[aria-label="Toggle Dark Mode"]');

// Select the menu button element by its ID
const menuButton = document.getElementById("menuButton");

// Add a click event listener to each theme toggle button
for (const themeButton of themeButtons) {
  themeButton.addEventListener("click", () => {
    // Get the current theme from localStorage, defaulting to "light" if not set
    const currentThemeSetting = localStorage.getItem("theme") ?? "light";
    // Determine the new theme: if current theme is "dark", switch to "light", otherwise switch to "dark"
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
    // Save the new theme setting in localStorage
    localStorage.setItem("theme", newTheme);
    // Update the data-theme attribute on the <html> element to apply the new theme
    document.querySelector("html").setAttribute("data-theme", newTheme);
  });
}

// Add a click event listener to the menu button
menuButton.addEventListener("click", function () {
  // Select the mobile navigation element by its ID
  const mobileNavigation = document.getElementById("mobileNavigation");
  // Check if the mobile navigation is currently hidden
  const isClosed = mobileNavigation.classList.contains("hidden");

  // If the mobile navigation is closed, open it
  if (isClosed) {
    // Remove the "hidden" class to show the mobile navigation
    mobileNavigation.classList.remove("hidden");
    // Add the "menu_closed" class to the menu button to change its state/style
    this.classList.add("menu_closed");
    return;
  }

  // If the mobile navigation is open, close it
  // Add the "hidden" class to hide the mobile navigation
  mobileNavigation.classList.add("hidden");
  // Remove the "menu_closed" class from the menu button to revert its state/style
  this.classList.remove("menu_closed");
});