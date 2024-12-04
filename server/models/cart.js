const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.Products, {
      foreignKey: "productId",
      onDelete: "CASCADE",
    });
  };

  return Cart;
};
