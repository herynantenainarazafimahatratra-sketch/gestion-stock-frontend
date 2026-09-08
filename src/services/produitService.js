import api from "./api";

export const getProduits = async () => {
  const response = await api.get("/produits");
  return response.data;
};

export const createProduit = async (produit) => {
  const response = await api.post("/produits", produit);
  return response.data;
};

export const deleteProduit = async (id) => {
  const response = await api.delete(`/produits/${id}`);
  return response.data;
};
