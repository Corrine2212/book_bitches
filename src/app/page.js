// 'use client';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import { searchBooks } from '../lib/firebaseUtils';

// export default function HomePage() {
//   const [keyword, setKeyword] = useState('');
//   const [results, setResults] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);

//   useEffect(() => {
//     const notifsCorrine = JSON.parse(localStorage.getItem('notifs-corrine-main') || '[]');
//     const notifsBeth = JSON.parse(localStorage.getItem('notifs-beth-main') || '[]');
//     const combined = [...notifsCorrine, ...notifsBeth]
//       .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
//       .slice(0, 10);
//     setNotifications(combined);
//   }, []);

//   const handleSearch = async () => {
//     const found = await searchBooks(keyword);
//     setResults(found);
//   };

//   return (
//     <main>
//       <div className="notifications-container">
//         <button onClick={() => setShowNotifications(!showNotifications)} className="notification-bell">
//           🔔
//           {notifications.length > 0 && !showNotifications && (
//             <span className="notification-count">{notifications.length}</span>
//           )}
//         </button>
//         {showNotifications && (
//           <div className="notification-overlay">
//             <h3>Recent Updates</h3>
//             <div>
//               {notifications.map((book, i) => (
//                 <div key={i}>
//                   📘 "{book.title}" by {book.author} on{' '}
//                   <Link href={`/${book.shelfOwner}/main`}>
//                     {book.shelfOwner.charAt(0).toUpperCase() + book.shelfOwner.slice(1)}’s Shelf
//                   </Link>
//                   <br />
//                   <small>{new Date(book.createdAt?.seconds * 1000).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</small>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleSearch();
//         }}
//         className="search-form"
//       >
//         <input
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//           placeholder="Search books..."
//         />
//         <button type="submit">Search</button>
//       </form>

//       <div className="shelf-buttons main_btn">
//         <Link href="/corrine">
//           <button className="shelf-link">{"Corrine's Shelf"}</button>
//         </Link>
//         <Link href="/beth">
//           <button className="shelf-link">{"Beth's Shelf"}</button>
//         </Link>
//       </div>

//       {results.length > 0 && (
//         <div>
//           <h2>Search Results:</h2>
//           <ul>
//             {results.map((book) => (
//               <li key={book.id}>
//                 {book.title} by {book.author} —{' '}
//                 <Link href={`/${book.shelfOwner}/${book.listId}`}>
//                   {book.shelfOwner.charAt(0).toUpperCase() + book.shelfOwner.slice(1)}&apos;s shelf
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//     </main>
//   );
// }

'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { searchBooks } from '../lib/firebaseUtils';
import { useNotification } from '../context/NotificationContext';

export default function HomePage() {
  const { showNotifications } = useNotification();
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const notifsCorrine = JSON.parse(localStorage.getItem('notifs-corrine-main') || '[]');
    const notifsBeth = JSON.parse(localStorage.getItem('notifs-beth-main') || '[]');
    const combined = [...notifsCorrine, ...notifsBeth]
      .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
      .slice(0, 5);
    setNotifications(combined);
  }, []);

  const handleSearch = async () => {
    const found = await searchBooks(keyword);
    setResults(found);
  };

  return (
    <main>
      {showNotifications && (
        <div className="notification-overlay">
          <h3>Recent Updates</h3>
          {notifications.map((book, i) => (
            <div key={i}>
              📘 "{book.title}" by {book.author} on{' '}
              <Link href={`/${book.shelfOwner}/main`}>
                {book.shelfOwner.charAt(0).toUpperCase() + book.shelfOwner.slice(1)}’s Shelf
              </Link>
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
    </main>
  );
}