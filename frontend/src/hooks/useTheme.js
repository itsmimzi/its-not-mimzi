'use client'

import { useEffect, useState, useCallback } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initial = stored
      ? stored
      : (prefersDark ? 'dark' : 'light');
      console.log('[useTheme] initial theme -> ', {stored, prefersDark, initial })

    setTheme(initial);
    document.documentElement.classList.toggle('dark-theme', initial === 'dark');
    console.log('[useTheme] html classList -> ', document.documentElement.classList);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      document.documentElement.classList.toggle('dark-theme', next === 'dark');
      console.log('[useTheme] html classList after toggle →', document.documentElement.classList);
      return next;
    });
  }, []);

  return [theme, toggleTheme];
}
