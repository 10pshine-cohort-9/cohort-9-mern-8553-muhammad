const Note = require("../models/note.model");
const asyncHandler = require("../middleware/asyncHandler");
const logger = require("../config/logger");
const createNote = asyncHandler(async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.create({
            title,
            content,
            user: req.user.id
        });
        logger.info(
            {
                userId: req.user.id,
                noteId: note._id
            },
            "Note created successfully"
        );
        res.status(201).json({
            message: "Note created successfully",
            note
        });
    } catch (error) {
        logger.error(
            {
                userId: req.user.id
            },
            "Failed to create note"
        );
        throw error;
    }
});
const getAllNotes = asyncHandler(async (req, res) => {
    try {
        const notes = await Note.find({
            user: req.user.id
        });
        logger.info(
            {
                userId: req.user.id,
                totalNotes: notes.length
            },
            "Fetched all notes"
        );
        res.status(200).json(notes);
    } catch (error) {
        logger.error(
            {
                userId: req.user.id
            },
            "Failed to fetch notes"
        );
        throw error;
    }
});
const getNoteById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findOne({
            _id: id,
            user: req.user.id
        });
        if (!note) {
            logger.warn(
                {
                    userId: req.user.id,
                    noteId: id
                },
                "Note not found"
            );
            return res.status(404).json({
                message: "Note not found"
            });
        }
        logger.info(
            {
                userId: req.user.id,
                noteId: note._id
            },
            "Fetched note successfully"
        );
        res.status(200).json(note);
    } catch (error) {
        logger.error(
            {
                userId: req.user.id,
                noteId: req.params.id
            },
            "Failed to fetch note"
        );
        throw error;
    }
});
const updateNote = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedNote = await Note.findOneAndUpdate(
            {
                _id: id,
                user: req.user.id
            },
            {
                title,
                content
            },
            {
                new: true
            }
        );
        if (!updatedNote) {
            logger.warn(
                {
                    userId: req.user.id,
                    noteId: id
                },
                "Update failed: Note not found"
            );
            return res.status(404).json({
                message: "Note not found"
            });
        }
        logger.info(
            {
                userId: req.user.id,
                noteId: updatedNote._id
            },
            "Note updated successfully"
        );
        res.status(200).json({
            message: "Note updated successfully",
            updatedNote
        });
    } catch (error) {
        logger.error(
            {
                userId: req.user.id,
                noteId: req.params.id
            },
            "Failed to update note"
        );
        throw error;
    }
});
const deleteNote = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findOneAndDelete({
            _id: id,
            user: req.user.id
        });
        if (!deletedNote) {
            logger.warn(
                {
                    userId: req.user.id,
                    noteId: id
                },
                "Delete failed: Note not found"
            );
            return res.status(404).json({
                message: "Note not found"
            });
        }
        logger.info(
            {
                userId: req.user.id,
                noteId: deletedNote._id
            },
            "Note deleted successfully"
        );
        res.status(200).json({
            message: "Note deleted successfully",
            deletedNote
        });
    } catch (error) {
        logger.error(
            {
                userId: req.user.id,
                noteId: req.params.id
            },
            "Failed to delete note"
        );
        throw error;
    }
});
module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
};