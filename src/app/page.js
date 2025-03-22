'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { searchBooks } from '../lib/firebaseUtils';
import { useNotification } from '../context/NotificationContext';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function HomePage() {
  const { showNotifications } = useNotification();
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchValidBooks = async () => {
      const notifsCorrine = JSON.parse(localStorage.getItem('notifs-corrine-main') || '[]');
      const notifsBeth = JSON.parse(localStorage.getItem('notifs-beth-main') || '[]');
      const combined = [...notifsCorrine, ...notifsBeth];

      const snapshot = await getDocs(collection(db, 'books'));
      const currentBooks = snapshot.docs.map(doc => doc.id);

      const validNotifications = combined
        .filter(book => currentBooks.includes(book.id))
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
        .slice(0, 6);

      setNotifications(validNotifications);
    };

    fetchValidBooks();
  }, []);

  const handleSearch = async () => {
    const found = await searchBooks(keyword);
    setResults(found);
  };

  return (
    <>
      {notifications.length > 0 && (
        <div className="notification-overlay">
          <h3>Recently Added:</h3>
          {notifications.map((book, i) => (
            <div
            className="added-book-item" 
            key={i}>
              📘 "{book.title}" <small>by {book.author}</small>
              <small> —{' '}<Link href={`/${book.shelfOwner}/main`}>
                {book.shelfOwner.charAt(0).toUpperCase() + book.shelfOwner.slice(1)}’s Shelf
              </Link></small>
              <br />
              <small>{new Date(book.createdAt?.seconds * 1000).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</small>
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="search-form"
      >
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search books..."
        />
        <button type="submit">Search</button>
      </form>

      <div className="shelf-buttons main_btn">
        <Link href="/corrine">
          <button className="shelf-link">Corrine's Shelf</button>
        </Link>
        <Link href="/beth">
          <button className="shelf-link">Beth's Shelf</button>
        </Link>
      </div>

      {results.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {results.map((book) => (
              <li key={book.id}>
                {book.title} by {book.author} —{' '}
                <Link href={`/${book.shelfOwner}/${book.listId}`}>
                  {book.shelfOwner.charAt(0).toUpperCase() + book.shelfOwner.slice(1)}&apos;s shelf
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
