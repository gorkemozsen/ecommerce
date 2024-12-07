module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      commentText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      photos: {
        type: DataTypes.JSON, // Fotoğrafları JSON formatında saklayacağız
        allowNull: true,
        validate: {
          isArray(value) {
            if (!Array.isArray(value)) {
              throw new Error("Photos must be an array.");
            }
          },
        },
      },
    },
    {
      timestamps: true,
    }
  );

  Comment.associate = (models) => {
    // Her yorum bir kullanıcıya ait
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });

    // Her yorum bir ürüne ait
    Comment.belongsTo(models.Products, {
      foreignKey: "productId",
      as: "product",
      onDelete: "CASCADE",
    });
  };

  return Comment;
};
