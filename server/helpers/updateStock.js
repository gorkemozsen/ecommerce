const { Products } = require("../models");

const updateStock = async (items, operation) => {
  if (!["increment", "decrement"].includes(operation)) {
    throw new Error("Invalid operation. Use 'increment' or 'decrement'.");
  }

  for (const item of items) {
    const product = await Products.findByPk(item.productId);

    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    if (operation === "decrement") {
      // Stok düşme işlemi
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product: ${item.productId}`);
      }
      product.stock -= item.quantity;
    } else if (operation === "increment") {
      // Stok artırma işlemi
      product.stock += item.quantity;
    }

    await product.save();
  }
};

module.exports = {
  updateStock,
};
