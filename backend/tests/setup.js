const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const mongoose = require("mongoose");
require("dotenv").config();
beforeAll(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "notes_test"
        });
    } catch (error) {
        throw new Error(`beforeAll failed: ${error.message}`);
    }
});
beforeEach(async () => {
    try {
        if (mongoose.connection.name !== "notes_test") {
            throw new Error(
                `Unexpected database: ${mongoose.connection.name}`
            );
        }
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            await collections[key].deleteMany({});
        }
    } catch (error) {
        throw new Error(`beforeEach failed: ${error.message}`);
    }
});
afterAll(async () => {
    try {
        await mongoose.connection.close();
    } catch (error) {
        throw new Error(`afterAll failed: ${error.message}`);
    }
});