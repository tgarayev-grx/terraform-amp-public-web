/**
 * Theme utilities
 * 
 * This is a local UI library that will be replaced with an external UI kit later.
 * All theme-related utilities should be imported from here.
 */

/**
 * Set the theme mode
 * @param theme - 'light' | 'dark'
 */
export function setTheme(theme: 'light' | 'dark') {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
      } else {
        html.removeAttribute('data-theme');
      }
    }
}
  
/**
 * Get the current theme mode
 * @returns 'light' | 'dark'
 */
export function getTheme(): 'light' | 'dark' {
if (typeof document !== 'undefined') {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}
return 'light';
}

/**
 * Toggle between light and dark theme
 */
export function toggleTheme() {
const currentTheme = getTheme();
setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}