import React, { useState } from 'react';

export default function BookForm({ onAdd, filters, setFilters }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('To Read');

  const handleSubmit = e => {
    e.preventDefault();
    if (title.trim() && author.trim()) {
      onAdd({ title, author, status });
      setTitle('');
      setAuthor('');
      setStatus('To Read');
    }
  };

  return (
    <div className="book-form">
      <input
        type="text"
        placeholder="Filter by Title"
        value={filters.title}
        onChange={e => setFilters(prev => ({ ...prev, title: e.target.value }))}
      />
      <input
        type="text"
        placeholder="Filter by Author"
        value={filters.author}
        onChange={e => setFilters(prev => ({ ...prev, author: e.target.value }))}
      />
      <select
        value={filters.status}
        onChange={e => setFilters(prev => ({ ...prev, status: e.target.value }))}
      >
        <option value="">All Statuses</option>
        <option value="To Read">To Read</option>
        <option value="Reading">Reading</option>
        <option value="Read">Read</option>
      </select>

      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={e => setAuthor(e.target.value)}
      />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="To Read">To Read</option>
        <option value="Reading">Reading</option>
        <option value="Read">Read</option>
      </select>
      <button onClick={handleSubmit}>Add Book</button>
    </div>
  );
}
