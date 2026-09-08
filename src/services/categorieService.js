import api from "./api";

export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

export const createCategorie = async (categorie) => {
  const response = await api.post("/categories", categorie);
  return response.data;
};

export const deleteCategorie = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};
