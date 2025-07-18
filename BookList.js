import React from 'react';

export default function BookList({ books, filters, onDelete }) {
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(filters.title.toLowerCase()) &&
    book.author.toLowerCase().includes(filters.author.toLowerCase()) &&
    (filters.status === '' || book.status === filters.status)
  );

  return (
    <div className="book-list">
      {filteredBooks.map((b, index) => (
        <div key={index} className="book-card">
          <div><strong>{b.title}</strong></div>
          <div><strong>Author:</strong> {b.author}</div>
          <div><strong>Status:</strong> {b.status}</div>
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
