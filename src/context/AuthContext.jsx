/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Au chargement de l'app, on vérifie si un utilisateur était déjà connecté (localStorage)
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  });

  const loginUser = (authData) => {
    // authData = { token, nom, email, role }
    localStorage.setItem("auth", JSON.stringify(authData));
    setUser(authData);
  };

  const logoutUser = () => {
    localStorage.removeItem("auth");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
