export function findItemInCart(cartItems, productId) {
  return cartItems.find((item) => item.id === productId);
}

export function isStockAvailable(product, quantity) {
  return product.stock >= quantity;
}

export function calculateTotalPrice(items) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return total;
}

export function addOrUpdateCartItem(cartItems, product, quantity = 1) {
  const existingItem = findItemInCart(cartItems, product.id);

  if (existingItem) {
    const newQuantity = quantity;

    if (newQuantity < 1) {
      throw new Error("Quantity cannot be less than 1");
    }

    if (!isStockAvailable(existingItem, newQuantity)) {
      throw new Error("Stock is not enough.");
    }
    return cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: newQuantity } : item
    );
  }
  if (quantity < 1) {
    throw new Error("Quantity cannot be less than 1.");
  }

  if (!isStockAvailable(product, quantity)) {
    throw new Error("Not enough stock available");
  }

  return [...cartItems, { ...product, quantity }];
}
