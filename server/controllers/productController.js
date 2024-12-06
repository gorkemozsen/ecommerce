const { INTEGER } = require("sequelize");
const { Products, Categories, sequelize } = require("../models");
const asyncHandler = require("../utilities/asyncHandler");
const generateFilters = require("../utilities/filterUtil");
const generateSearchConditions = require("../utilities/searchUtility");
const calculatePagination = require("../utilities/paginationUtil");
const generateOrder = require("../utilities/sortByUtil");

exports.addProduct = asyncHandler(async (req, res) => {
  const { name, description, image, price, stock, categoryId } = req.body;

  const userId = req.user.id;

  // Girdi doğrulama
  if (!name || !price || !stock) {
    return res
      .status(400)
      .json({ error: "Name, price, and stock are required." });
  }

  if (price <= 0) {
    return res.status(400).json({ error: "Price must be greater than 0." });
  }

  if (stock < 0) {
    return res.status(400).json({ error: "Stock cannot be negative." });
  }

  if (!categoryId) {
    return res.status(400).json({ error: "Category ID is required." });
  }

  // Kategori kontrolü
  const categories = [];
  let currentCategory = await Categories.findByPk(categoryId);

  if (!currentCategory) {
    return res
      .status(404)
      .json({ error: `Category with ID ${categoryId} not found.` });
  }

  // Üst kategorileri zincirleme bulma
  while (currentCategory) {
    categories.push(currentCategory.id);
    currentCategory = await Categories.findByPk(currentCategory.parentId);
  }

  // Transaction başlat ve tüm işlemleri kapsa
  await sequelize.transaction(async (transaction) => {
    // Ürünü oluştur
    const product = await Products.create(
      {
        name,
        description,
        image,
        price,
        stock,
        createdBy: userId,
      },
      { transaction }
    );

    // Ürünü tüm kategorilere bağla
    await product.addCategories(categories, { transaction });
  });

  res.status(201).json({ message: "Product successfully registered" });
});

exports.getProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  // Ürünü ve sadece kategori adlarını çek
  const product = await Products.findByPk(productId, {
    include: [{ model: Categories, as: "categories", attributes: ["name"] }],
    attributes: ["id", "name", "description", "image", "price", "stock"],
  });

  if (product) {
    res.json({
      message: "Product successfully loaded!",
      product: {
        ...product.toJSON(),
        categories: product.categories.map((category) => category),
      },
    });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { name, description, image, price, stock, categoryId } = req.body;

  // Ürünü bul
  const product = await Products.findByPk(productId, {
    include: [{ model: Categories, as: "categories" }],
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Girdi doğrulama
  if (categoryId) {
    // Kategori kontrolü
    const categories = [];
    let currentCategory = await Categories.findByPk(categoryId);

    if (!currentCategory) {
      return res
        .status(404)
        .json({ error: `Category with ID ${categoryId} not found.` });
    }

    // Üst kategorileri zincirleme bulma
    while (currentCategory) {
      categories.push(currentCategory.id);
      currentCategory = await Categories.findByPk(currentCategory.parentId);
    }

    // Ürünün eski kategorilerini kaldır ve yeni kategorileri ekle
    await product.setCategories(categories);
  }

  // Ürün bilgilerini güncelle
  Object.assign(product, {
    ...(name !== undefined && { name }),
    ...(description !== undefined && { description }),
    ...(image !== undefined && { image }),
    ...(price !== undefined && { price }),
    ...(stock !== undefined && { stock }),
  });

  await product.save();

  res.json({
    message: "Product successfully updated!",
    product,
  });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const deleted = await Products.destroy({
    where: { id: productId },
  });

  if (deleted) {
    res.json({ message: "Product successfully deleted. " });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

exports.getProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    filter = {},
    sortBy = {},
    query = "",
    searchFields = ["name", "description"],
    searchOperator = "like",
  } = req.query;

  const { pageNum, limitNum, offset } = calculatePagination(page, limit);

  const order = generateOrder(sortBy);

  const where = {
    ...generateFilters(filter),
    ...generateSearchConditions(query, searchFields, searchOperator),
  };

  const products = await Products.findAndCountAll({
    where,
    limit: limitNum,
    offset,
    order,
    distinct: true,
    include: [
      {
        model: Categories,
        as: "categories",
        attributes: ["id", "name"],
      },
    ],
  });

  res.json({
    totalItems: products.count,
    totalPages: Math.ceil(products.count / limitNum),
    currentPage: pageNum,
    data: products.rows.map((product) => ({
      ...product.toJSON(),
      categories: product?.categories,
    })),
  });
});
