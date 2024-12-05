import apiClient from "./apiClient";

export async function getProducts({ page, limit, filter, sortBy, query }) {
  const res = await apiClient.get(`/products`, {
    params: { page, limit, filter, sortBy, query },
  });

  return res.data;
}

export async function getProductById(id) {
  if (!id) throw new Error("Product ID is required");

  const res = await apiClient.get(`/products/${id}`);

  if (!res.data) {
    throw new Error("No data received from API");
  }

  return res.data;
}
