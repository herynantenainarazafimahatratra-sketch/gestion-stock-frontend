import api from "./api";

export const getFournisseurs = async () => {
  const response = await api.get("/fournisseurs");
  return response.data;
};

export const createFournisseur = async (fournisseur) => {
  const response = await api.post("/fournisseurs", fournisseur);
  return response.data;
};

export const deleteFournisseur = async (id) => {
  const response = await api.delete(`/fournisseurs/${id}`);
  return response.data;
};
