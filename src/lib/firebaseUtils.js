// /lib/firebaseUtils.js
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function addBook({ title, author, shelfOwner, listId }) {
  return await addDoc(collection(db, "books"), {
    title,
    author,
    shelfOwner,
    listId, // ✅ this was missing!
    createdAt: new Date(),
  });
}

export async function getBooksByOwner(owner) {
  const q = query(collection(db, "books"), where("shelfOwner", "==", owner));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function searchBooks(keyword) {
  const snapshot = await getDocs(collection(db, "books"));
  const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return results.filter((book) =>
    book.title.toLowerCase().includes(keyword.toLowerCase()) ||
    book.author.toLowerCase().includes(keyword.toLowerCase())
  );
}

export async function deleteBook(bookId) {
  await deleteDoc(doc(db, 'books', bookId));
}

export async function updateBook(bookId, updatedFields) {
  await updateDoc(doc(db, 'books', bookId), updatedFields);
}