import api from "./api";

export const getVentes = async () => {
  const response = await api.get("/ventes");
  return response.data;
};

export const createVente = async (lignes) => {
  // lignes = [{ produitId, quantite }, ...]
  const response = await api.post("/ventes", lignes);
  return response.data;
};

export const getBeneficeParMois = async () => {
  const response = await api.get("/ventes/benefices");
  return response.data;
};
