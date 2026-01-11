// ==========================================
// DARK MODE THEME TOGGLE
// ==========================================

(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  if (!themeToggle) return;

  // Get saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Update ARIA attribute
    themeToggle.setAttribute('aria-pressed', newTheme === 'dark');
  });

  // Update icon based on theme
  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (!icon) return;

    if (theme === 'dark') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }

  // Listen for system theme changes
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  darkModeMediaQuery.addEventListener('change', (e) => {
    // Only apply if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      updateThemeIcon(newTheme);
    }
  });
})();
