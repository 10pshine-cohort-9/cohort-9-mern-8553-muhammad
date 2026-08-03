const express = require("express");
const noteRoutes = require("./routes/note.routes");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middleware/errorHandler");
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log("Request received");
    next();
});
app.use("/notes", noteRoutes);
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    });
});
app.use(errorHandler);
module.exports = app;