module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Categories", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Categories",
        key: "id",
      },
    },
  });

  Category.associate = (models) => {
    // Self-referanslı ilişki
    Category.hasMany(models.Categories, {
      foreignKey: "parentId",
      as: "subcategories",
    });

    Category.belongsTo(models.Categories, {
      foreignKey: "parentId",
      as: "parent",
    });

    // Ürünlerle çoktan çoğa ilişki
    Category.belongsToMany(models.Products, {
      through: "ProductCategories",
      foreignKey: "categoryId",
      otherKey: "productId",
      as: "products",
    });
  };

  return Category;
};
