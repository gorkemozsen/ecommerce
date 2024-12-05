import apiClient from "./apiClient";

export async function getMyAddresses() {
  const response = await apiClient.get("/addresses/me");
  return response.data;
}

export async function createNewAddress(addressData) {
  const response = await apiClient.post("/addresses", addressData);

  return response.data;
}

export async function editAddress({ addressId, addressData }) {
  const response = await apiClient.put(`/addresses/${addressId}`, addressData);

  return response.data;
}

export async function deleteAddress(addressId) {
  const response = await apiClient.delete(`/addresses/${addressId}`);

  return response.data;
}
