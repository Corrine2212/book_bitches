'use client';
import { useEffect, useState } from 'react';
import styles from './Footer.module.css'; // update if needed

export default function Footer() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initial = stored || systemPref;
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <footer className={styles.footer}>
      <button onClick={toggleTheme} className={styles.toggleButton}>
        {theme === 'light' ? 'Dark 🌙' : 'Light ☀️'}
      </button>
    </footer>
  );
}