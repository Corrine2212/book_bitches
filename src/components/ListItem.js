"use client"; // Required because we're using hooks

import { useState } from "react";
import Link from "next/link"; // Import Next.js link for navigation
import { db } from "../lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function ListItem({ id, name }) {
  const [isDeleting, setIsDeleting] = useState(false);

  // Function to delete the list
  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    setIsDeleting(true);

    try {
      await deleteDoc(doc(db, "lists", id));
      alert("List deleted successfully!");
    } catch (error) {
      console.error("Error deleting list:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="list-item">
      {/* Make the name clickable */}
      <Link href={`/lists/${id}`}>
        <p style={{ cursor: "pointer", textDecoration: "underline" }}>{name}</p>
      </Link>

      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}