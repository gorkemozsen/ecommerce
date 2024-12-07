const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled"
      ),
      defaultValue: "pending",
    },

    items: {
      type: DataTypes.JSON, // {productId: 321321, quantity: 2}
      allowNull: true,
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: "createdBy",
      as: "user", // Alias tanımlandı
      targetKey: "id",
      onDelete: "SET NULL",
    });

    Order.belongsTo(models.Address, {
      foreignKey: "addressId",
      onDelete: "SET NULL", // Adres silinirse, siparişin adresi NULL olur
    });
  };

  return Order;
};
