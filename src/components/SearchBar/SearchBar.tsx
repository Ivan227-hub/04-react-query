import React, { useState } from "react";
import { toast } from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Введіть пошуковий запит");
      return;
    }
    onSubmit(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        name="search"
        className={styles.input}
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
