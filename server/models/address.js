module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      addressTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      neighborhood: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressLine1: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      addressLine2: {
        type: DataTypes.TEXT,
        allowNull: true, // İkinci adres satırı opsiyonel olabilir
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {}
  );

  Address.associate = function (models) {
    // Address, bir kullanıcıya ait
    Address.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    // Address, birden fazla Order ile ilişkilendirilebilir
    Address.hasMany(models.Order, {
      foreignKey: "addressId",
      onDelete: "SET NULL", // Adres silinirse, siparişin adresi NULL olur
    });
  };

  return Address;
};
