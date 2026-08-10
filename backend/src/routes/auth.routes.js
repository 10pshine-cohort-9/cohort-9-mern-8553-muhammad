const express = require("express");
const router = express.Router();
const {
    register,
    login,
    profile,
    logout
} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authMiddleware, profile);
module.exports = router;