const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const books = require('./books.json');

console.log("📚 Upload script started...");


// Load Firebase config from environment
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

console.log("🔥 Firebase config:", firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const clean = (value) =>
  value
    ?.toString()
    .replace(/\u00a0/g, '') // remove non-breaking spaces
    .replace(/[^\x20-\x7E]/g, '') // remove non-printable/unicode weirdos
    .trim() || '';

async function uploadBooks() {
  console.log(`Found ${books.length} books to upload.\n`);
  
  for (const book of books) {
    const title = clean(book.title);
    const author = clean(book.author);
    const shelfOwner = clean(book.shelfOwner);
    const listId = clean(book.listId) || shelfOwner;

    if (!title || !author || !shelfOwner) {
      console.warn(`⚠️ Skipping invalid book:`, book);
      continue;
    }

    try {
      const data = {
        title,
        author,
        shelfOwner,
        listId,
      };
    
      await addDoc(collection(db, 'books'), data);
      console.log(`✅ Uploaded: ${title}`);
    } catch (err) {
      console.error(`❌ Failed to upload: ${title}`);
      console.error(`Data:`, { title, author, shelfOwner, listId });
      console.error(`Error:`, err.message);
    }
  }

  // ✅ Move this here (outside the for loop)
  console.log("\n🚀 Upload complete.");
}

uploadBooks();