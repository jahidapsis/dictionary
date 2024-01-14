// app.tsx
import React, { FC, useState, useRef, useEffect } from "react";
import "./App.css";
import { List } from "./components/List";
import { useDictionary } from "./hooks/useDictionary";
import { useScrollPosition } from "./hooks/useScrollPosition";

function App() {
  const dictionary = useDictionary();
  const listRef = useRef<HTMLUListElement>(null);
  const scrollPosition = useScrollPosition(listRef, 100);
  // console.log("scrollPosition", scrollPosition);
  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered dictionary based on search term
  const filteredDictionary = dictionary.filter((word) =>
    word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the number of items to render dynamically based on scroll position
  const startIndex = Math.floor(scrollPosition / 30);
  const endIndex = Math.min(startIndex + 500, filteredDictionary.length - 1);
  // console.log(startIndex + "-" + endIndex);

  return (
    <div className="app">
      <div className="header">
        <div>Render Virtualized</div>
        {/* Search box */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="content">
        <List
          items={filteredDictionary.slice(startIndex, endIndex + 1)}
          listRef={listRef}
        />
      </div>
    </div>
  );
}

export default App;
