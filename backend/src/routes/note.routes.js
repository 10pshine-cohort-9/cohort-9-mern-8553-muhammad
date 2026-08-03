const express = require("express");
const router = express.Router();
const {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
} = require("../controllers/note.controller");
const validateNote = require("../middleware/noteValidation");
const validateObjectId = require("../middleware/validateObjectId");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/", authMiddleware, validateNote, createNote);
router.get("/", authMiddleware, getAllNotes);
router.get("/:id", authMiddleware, validateObjectId, getNoteById);
router.put("/:id", authMiddleware, validateObjectId, validateNote, updateNote);
router.delete("/:id", authMiddleware, validateObjectId, deleteNote);
module.exports = router;