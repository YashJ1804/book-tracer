import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = existingUsers.find((user) => user.email === email);

    if (userExists) {
      alert('User already exists');
      return;
    }

    existingUsers.push({ email, password });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Registration successful. You can now log in.');
    navigate('/login');
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
