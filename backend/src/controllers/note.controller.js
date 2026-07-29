const Note = require("../models/note.model");
const asyncHandler = require("../middleware/asyncHandler");

const createNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const note = await Note.create({
        title,
        content
    });
    res.status(201).json({
        message: "Note created successfully",
        note
    });
});
const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find();
    res.status(200).json(notes);
});
const getNoteById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
        return res.status(404).json({
            message: "Note not found"
        });
    }
    res.status(200).json(note);
});
const updateNote = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
        id,
        {
            title,
            content
        },
        {
            new: true
        }
    );
    if (!updatedNote) {
        return res.status(404).json({
            message: "Note not found"
        });
    }
    res.status(200).json({
        message: "Note updated successfully",
        updatedNote
    });
});
const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
        return res.status(404).json({
            message: "Note not found"
        });
    }
    res.status(200).json({
        message: "Note deleted successfully",
        deletedNote
    });
});
module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
};