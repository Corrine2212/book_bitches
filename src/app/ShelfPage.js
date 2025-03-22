"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { db } from "../../../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

export default function ShelfPage() {
  const { user } = useParams();
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const q = query(collection(db, "books"), where("owner", "==", user));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBooks(data);
    };

    fetchBooks();
  }, [user]);

  const addBook = async () => {
    if (!title.trim()) return;

    const newBook = { title, author, owner: user, read: false };
    const docRef = await addDoc(collection(db, "books"), newBook);
    setBooks((prev) => [...prev, { id: docRef.id, ...newBook }]);
    setTitle("");
    setAuthor("");
  };

  const toggleRead = async (id, current) => {
    const ref = doc(db, "books", id);
    await updateDoc(ref, { read: !current });
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, read: !current } : b))
    );
  };

  const deleteBook = async (id) => {
    if (!confirm("Delete this book?")) return;
    await deleteDoc(doc(db, "books", id));
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div>
      <h1>{user === "corrine" ? "Corrine’s Shelf" : "Beth’s Shelf"}</h1>

      <input
        placeholder="Book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button onClick={addBook}>Add Book</button>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <input
              type="checkbox"
              checked={book.read}
              onChange={() => toggleRead(book.id, book.read)}
            />
            <strong style={{ textDecoration: book.read ? "line-through" : "none" }}>
              {book.title}
            </strong>{" "}
            <em>by {book.author}</em>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
