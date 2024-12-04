const { INTEGER } = require("sequelize");
const { Products, Sequelize } = require("../models");
const asyncHandler = require("../utilities/asyncHandler");
const generateFilters = require("../utilities/filterUtil");
const generateSearchConditions = require("../utilities/searchUtility");
const calculatePagination = require("../utilities/paginationUtil");
const generateOrder = require("../utilities/sortByUtil");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
    res.json({ message: "Products succesfully loaded!", products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addProduct = asyncHandler(async (req, res) => {
  const { name, description, image, price, stock } = req.body;

  const userId = req.user.id;

  await Products.create({
    name,
    description,
    image,
    price,
    stock,
    createdBy: userId,
  });

  res.json("Product succesfully registered");
});

exports.getProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Products.findByPk(productId);
  if (product) {
    res.json({ message: "Product successfully loaded!", product });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { name, description, image, price, stock } = req.body;

  const product = await Products.findByPk(productId);

  if (!product) {
    return res.status(404).json({ message: "Product noht found" });
  }

  Object.assign(product, {
    ...(name !== undefined && { name }),
    ...(description !== undefined && { description }),
    ...(image !== undefined && { image }),
    ...(price !== undefined && { price }),
    ...(stock !== undefined && { stock }),
  });

  await product.save();

  res.json({ message: "Product successfully updated!", product });
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
  });

  res.json({
    totalItems: products.count,
    totalPages: Math.ceil(products.count / limitNum),
    currentPage: pageNum,
    data: products.rows,
  });
});
