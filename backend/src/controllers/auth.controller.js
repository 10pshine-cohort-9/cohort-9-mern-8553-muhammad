const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/asyncHandler");
const logger = require("../config/logger");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.warn("Registration failed: User already exists");
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        logger.info(
            {
                userId: user._id
            },
            "User registered successfully"
        );
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        logger.error(error, "Registration failed");
        if (error.code === 11000) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            logger.warn("Login failed: Invalid email or password");
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.warn("Login failed: Invalid email or password");
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );
        logger.info(
            {
                userId: user._id
            },
            "User logged in successfully"
        );
        res.status(200).json({
            message: "Login successful",
            token
        });
    } catch (error) {
        logger.error(error, "Login failed");
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
const profile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            logger.warn("Profile not found");
            return res.status(404).json({
                message: "User not found"
            });
        }
        logger.info(
            {
                userId: user._id
            },
            "Profile fetched successfully"
        );
        res.status(200).json(user);
    } catch (error) {
        logger.error(error, "Failed to fetch profile");
        throw error;
    }
});
module.exports = {
    register,
    login,
    profile
};