import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Au chargement de l'app, on vérifie si un utilisateur était déjà connecté (localStorage)
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

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
