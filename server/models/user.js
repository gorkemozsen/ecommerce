const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("user", "admin"),
        allowNull: false,
        defaultValue: "user",
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tokenVersion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Varsayılan başlangıç değeri
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: { attributes: {} },
      },
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Order, {
      foreignKey: "createdBy",
      targetKey: "id",
      onDelete: "SET NULL",
    });

    User.hasMany(models.Products, {
      foreignKey: "createdBy",
      targetKey: "id",
      onDelete: "SET NULL",
    });

    User.hasMany(models.Address, {
      foreignKey: "userId",
      as: "addresses",
    });
  };
  return User;
};
