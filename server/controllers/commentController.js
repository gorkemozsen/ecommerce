const { Comment, User, Products, Order, Sequelize } = require("../models");
const asyncHandler = require("../utilities/asyncHandler");
const generateFilters = require("../utilities/filterUtil");
const calculatePagination = require("../utilities/paginationUtil");
const generateSearchConditions = require("../utilities/searchUtility");
const generateOrder = require("../utilities/sortByUtil");

exports.getAllComments = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    filter = {},
    sortBy = {},
    query = "",
    searchFields = ["commentText", "userId", "productId"],
    searchOperator = "like",
  } = req.query;

  const { pageNum, limitNum, offset } = calculatePagination(page, limit);

  const order = generateOrder(sortBy);

  const where = {
    ...generateFilters(filter),
    ...generateSearchConditions(query, searchFields, searchOperator),
  };

  const comments = await Comment.findAndCountAll({
    where,
    limit: limitNum,
    offset,
    order,
    distinct: true,
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Products,
        as: "product",
        attributes: ["id", "name", "description"],
      },
    ],
  });

  res.json({
    totalItems: comments.count,
    totalPages: Math.ceil(comments.count / limitNum),
    currentPage: pageNum,
    data: comments.rows.map((comment) => ({
      ...comment.toJSON(),
      user: comment?.user,
      product: comment?.product,
    })),
  });
});

exports.getCommentsByProduct = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    filter = {},
    sortBy = {},
    query = "",
    searchFields = ["commentText"],
    searchOperator = "like",
  } = req.query;

  const { productId } = req.params; // productId'yi URL'den alıyoruz
  const { pageNum, limitNum, offset } = calculatePagination(page, limit);

  const order = generateOrder(sortBy);

  const where = {
    productId, // Yalnızca bu ürüne ait yorumları getir
    ...generateFilters(filter),
    ...generateSearchConditions(query, searchFields, searchOperator),
  };

  const comments = await Comment.findAndCountAll({
    where,
    limit: limitNum,
    offset,
    order,
    distinct: true,
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Products,
        as: "product",
        attributes: ["id", "name", "description"],
      },
    ],
  });

  res.json({
    totalItems: comments.count,
    totalPages: Math.ceil(comments.count / limitNum),
    currentPage: pageNum,
    data: comments.rows.map((comment) => ({
      ...comment.toJSON(),
      user: comment?.user,
      product: comment?.product,
    })),
  });
});

exports.getCommentsByUser = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    filter = {},
    sortBy = {},
    query = "",
    searchFields = ["commentText"],
    searchOperator = "like",
  } = req.query;

  const { userId } = req.params; // userId'yi URL'den alıyoruz
  const { pageNum, limitNum, offset } = calculatePagination(page, limit);

  const order = generateOrder(sortBy);

  const where = {
    userId, // Yalnızca bu kullanıcıya ait yorumları getir
    ...generateFilters(filter),
    ...generateSearchConditions(query, searchFields, searchOperator),
  };

  const comments = await Comment.findAndCountAll({
    where,
    limit: limitNum,
    offset,
    order,
    distinct: true,
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Products,
        as: "product",
        attributes: ["id", "name", "description"],
      },
    ],
  });

  res.json({
    totalItems: comments.count,
    totalPages: Math.ceil(comments.count / limitNum),
    currentPage: pageNum,
    data: comments.rows.map((comment) => ({
      ...comment.toJSON(),
      user: comment?.user,
      product: comment?.product,
    })),
  });
});

exports.makeComment = asyncHandler(async (req, res) => {
  const { userId, productId, rating, commentText, photos } = req.body;

  const productExists = await Products.findOne({
    where: { id: productId },
  });

  if (!productExists) {
    return res.status(404).json({
      message:
        "Product not found. Cannot add a comment for a non-existent product.",
    });
  }

  // Kullanıcının bu ürünü sipariş edip etmediğini kontrol et
  const hasPurchased = await Order.findOne({
    where: {
      createdBy: userId,
    },
    attributes: ["id"], // Gerekli alanları seçiyoruz
    where: Sequelize.literal(
      `JSON_CONTAINS(items, '{"productId": ${productId}}')`
    ),
  });

  if (!hasPurchased) {
    return res.status(403).json({
      message: "You can only comment on products you have purchased.",
    });
  }

  // Kullanıcının bu ürüne zaten yorum yapıp yapmadığını kontrol et
  const existingComment = await Comment.findOne({
    where: { userId, productId },
  });

  if (existingComment) {
    return res.status(403).json({
      message: "You have already commented on this product.",
    });
  }

  // Yeni yorum oluştur
  const comment = await Comment.create({
    userId,
    productId,
    rating,
    commentText,
    photos,
  });

  res.status(201).json({
    message: "Comment added successfully.",
    comment,
  });
});

exports.deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  // Silinecek yorumu bul
  const comment = await Comment.findOne({
    where: { id: commentId },
  });

  if (!comment) {
    return res.status(404).json({
      message: "Comment not found.",
    });
  }

  // Yorumu sil
  await comment.destroy();

  res.status(200).json({
    message: "Comment deleted successfully.",
  });
});

exports.updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { userId, role } = req.user; // Authenticated user bilgisi
  const { rating, commentText, photos } = req.body; // Güncellenmek istenen alanlar

  // Güncellenecek yorumu bul
  const comment = await Comment.findOne({
    where: { id: commentId },
  });

  if (!comment) {
    return res.status(404).json({
      message: "Comment not found.",
    });
  }

  // Kullanıcının yetkisini kontrol et
  if (comment.userId !== userId && role !== "admin") {
    return res.status(403).json({
      message: "You do not have permission to update this comment.",
    });
  }

  // Yorum verilerini güncelle
  if (rating !== undefined) comment.rating = rating;
  if (commentText !== undefined) comment.commentText = commentText;
  if (photos !== undefined) comment.photos = photos;

  await comment.save();

  res.status(200).json({
    message: "Comment updated successfully.",
    comment,
  });
});
