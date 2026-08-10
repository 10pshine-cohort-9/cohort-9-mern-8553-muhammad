const express = require("express");
const cors = require("cors");
const pinoHttp = require("pino-http");
const logger = require("./config/logger");
const noteRoutes = require("./routes/note.routes");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middleware/errorHandler");
const app = express();
app.use(
    pinoHttp({
        logger
    })
);
app.use(cors());
app.use(express.json());
app.use("/notes", noteRoutes);
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    });
});
app.use(errorHandler);
module.exports = app;