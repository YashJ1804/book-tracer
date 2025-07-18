
import React from 'react';
import { useAuth } from './AuthContext';
import Library from './Library';   

export default function MainApp() {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 20 }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <h1>Welcome, {user.name}</h1>
        <button onClick={logout}>Logout</button>
      </header>
      <Library />
    </div>
  );
}
