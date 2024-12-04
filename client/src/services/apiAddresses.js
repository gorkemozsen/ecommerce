import axios from "axios";

export async function getMyAddresses() {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.get("http://127.0.0.1:3001/api/addresses/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("getMyAddresses Error:", error.message);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching your addresses."
    );
  }
}

export async function createNewAddress(addressData) {
  const token = localStorage.getItem("accessToken"); // Authorization için token alınıyor

  try {
    // Adres oluşturma isteği
    const response = await axios.post(
      "http://127.0.0.1:3001/api/addresses",
      addressData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization başlığı ekleniyor
          "Content-Type": "application/json",
        },
      }
    );

    // Başarılı yanıt
    console.log("Address created successfully:", response.data);
    return response.data;
  } catch (error) {
    // Hata yönetimi
    console.error("Error creating address:", error.message);
    throw new Error(
      error.response?.data?.message || "Failed to create a new address."
    );
  }
}

export async function editAddress({ addressId, addressData }) {
  const token = localStorage.getItem("accessToken");
  console.log(`ID >>>> ${addressId},DATA>>>> ${addressData}`);

  try {
    const response = await axios.put(
      `http://127.0.0.1:3001/api/addresses/${addressId}`,
      addressData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Address updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating address:", error.message);
    throw new Error(
      error.response?.data?.message || "Failed to update the address."
    );
  }
}

export async function deleteAddress(addressId) {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.delete(
      `http://127.0.0.1:3001/api/addresses/${addressId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Address deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting address:", error.message);
    throw new Error(
      error.response?.data?.message || "Failed to delete the address."
    );
  }
}
