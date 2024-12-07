const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");
const commentController = require("../controllers/commentController");

// Tüm yorumları getir
router.get("/all", authMiddleware, isAdmin, commentController.getAllComments);

// Belirli bir ürünün yorumlarını getir
router.get(
  "/product/:productId",
  authMiddleware,
  commentController.getCommentsByProduct
);

// Belirli bir kullanıcının yorumlarını getir
router.get(
  "/user/:userId",
  authMiddleware,
  isAdmin,
  commentController.getCommentsByUser
);

// Yeni bir yorum oluştur
router.post("/", authMiddleware, commentController.makeComment);

// Yorum sil
router.delete(
  "/:commentId",
  authMiddleware,
  isAdmin,
  commentController.deleteComment
);

// Yorum güncelle
router.put(
  "/:commentId",
  authMiddleware,
  isAdmin,
  commentController.updateComment
);

module.exports = router;
