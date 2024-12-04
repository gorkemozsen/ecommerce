module.exports.isAdmin = (req, res, next) => {
  if (req?.user?.role !== "admin" || !req.user) {
    return res
      .status(403)
      .json({ message: "You're not authorized to access this page" });
  }
  next();
};
