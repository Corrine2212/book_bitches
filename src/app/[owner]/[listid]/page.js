 'use client';
export const dynamic = 'force-static';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { addBook, deleteBook, updateBook } from '../../../lib/firebaseUtils';
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

  useEffect(() => {
    if (!owner || !listid) return;

    const q = query(
      collection(db, 'books'),
      where('shelfOwner', '==', owner),
      where('listId', '==', listid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveBooks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(liveBooks);
    });

    return () => unsubscribe();
  }, [owner, listid]);

  const handleAdd = async () => {
    await addBook({ title, author, shelfOwner: owner, listId: listid });
    setTitle('');
    setAuthor('');
  };

  return (
    <main className="shelf-container">
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

      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              {editingId === book.id ? (
                <>
                  <td>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(toTitleCase(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      value={editAuthor}
                      onChange={(e) => setEditAuthor(toTitleCase(e.target.value))}
                    />
                  </td>
                  <td className="button-group">
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
                  </td>
                </>
              ) : (
                <>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td className="button-group">
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
                      onClick={() => deleteBook(book.id)}
                      className="button delete"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
