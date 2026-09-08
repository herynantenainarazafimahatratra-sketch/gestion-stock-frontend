import api from "./api";

export const getMouvements = async () => {
  const response = await api.get("/stock/mouvements");
  return response.data;
};

export const entreeStock = async (produitId, quantite) => {
  const response = await api.post("/stock/entree", { produitId, quantite });
  return response.data;
};

export const sortieStock = async (produitId, quantite) => {
  const response = await api.post("/stock/sortie", { produitId, quantite });
  return response.data;
};
