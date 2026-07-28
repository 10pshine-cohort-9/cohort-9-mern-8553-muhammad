const Note = require("../models/note.model");
const mongoose = require("mongoose");
const createNote = async (req, res) => 
    {
    try 
        {
        const { title, content } = req.body;
        const note = await Note.create(
            {
            title,
            content
            });
        res.status(201).json(
                {
                message: "Note created successfully",
                note
                });
        } catch (error) 
        {
        res.status(500).json({
            message: error.message
        });
        }
    };
const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();

        res.status(200).json(notes);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
        message: "Invalid note ID"
    });
}
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
        message: "Invalid note ID"
    });
}
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

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
        message: "Invalid note ID"
    });
}
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
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
};