const { Order, User, Address } = require("../models");
const calculatePagination = require("../utilities/paginationUtil");
const generateOrder = require("../utilities/sortByUtil");
const generateFilters = require("../utilities/filterUtil");
const asyncHandler = require("../utilities/asyncHandler");
const generateSearchConditions = require("../utilities/searchUtility");
const checkStockAndCalculateTotal = require("../helpers/stockChecker");
const { updateStock } = require("../helpers/updateStock");

exports.getOrdersByUser = asyncHandler(async (req, res) => {
  const { page, limit, filter = "all", sortBy = {} } = req.query;

  const userId = req.user.id;

  // Pagination hesaplama
  const { pageNum, limitNum, offset } = calculatePagination(page, limit);

  // Filtreleme ayarları
  const where = {
    createdBy: userId,
    ...generateFilters(filter),
  };

  // Sıralama oluşturma
  const order = generateOrder(sortBy);

  // Sorgu
  const orders = await Order.findAndCountAll({
    where,
    limit: limitNum,
    offset,
    order,
  });

  // Yanıt
  res.json({
    message: "Orders successfully loaded.",
    totalItems: orders.count,
    totalPages: Math.ceil(orders.count / limitNum),
    currentPage: pageNum,
    data: orders.rows,
  });
});

exports.getOrders = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = {},
    filter = {},
    query = "",
    searchFields = ["id", "user.email"],
    searchOperator = "like",
  } = req.query;

  // Pagination hesaplamaları
  const { pageNum, limitNum, offset } = calculatePagination(page, limit);
  console.log("#$@#@$@#$@#$@DEDASDASDAS", pageNum, limitNum, offset);

  // Sıralama ayarları
  const order = generateOrder(sortBy);

  console.log(filter, "$@#$@#$@#FILTEEER");

  // Filtre ekleme ve arama (filter[field] ve filter[value])
  const where = {
    ...generateFilters(filter),
    ...generateSearchConditions(query, searchFields, searchOperator),
  };

  // Veritabanından sonuçları getir
  const orders = await Order.findAndCountAll({
    where,
    include: [
      {
        model: User,
        as: "user",
        attributes: ["email"],
        required: false,
      },
    ],
    limit: limitNum,
    offset,
    order,
  });

  // Yanıt olarak JSON döndür
  res.json({
    totalItems: orders.count,
    totalPages: Math.ceil(orders.count / limitNum),
    currentPage: pageNum,
    data: orders.rows,
  });
});

exports.createOrder = asyncHandler(async (req, res) => {
  const { cart, addressId } = req.body;

  if (!cart || !cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty." });
  }

  if (!addressId) {
    return res.status(400).json({ message: "Address is missing." });
  }

  const { id } = req.user;

  const total = await checkStockAndCalculateTotal(cart);

  const address = await Address.findByPk(addressId);

  if (!address) return res.status(404).json({ message: `Address is missing` });

  if (address.userId !== id)
    return res.status(404).json({
      message: `Address and user id is not matched. ${address?.userId}`,
    });

  const order = await Order.create({
    addressId: addressId,
    createdBy: id,
    items: cart.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
    total,
  });

  await updateStock(cart, "decrement");

  res.status(201).json({ message: "Order successfully created", order });
});

exports.updateOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status, total } = req.body;

  console.log("BODY####", req.body);

  // Order'ı veritabanından al
  const order = await Order.findByPk(orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // Order'ın mevcut durumunu sakla
  const previousStatus = order.status;

  // Order'daki items'ı JSON olarak çözümle
  const items = order.items || "[]"; // items JSON formatında bekleniyor
  console.log("Parsed Items ####", items);

  // Sipariş durumu "cancelled" ise stokları güncelle
  console.log("Status ########", status, previousStatus);
  if (
    status.toLowerCase() === "cancelled" &&
    previousStatus.toLowerCase() !== "cancelled"
  ) {
    await updateStock(items, "increment");
  }

  // Sipariş durumu "cancelled" durumundan başka bir duruma geçiyorsa stok kontrolü yap
  if (
    previousStatus.toLowerCase() === "cancelled" &&
    status.toLowerCase() !== "cancelled"
  ) {
    await updateStock(items, "decrement");
  }

  // Order objesini güncelle
  Object.assign(order, {
    ...(status !== undefined && { status }),
    ...(total !== undefined && { total }),
  });

  await order.save();

  res.json({ message: "Order successfully updated!", order });
});

exports.cancelOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.id;

  const order = await Order.findByPk(orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.status.toLowerCase() === "cancelled") {
    return res.status(400).json({ message: "Order already cancelled" });
  }

  if (
    order.status.toLowerCase() !== "pending" &&
    order.status.toLowerCase() !== "processing"
  ) {
    return res.status(400).json({
      message: "Your order is being processed. You cannot cancel it now.",
    });
  }

  if (order.createdBy !== userId) {
    return res
      .status(403)
      .json({ message: "You are not allowed to cancel this order." });
  }

  // Order'daki items'ı JSON olarak çözümle
  const items = order.items || "[]";
  console.log("Parsed Items ####", items);

  // Stokları güncelle
  await updateStock(items, "increment");

  // Order'ı "cancelled" olarak güncelle
  order.status = "cancelled";
  await order.save();

  res.json({ message: "Order successfully cancelled!", order });
});
