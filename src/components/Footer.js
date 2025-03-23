'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css'; // update if needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faDrumstickBite } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initial = stored || systemPref;
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  // const toggleTheme = () => {
  //   const next = theme === 'light' ? 'dark' : 'light';
  //   setTheme(next);
  //   localStorage.setItem('theme', next);
  //   document.documentElement.setAttribute('data-theme', next);
  // };

  return (
    <footer className={styles.footer}>
      <div className={`${styles.half} ${styles['corrine-half']}`}>
        <Link className={styles['footer-link']} href="/corrine">
        <FontAwesomeIcon icon={faDrumstickBite} size="1x" />
        Corrine&apos;s Shelf
        </Link>
      </div>
      <div className={`${styles.half} ${styles['beth-half']}`}>
        <Link className={styles['footer-link']} href="/beth">
        <FontAwesomeIcon icon={faCat} size="1x" />
        Beth&apos;s Shelf
        </Link>
      </div>

    </footer >
  );
}