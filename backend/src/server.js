const app = require("./app");
const connectDB = require("./config/db");
const logger = require("./config/logger");
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        logger.error(error, "Failed to start server");
        process.exit(1);
    }
};
startServer();