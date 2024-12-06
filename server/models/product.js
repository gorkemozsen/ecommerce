const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Products", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: "createdBy",
      targetKey: "id",
      as: "user", // Alias tanımlandı

      onDelete: "SET NULL",
    });

    Product.hasMany(models.Cart, {
      foreignKey: "productId",
      onDelete: "CASCADE",
    });

    Product.belongsToMany(models.Categories, {
      through: "ProductCategories",
      foreignKey: "productId",
      otherKey: "categoryId",
      as: "categories",
    });
  };

  return Product;
};
