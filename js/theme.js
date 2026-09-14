// ==========================================
// DARK MODE THEME TOGGLE
// ==========================================

(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  if (!themeToggle) return;

  // Only stamp data-theme when the user has actually chosen one. Writing a
  // default here would pin the attribute on <html> permanently and defeat the
  // prefers-color-scheme rule in responsive.css, so an OS-dark visitor would
  // always be served the light theme.
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    html.setAttribute('data-theme', savedTheme);
  }

  syncToggle(effectiveTheme());

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    const newTheme = effectiveTheme() === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    syncToggle(newTheme);

    // Let anything painting from CSS tokens (particles, background sweep)
    // pick up the new palette.
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
  });

  // What the page is actually showing: the explicit choice if there is one,
  // otherwise whatever the OS preference resolves to.
  function effectiveTheme() {
    const attr = html.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') return attr;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function syncToggle(theme) {
    updateThemeIcon(theme);
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  }

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
    // Only react if the user hasn't manually set a preference. The attribute
    // stays off so the CSS media query keeps control; we just resync the icon.
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      syncToggle(newTheme);
      window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
    }
  });
})();
