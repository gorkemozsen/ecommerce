const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

const orderController = require("../controllers/orderController");

router.get("/orders", authMiddleware, orderController.getOrdersByUser);

router.post("/orders/add", authMiddleware, orderController.createOrder);

router.put("/orders/:orderId", authMiddleware, orderController.cancelOrder);

module.exports = router;
