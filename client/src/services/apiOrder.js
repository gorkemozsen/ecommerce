import axios from "axios";
import apiClient from "./apiClient";

export async function getOrders({ page, limit, filter, sortBy, query }) {
  const params = {
    page,
    limit,
    ...(filter && {
      "filter[field]": filter.field,
      "filter[value]": filter.value,
    }),
    sortBy,
  };

  if (query && query.trim() !== "") {
    params.query = query.trim();
  }

  const res = await apiClient.get("/orders", {
    params,
  });

  return res.data;
}

export async function getUserOrders({ page, limit, filter, sortBy = {} }) {
  const params = {
    page,
    limit,
    ...(filter && {
      "filter[field]": filter.field,
      "filter[value]": filter.value,
    }),
    sortBy,
  };

  const res = await apiClient.get("/user/orders", {
    params,
  });

  return res.data;
}

export async function createOrder(cart) {
  const token = localStorage.getItem("accessToken");

  const orderList = cart.items.map((item) => ({
    productId: item.id,
    quantity: item.quantity,
  }));

  if (!token) {
    throw new Error("Access token is missing");
  }

  console.log("Address ID #########", cart.addressId);

  console.log("Sending cart data to API:", orderList); // Gönderilen cart verisini loglayın

  try {
    const res = await axios.post(
      "http://127.0.0.1:3001/api/user/orders/add",
      { cart: orderList, addressId: cart?.addressId },
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

export async function cancelOrder(orderId) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Access token is missing");
  }

  try {
    const res = await axios.put(
      `http://127.0.0.1:3001/api/user/orders/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Succesfully cancelled!", res.data);
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
