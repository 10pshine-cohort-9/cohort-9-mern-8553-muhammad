const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const pinoHttp = require("pino-http");
const logger = require("./config/logger");
const noteRoutes = require("./routes/note.routes");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middleware/errorHandler");
const app = express();
app.disable("x-powered-by");
app.use(
    pinoHttp({
        logger
    })
);
const frontendOrigin =
process.env.FRONTEND_ORIGIN || "http://localhost:5173";
app.use(
    cors({
        origin: frontendOrigin,
        credentials: true
    })
);
app.use(cookieParser());
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