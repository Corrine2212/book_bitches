'use client';
export const dynamic = 'force-static';
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { db } from '../../../lib/firebase';
import { addBook, deleteBook, updateBook, addNotification } from '../../../lib/firebaseUtils';
import {
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';

function toTitleCase(text) {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export default function ShelfPage() {
  const { owner, listid } = useParams();
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const isFirstLoadRef = useRef(true);
  const initialLoadTimeRef = useRef(null);
  const knownIdsRef = useRef(new Set());

  useEffect(() => {
    if (!owner || !listid) return;

    if (!initialLoadTimeRef.current) {
      initialLoadTimeRef.current = Date.now();
    }

    const q = query(
      collection(db, 'books'),
      where('shelfOwner', '==', owner),
      where('listId', '==', listid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveBooks = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => {
          const aTime = a.createdAt?.toMillis?.() || 0;
          const bTime = b.createdAt?.toMillis?.() || 0;
          return bTime - aTime;
        });

      const addedBooks = liveBooks.filter(b => !knownIdsRef.current.has(b.id));

      if (isFirstLoadRef.current) {
        isFirstLoadRef.current = false;
        knownIdsRef.current = new Set(liveBooks.map(b => b.id));
        setBooks(liveBooks);
        return;
      }

      addedBooks.forEach(b => knownIdsRef.current.add(b.id));
      setBooks(liveBooks);

      if (addedBooks.length > 0) {
        setTimeout(() => {
          const newBookElement = document.getElementById(`book-${addedBooks[0].id}`);
          if (newBookElement) {
            newBookElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            newBookElement.classList.add('highlight');
            setTimeout(() => {
              newBookElement.classList.remove('highlight');
            }, 3000);
          }
        }, 100);
      }
    });

    return () => unsubscribe();
  }, [owner, listid]);

  const handleAdd = async () => {
    const duplicate = books.find(
      (book) =>
        book.title.toLowerCase() === title.toLowerCase() &&
        book.author.toLowerCase() === author.toLowerCase()
    );

    if (duplicate) {
      alert('This book already exists on your shelf.');
      return;
    }

    const createdAt = new Date();

    await addBook({
      title,
      author,
      shelfOwner: owner,
      listId: listid,
      createdAt,
    });

    await addNotification({
      title,
      author,
      shelfOwner: owner,
      listId: listid,
      createdAt,
    });

    setTitle('');
    setAuthor('');
  };

  return (
    <>
      <h1>{owner === "corrine" ? "Corrine’s Shelf" : "Beth’s Shelf"}</h1>

      <div className="inputStack">
        <input
          value={title}
          onChange={(e) => setTitle(toTitleCase(e.target.value))}
          placeholder="Book title"
        />
        <input
          value={author}
          onChange={(e) => setAuthor(toTitleCase(e.target.value))}
          placeholder="Author"
        />
        <button onClick={handleAdd} className="button add">
          Add Book
        </button>
      </div>

      <div className="inputStack">
        <div className="book-list">
          {books.map((book) => (
            <div key={book.id} id={`book-${book.id}`} className="book-card">
              {editingId === book.id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(toTitleCase(e.target.value))}
                    placeholder="Edit title"
                  />
                  <input
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(toTitleCase(e.target.value))}
                    placeholder="Edit author"
                  />
                  <div className="button-group">
                    <button
                      onClick={async () => {
                        await updateBook(book.id, {
                          title: editTitle,
                          author: editAuthor,
                        });
                        setEditingId(null);
                      }}
                      className="button edit"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="button cancel"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="book-info">
                    <strong>{book.title}</strong>
                    <span>by {book.author}</span>
                  </div>
                  <div className="button-group">
                    <button
                      onClick={() => {
                        setEditingId(book.id);
                        setEditTitle(book.title);
                        setEditAuthor(book.author);
                      }}
                      className="button edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        const confirmDelete = window.confirm(`Are you sure you want to delete "${book.title}" by ${book.author}?`);
                        if (confirmDelete) {
                          deleteBook(book.id);
                        }
                      }}
                      className="button delete"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}