
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((u) => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("authUser", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === email)) {
      return false; 
    }
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem("authUser", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
