const jwt = require("jsonwebtoken");
const { User } = require("../models");

const jwtSecret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header is required." });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is required." });
    }

    const decoded = jwt.verify(token, jwtSecret);

    console.log("Decoded User ID:", decoded.userId); // Log the decoded userId
    const user = await User.findByPk(decoded.userId);
    console.log("Fetched User:", user); // Log the user object

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.tokenVersion !== decoded.tokenVersion) {
      return res
        .status(401)
        .json({ message: "Token is not valid. Please sign in again." });
    }

    // req.user'ı doğrudan Sequelize modeli olarak ayarlayın
    req.user = user;

    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token has expired. Please sign in again." });
    }
    return res.status(403).json({ message: "Invalid token." });
  }
};
