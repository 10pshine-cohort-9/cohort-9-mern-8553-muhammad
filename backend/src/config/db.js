const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("./logger");
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        logger.info("MongoDB Connected");
    } catch (error) {
        logger.error(error, "Database connection failed");

        process.exitCode = 1;
        return;
    }
};
module.exports = connectDB;