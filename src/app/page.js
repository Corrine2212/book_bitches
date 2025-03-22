// /app/page.tsx (HomePage)
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { searchBooks } from '../lib/firebaseUtils';

export default function HomePage() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const found = await searchBooks(keyword);
    setResults(found);
  };

  return (
    <main>
      <form
  onSubmit={(e) => {
    e.preventDefault(); // prevent page reload
    handleSearch();
  }}
  className="search-form"
>
  <input
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
    placeholder="Search books..."
  />
  <button type="submit">
    Search
  </button>
</form>
     

<div className="shelf-buttons">
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







// "use client";

// import Link from "next/link";
// import { useSearch } from "../context/SearchContext";
// import { useEffect, useState } from "react";
// import { db } from "../lib/firebase";
// import { collection, getDocs } from "firebase/firestore";

// export default function Home() {
//   const { searchQuery } = useSearch();
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     const fetchAllBooks = async () => {
//       if (!searchQuery.trim()) {
//         setResults([]);
//         return;
//       }

//       const snapshot = await getDocs(collection(db, "books"));
//       const allBooks = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       }));

//       const filtered = allBooks.filter((book) =>
//         book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         book.author.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//       setResults(filtered);
//     };

//     fetchAllBooks();
//   }, [searchQuery]);

//   return (
//     <div>
//       <h1>📚 Shared Book Shelves</h1>

//       {searchQuery ? (
//         <>
//           <h2>Search Results</h2>
//           {results.length === 0 ? (
//             <p>No books found.</p>
//           ) : (
//             <ul>
//               {results.map((book) => (
//                 <li key={book.id}>
//                   <strong>{book.title}</strong> <em>by {book.author}</em>
//                   <br />
//                   <Link href={`/shelf/${book.owner}`}>
//                     <small>View on {book.owner === "corrine" ? "Corrine" : "Beth"}’s shelf</small>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </>
//       ) : (
//         <>
//           <p>Select a shelf to view:</p>
//           <ul>
//             <li>
//               <Link href="/shelf/corrine">📖 Corrine’s Shelf</Link>
//             </li>
//             <li>
//               <Link href="/shelf/beth">📖 Beth’s Shelf</Link>
//             </li>
//           </ul>
//         </>
//       )}
//     </div>
//   );
// }