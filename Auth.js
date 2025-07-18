
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

export default function Auth() {
  const { register, login } = useAuth();
  const [mode, setMode]     = useState('login');
  const [form, setForm]     = useState({ name:'', email:'', password:'' });
  const [error, setError]   = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        login(form);
      } else {
        register(form);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth:320, margin:'80px auto', padding:20, border:'1px solid #ccc' }}>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {mode==='register' && (
          <input
            placeholder="Name"
            required
            value={form.name}
            onChange={e => setForm(f=>({...f,name:e.target.value}))}
            style={{ width:'100%', padding:8, margin:'8px 0' }}
          />
        )}
        <input
          placeholder="Email"
          required
          value={form.email}
          onChange={e => setForm(f=>({...f,email:e.target.value}))}
          style={{ width:'100%', padding:8, margin:'8px 0' }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={e => setForm(f=>({...f,password:e.target.value}))}
          style={{ width:'100%', padding:8, margin:'8px 0' }}
        />
        {error && <p style={{ color:'red' }}>{error}</p>}
        <button type="submit" style={{ width:'100%', padding:10 }}>
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      <p style={{ marginTop:12, textAlign:'center' }}>
        {mode === 'login'
          ? <>No account? <span onClick={()=>setMode('register')} style={{color:'blue',cursor:'pointer'}}>Register</span></>
          : <>Have one? <span onClick={()=>setMode('login')} style={{color:'blue',cursor:'pointer'}}>Login</span></>}
      </p>
    </div>
  );
}
