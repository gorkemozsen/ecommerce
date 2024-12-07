const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { User } = require("../models");
const asyncHandler = require("../utilities/asyncHandler");

const jwtSecret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

exports.register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hash,
    role: "user",
    firstName,
    lastName,
  });
  res.json({
    message: "User successfully registered",
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.scope("withPassword").findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatched = await bcrypt.compare(password, user.password);
  //const isMatched = user.password === password;
  if (!isMatched)
    return res.status(400).json({ message: "Incorrect password" });

  user.tokenVersion += 1;
  await user.save();

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
      tokenVersion: user.tokenVersion,
    },
    jwtSecret,
    {
      expiresIn: expiresIn,
    }
  );

  res.json({ message: "Login succesfully", token });
});

exports.logout = asyncHandler(async (req, res) => {
  const user = req.user;

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  user.tokenVersion += 1;
  await user.save();

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Token is missing in the authorization header" });
  }

  res.json({ message: "Logged out successfully" });
});

exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

exports.updateEmail = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { newEmail, currentPassword } = req.body;

  // Kullanıcıyı bulun
  const user = await User.scope("withPassword").findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Kullanıcının mevcut e-postası ile aynı mı?
  if (user.email === newEmail) {
    return res
      .status(400)
      .json({ message: "This is already your current email." });
  }

  // Şifre doğrulama
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Incorrect password." });
  }

  // E-posta kullanımda mı?
  const emailExists = await User.findOne({ where: { email: newEmail } });
  if (emailExists) {
    return res.status(400).json({ message: "This email is already in use." });
  }

  // E-postayı güncelle (direct update)
  await User.update({ email: newEmail }, { where: { id: userId } });

  res.status(200).json({
    message: "Email updated successfully.",
    email: newEmail,
  });
});

exports.updatePassword = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  const user = await User.scope("withPassword").findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  //const isPasswordValid = currentPassword === user.password;

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Incorrect current password." });
  }

  const isSameAsOld = await bcrypt.compare(newPassword, user.password);
  if (isSameAsOld) {
    return res.status(400).json({
      message: "New password cannot be the same as the current password.",
    });
  }

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ message: "New passwords do not match." });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  // Tüm oturumları geçersiz kılmak için tokenVersion'ı artır
  user.tokenVersion += 1;

  await user.save();

  res
    .status(200)
    .json({ message: "Password updated successfully. Please log in again." });
});
