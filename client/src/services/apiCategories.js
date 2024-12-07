import apiClient from "./apiClient";

export async function getAllCategories({ page, limit, filter, sortBy, query }) {
  const res = await apiClient.get("/categories", {
    params: { page, limit, filter, sortBy, query },
  });

  return res.data;
}

export async function addCategory(category) {
  const res = await apiClient.post("/categories/add", {
    ...category,
  });

  return res.data;
}

export async function updateCategory(categoryId, updatedCategory) {
  const res = await apiClient.put(`/categories/update/${categoryId}`, {
    ...updatedCategory,
  });

  return res.data;
}

export async function deleteCategory(categoryId) {
  const res = await apiClient.delete(`/categories/delete/${categoryId}`);

  return res.data;
}
