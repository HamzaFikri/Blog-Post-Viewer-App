"use client";
import { useEffect, useState } from "react";

/**
 * ThemeToggle component
 * Allows the user to toggle between light and dark mode.
 * - Remembers the user's choice in localStorage
 * - Syncs with system preference on first load
 * - Updates the <html> class for global theming
 */
export default function ThemeToggle() {
  // theme: 'light', 'dark', or null (not yet loaded)
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  // On mount and when theme changes, sync with localStorage and <html> class
  useEffect(() => {
    if (theme === null) {
      // On first mount, check localStorage or system preference
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') {
        setTheme(saved);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    } else {
      // When theme changes, update <html> and localStorage
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Avoid hydration mismatch: don't render until theme is known
  if (!theme) return null;

  // Is the current theme light?
  const isLight = theme === 'light';

  return (
    <button
      className="flex items-center justify-between"
      style={{
        width: '96px',
        height: '40px',
        gap: '16px',
        padding: '8px 16px',
        borderRadius: '29px',
        background: isLight ? '#fff' : '#0A0D1F',
        border: 'none',
        cursor: 'pointer',
      }}
      aria-label="Toggle dark/light mode"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
    >
      {/* Show different icons for light and dark mode */}
      {isLight ? (
        // Light mode: filled dark circle (left), moon outline (right)
        <>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A0D1F" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" />
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A0D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
          </svg>
        </>
      ) : (
        // Dark mode: sun outline (left), filled white circle (right)
        <>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </>
      )}
    </button>
  );
} 