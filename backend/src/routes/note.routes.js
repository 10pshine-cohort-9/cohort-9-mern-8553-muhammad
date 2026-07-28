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
router.post("/", validateNote, createNote);
router.get("/", getAllNotes);
router.get("/:id", validateObjectId, getNoteById);
router.put("/:id", validateObjectId, validateNote, updateNote);
router.delete("/:id", validateObjectId, deleteNote);
module.exports = router;