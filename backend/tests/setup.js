const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();
const mongoose = require("mongoose");
beforeAll(async () => {
    await mongoose.connect(
        process.env.MONGODB_URI.replace(
            "/?",
            "/notes_test?"
        )
    );
});
beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});
afterAll(async () => {
    await mongoose.connection.close();
});