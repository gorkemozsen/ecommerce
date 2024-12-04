const { Products } = require("../models");

const checkStockAndCalculateTotal = async (cart) => {
  let total = 0;

  for (const item of cart) {
    const product = await Products.findByPk(item.productId);

    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock: ${item.productId}`);
    }

    total += product.price * item.quantity;
  }

  return total;
};

module.exports = checkStockAndCalculateTotal;
