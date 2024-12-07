import apiClient from "./apiClient";

export async function createProduct(product) {
  const res = await apiClient.post("/products/add", product);
  return res.data;
}

export async function editProduct({ changedProduct, id }) {
  if (!changedProduct) {
    throw new Error("changedProduct is missing");
  }

  const res = await apiClient.put(`/products/${id}`, changedProduct);
  return res.data;
}

export async function deleteProduct(id) {
  if (!id) {
    throw new Error("Product ID is missing");
  }

  const res = await apiClient.delete(`/products/${id}`);

  return res.data;
}

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await apiClient.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

export async function editOrder({ changedOrder, id }) {
  if (!changedOrder) {
    throw new Error("changedOrder is missing");
  }

  const res = await apiClient.put(`/orders/${id}`, changedOrder);
  return res.data;
}
