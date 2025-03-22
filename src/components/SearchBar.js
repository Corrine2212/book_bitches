"use client";

import { useSearch } from "../context/SearchContext";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <div style={{ marginBottom: "1rem", padding: "1rem", background: "#f9f9f9" }}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search across your lists..."
        style={{
          width: "100%",
          padding: "8px",
          fontSize: "16px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />
    </div>
  );
}