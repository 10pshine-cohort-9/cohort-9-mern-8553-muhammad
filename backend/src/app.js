const express = require("express");
const noteRoutes = require("./routes/note.routes");
const app = express();
app.use(express.json());
app.use((req, res, next) => 
    {
    console.log("Request received");
    next();
    });
app.use("/notes", noteRoutes);
app.get("/", (req, res) => 
    {
    res.json(
        {
        message: "Hello World"
        });
    });
module.exports = app;