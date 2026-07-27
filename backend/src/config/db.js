const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://zayanehsan1805_db_user:Allahisone123@cluster0.uoqpvsc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        );

        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Database connection failed");
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;