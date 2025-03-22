import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const AddList = () => {
  const [name, setName] = useState("");

  const handleAddList = async () => {
    if (!name.trim()) return;
    
    try {
      await addDoc(collection(db, "lists"), {
        name,
        createdBy: "Corrine", // Change this later for authentication
      });
      setName(""); // Clear input
    } catch (error) {
      console.error("Error adding list:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="List name"
      />
      <button onClick={handleAddList}>Add List</button>
    </div>
  );
};

export default AddList; 