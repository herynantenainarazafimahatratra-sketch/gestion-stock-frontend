import api from "./api";

export const login = async (email, motDePasse) => {
  const response = await api.post("/auth/login", { email, motDePasse });
  return response.data; // { token, nom, email, role }
};
export const creerUtilisateur = async (nom, email, motDePasse, role) => {
  const response = await api.post("/auth/register", {
    nom,
    email,
    motDePasse,
    role,
  });
  return response.data;
};

export const register = async (nom, email, motDePasse, role) => {
  const response = await api.post("/auth/register", {
    nom,
    email,
    motDePasse,
    role,
  });
  return response.data;
};
