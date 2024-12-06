import apiClient from "./apiClient";

export async function getAllCategories() {
  const res = await apiClient.get("/categories");

  return res.data;
}

export async function addCategory(category) {
  const res = await apiClient.post("/categories/add", {
    ...category,
  });

  return res.data;
}

export async function updateCategory(categoryId, updatedCategory) {
  console.log(categoryId);
  console.log(updatedCategory);

  const res = await apiClient.put(`/categories/update/${categoryId}`, {
    ...updatedCategory,
  });

  return res.data;
}

export async function deleteCategory(categoryId) {
  console.log(categoryId, "########");
  const res = await apiClient.delete(`/categories/delete/${categoryId}`);

  return res.data;
}
