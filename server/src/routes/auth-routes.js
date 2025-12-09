const express = require("express");
const { body } = require("express-validator");
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth-controller");

const router = express.Router();

const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name là b?t bu?c"),
  body("email").isEmail().withMessage("Email không đúng đ?nh d?ng"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password ph?i có ít nh?t 6 k? t?"),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role không h?p l?"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Email không đúng đ?nh d?ng"),
  body("password").notEmpty().withMessage("Password là b?t bu?c"),
];

const forgotPasswordValidation = [
  body("email").isEmail().withMessage("Email không đúng đ?nh d?ng"),
];

const resetPasswordValidation = [
  body("email").isEmail().withMessage("Email không đúng đ?nh d?ng"),
  body("code").notEmpty().withMessage("Ma khong h?p l?"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password ph?i có ít nh?t 6 k? t?"),
];

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPasswordValidation, forgotPassword);
router.post("/reset-password", resetPasswordValidation, resetPassword);

module.exports = router;
