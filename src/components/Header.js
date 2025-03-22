'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useNotification } from '../context/NotificationContext';
import styles from './Header.module.css';

export default function Header() {
  const { showNotifications, toggleNotifications, count } = useNotification();

  const handleClick = () => {
    toggleNotifications();
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.title}>📚 Book Bitches</Link>
      {/* <div className={styles.notificationContainer}>
        <button onClick={handleClick} className={styles.notificationBell}>
          🔔
          {count > 0 && !showNotifications && (
            <span className={styles.notificationCount}>{count}</span>
          )}
        </button>
      </div> */}
    </header>
  );
}