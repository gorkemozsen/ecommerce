const asyncHandler = require("../utilities/asyncHandler");
const { Categories, Products } = require("../models");
const calculatePagination = require("../utilities/paginationUtil");
const generateOrder = require("../utilities/sortByUtil");
const generateFilters = require("../utilities/filterUtil");
const generateSearchConditions = require("../utilities/searchUtility");

exports.getAllCategories = asyncHandler(async (req, res) => {
  // const categories = await Categories.findAll({
  //   include: [{ model: Categories, as: "subcategories" }], // Alt kategoriler dahil
  // });

  const categories = await Categories.findAll();

  res.status(200).json(categories);
});
exports.addCategory = asyncHandler(async (req, res) => {
  const { name, parentId } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Category name is required." });
  }

  let parentCategory = null;

  // Eğer parentId varsa kontrol et
  if (parentId) {
    parentCategory = await Categories.findByPk(parentId);
    if (!parentCategory) {
      return res.status(404).json({ error: "Parent category not found." });
    }
  }

  // Yeni kategori oluştur
  const category = await Categories.create({
    name,
    parentId: parentId || null,
  });

  res.status(201).json({
    message: "Category successfully added.",
    category,
  });
});
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, parentId } = req.body;

  const category = await Categories.findByPk(id);

  if (!category) {
    return res.status(404).json({ error: "Category not found." });
  }

  // Eğer parentId belirtilmişse kontrol et
  if (parentId) {
    const parentCategory = await Categories.findByPk(parentId);
    if (!parentCategory) {
      return res.status(404).json({ error: "Parent category not found." });
    }

    // Alt kategorinin kendisini parent olarak seçmesini engelle
    if (parentId === id) {
      return res
        .status(400)
        .json({ error: "A category cannot be its own parent." });
    }
  }

  // Kategoriyi güncelle
  category.name = name || category.name;
  category.parentId = parentId || category.parentId;
  await category.save();

  res.status(200).json({
    message: "Category successfully updated.",
    category,
  });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Categories.findByPk(id);

  if (!category) {
    return res.status(404).json({ error: "Category not found." });
  }

  // Kategoriyi ve alt kategorilerini sil
  await category.destroy();

  res.status(200).json({
    message: "Category successfully deleted.",
  });
});

exports.getProductsByCategory = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    filter = {},
    sortBy = {},
    query = "",
    searchFields = ["name", "description"],
    searchOperator = "like",
  } = req.query;

  const { categoryId } = req.params;

  const { pageNum, limitNum, offset } = calculatePagination(page, limit);

  // Sıralama oluştur
  const order = generateOrder(sortBy);

  const where = {
    ...generateFilters(filter),
    ...generateSearchConditions(query, searchFields, searchOperator),
  };

  // Kategoriyi kontrol et
  const category = await Categories.findByPk(categoryId);

  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  // Kategoriye bağlı ürünleri al
  const products = await Products.findAndCountAll({
    where,
    limit: limitNum,
    offset,
    order,
    include: [
      {
        model: Categories,
        as: "categories",
        where: { id: categoryId },
        attributes: [],
      },
    ],
  });

  res.status(200).json({
    message: `Products for category ${category.name} successfully retrieved.`,
    category: category.name,
    totalItems: products.count,
    totalPages: Math.ceil(products.count / limitNum),
    currentPage: pageNum,
    products: products.rows,
  });
});
