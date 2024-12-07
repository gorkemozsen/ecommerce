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
  const orderList = cart.items.map((item) => ({
    productId: item.id,
    quantity: item.quantity,
  }));

  const res = await apiClient.post("/user/orders/add", {
    cart: orderList,
    addressId: cart?.addressId,
  });

  return res.data;
}

export async function cancelOrder(orderId) {
  const res = await apiClient.put(`/user/orders/${orderId}`, {});

  return res.data;
}
