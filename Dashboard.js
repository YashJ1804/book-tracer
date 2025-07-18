import React, { useState, useEffect } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('books');
    return saved ? JSON.parse(saved) : [];
  });

  const [filters, setFilters] = useState({ title: '', author: '', status: '' });
  const [formData, setFormData] = useState({ title: '', author: '', status: 'To Read' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!formData.title.trim() || !formData.author.trim()) return;
    setBooks(prev => {
      const updated = [...prev, formData];
      localStorage.setItem('books', JSON.stringify(updated));
      return updated;
    });
    setFormData({ title: '', author: '', status: 'To Read' });
  };

  const handleDelete = (index) => {
    const updated = books.filter((_, i) => i !== index);
    setBooks(updated);
    localStorage.setItem('books', JSON.stringify(updated));
  };

  const handleLogout = () => {
    // Clear all localStorage items (books and login data if any)
    localStorage.clear();
    window.location.reload(); // Simple way to "logout" for frontend-only app
  };

  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(filters.title.toLowerCase()) &&
    book.author.toLowerCase().includes(filters.author.toLowerCase()) &&
    (filters.status === '' || book.status === filters.status)
  );

  return (
    <div className="dashboard">
      <div className="header">
        <h2>📚 Book Tracker</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="filters">
        <input
          placeholder="Filter by Title"
          value={filters.title}
          onChange={e => setFilters(prev => ({ ...prev, title: e.target.value }))}
        />
        <input
          placeholder="Filter by Author"
          value={filters.author}
          onChange={e => setFilters(prev => ({ ...prev, author: e.target.value }))}
        />
        <select
          value={filters.status}
          onChange={e => setFilters(prev => ({ ...prev, status: e.target.value }))}
        >
          <option value="">All</option>
          <option value="To Read">To Read</option>
          <option value="Reading">Reading</option>
          <option value="Read">Read</option>
        </select>
      </div>

      <div className="form">
        <input
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="To Read">To Read</option>
          <option value="Reading">Reading</option>
          <option value="Read">Read</option>
        </select>
        <button onClick={handleAdd}>Add Book</button>
      </div>

      <div className="book-list">
        {filtered.length === 0 ? (
          <p>No books found.</p>
        ) : (
          filtered.map((b, i) => (
            <div key={i} className="book-card">
              <div><strong>{b.title}</strong></div>
              <div>{b.author}</div>
              <div className="status">{b.status}</div>
              <button onClick={() => handleDelete(i)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
