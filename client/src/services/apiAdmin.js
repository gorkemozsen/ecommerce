import axios from "axios";

export async function createProduct(product) {
  const token = localStorage.getItem("accessToken");

  console.log(product);

  if (!token) {
    throw new Error("Access token is missing");
  }

  try {
    const res = await axios.post(
      "http://127.0.0.1:3001/api/products/add",
      product,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Succesfully created!", res.data);
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function editProduct({ changedProduct, id }) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Access token is missing");
  }

  if (!changedProduct) {
    throw new Error("changedProduct is missing");
  }

  try {
    const res = await axios.put(
      `http://127.0.0.1:3001/api/products/${id}`,
      changedProduct,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteProduct(id) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Access token is missing");
  }

  if (!id) {
    throw new Error("Product ID is missing");
  }

  try {
    const res = await axios.delete(`http://127.0.0.1:3001/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function uploadFile(file) {
  const token = localStorage.getItem("accessToken");

  const formData = new FormData();
  formData.append("image", file);

  if (!token) {
    throw new Error("Access token is missing");
  }

  try {
    const res = await axios.post("http://127.0.0.1:3001/api/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Succesfully uploaded!", res.data);
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function editOrder({ changedOrder, id }) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Access token is missing");
  }

  if (!changedOrder) {
    throw new Error("changedOrder is missing");
  }

  try {
    const res = await axios.put(
      `http://127.0.0.1:3001/api/orders/${id}`,
      changedOrder,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
