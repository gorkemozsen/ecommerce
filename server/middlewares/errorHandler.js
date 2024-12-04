const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message); // Hata loglama

  // Hata yanıtı
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

module.exports = errorHandler;