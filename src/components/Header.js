'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../components/Header.module.css';

export default function Header() {
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
    <header className={styles.header}>
      <Link href="/" className={styles.title}>
        📚 Book Bitches
      </Link>
      <button onClick={toggleTheme} className={styles.toggleButton}>
         {theme === 'light' ? 'Dark 🌙' : 'Light ☀️'}
      </button>
    </header>
  );
}