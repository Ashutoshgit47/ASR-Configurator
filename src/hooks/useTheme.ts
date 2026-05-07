import { useState, useEffect, useLayoutEffect } from 'react';

// Set dark theme immediately on load to prevent flash
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme === 'dark' || savedTheme === null;
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('theme');
        return (saved === 'light' || saved === 'dark') ? saved : 'dark';
      } catch {
        return 'dark';
      }
    }
    return 'dark';
  });

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.warn('localStorage not available:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}
