
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Library() {
  const { books, setBooks } = useContext(AuthContext); 
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const filtered = books.filter(book => {
      const matchesStatus = statusFilter ? book.status === statusFilter : true;
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
    setFilteredBooks(filtered);
  }, [books, search, statusFilter]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Library</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by title or author"
          className="border px-2 py-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-2 py-1"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="To Read">To Read</option>
          <option value="Reading">Reading</option>
          <option value="Read">Read</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredBooks.map((book, index) => (
          <div key={index} className="border p-4 rounded shadow">
            {book.cover && (
              <img src={book.cover} alt="cover" className="w-full h-48 object-cover mb-2" />
            )}
            <h3 className="font-bold">{book.title}</h3>
            <p className="text-sm">{book.author}</p>
            <p className="text-xs italic">{book.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
