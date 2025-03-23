'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { searchBooks, getRecentNotifications, getBooksByOwner } from '../lib/firebaseUtils';
import { useNotification } from '../context/NotificationContext';
import { db } from '../lib/firebase';
import { getDocs, collection } from 'firebase/firestore';

export default function HomePage() {
  const { showNotifications } = useNotification();
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchValidNotifications = async () => {
      const recentNotifs = await getRecentNotifications();
      const booksSnapshot = await getDocs(collection(db, 'books'));
      const currentBookIds = new Set(booksSnapshot.docs.map(doc => doc.id));
      const validNotifs = recentNotifs.filter(notif => currentBookIds.has(notif.bookId));
      setNotifications(validNotifs);
    };

    fetchValidNotifications();
  }, []);

  const handleSearch = async () => {
    const found = await searchBooks(keyword);
    setResults(found);
  };

  return (
    <>
      {notifications.length > 0 && (
        <div className="search-form notification-overlay">
          <h2>Recently Added:</h2>
          {notifications.map((book, i) => (
            <div className="added-book-item" key={i}>
              📘 &quot;{book.title}&quot;
              <div>
                <small>by {book.author}</small>
                <small> —{' '}
                  <Link href={`/${book.shelfOwner}/main`}>
                    {book.shelfOwner.charAt(0).toUpperCase() + book.shelfOwner.slice(1)}&rsquo;s Shelf
                  </Link>
                </small>
                <br />
                <small>{new Date(book.createdAt?.seconds * 1000).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</small>
              </div>
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
          className="search-input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search books..."
        />
        <button type="submit">Search</button>
      </form>

      {results.length > 0 && (
        <div className="search-form notification-overlay">
          <h2>Search Results:</h2>
          {results.map((book) => (
            <div key={book.id}>
              📘 &quot;{book.title}&quot;
              <div>
                <img
                  src={`https://covers.openlibrary.org/b/title/${encodeURIComponent(book.title)}-L.jpg`}
                  alt={`Cover for ${book.title}`}
                  className="book-cover"
                />
                <small>by {book.author} —{' '}</small>
                <small><Link href={`/${book.shelfOwner}/${book.listId}`}>
                  {book.shelfOwner.charAt(0).toUpperCase() + book.shelfOwner.slice(1)}&apos;s shelf
                </Link></small>

              </div>

            </div>
          ))}
        </div>
      )}
      {/* 
      <div className="shelf-buttons main_btn">

          <Link href="/corrine">
            <button className="shelf-link">Corrine&apos;s Shelf</button>
          </Link>
          <Link href="/beth">
            <button className="shelf-link">Beth&apos;s Shelf</button>
          </Link>
      </div> */}
    </>
  );
}
