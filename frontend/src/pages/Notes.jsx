import { useEffect, useState } from "react";
import {
    getNotes,
    createNote,
    updateNote,
    deleteNote
} from "../services/notes";
function Notes() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        let ignore = false;
        const loadNotes = async () => {
            try {
                const data = await getNotes();
                if (!ignore) {
                    setNotes(data);
                    setError("");
                }
            } catch (error) {
                if (!ignore) {
                    setError(
                        error.message || "Failed to fetch notes"
                    );
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };
        loadNotes();
        return () => {
            ignore = true;
        };
    }, []);
    const resetForm = () => {
        setTitle("");
        setContent("");
        setEditingId(null);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title.trim() || !content.trim()) {
            setError("Title and content are required.");
            return;
        }
        try {
            setSubmitting(true);
            setError("");
            if (editingId) {
                const data = await updateNote(editingId, {
                    title: title.trim(),
                    content: content.trim()
                });
                setNotes((currentNotes) =>
                    currentNotes.map((note) =>
                        note._id === editingId
                            ? data.updatedNote
                            : note
                    )
                );
            } else {
                const data = await createNote({
                    title: title.trim(),
                    content: content.trim()
                });
                setNotes((currentNotes) => [
                    ...currentNotes,
                    data.note
                ]);
            }
            resetForm();
        } catch (error) {
            setError(error.message || "Failed to save note");
        } finally {
            setSubmitting(false);
        }
    };
    const handleEdit = (note) => {
        setTitle(note.title);
        setContent(note.content);
        setEditingId(note._id);
        setError("");
    };
    const handleDelete = async (id) => {
        try {
            setError("");
            await deleteNote(id);
            setNotes((currentNotes) =>
                currentNotes.filter((note) => note._id !== id)
            );
            if (editingId === id) {
                resetForm();
            }
        } catch (error) {
            setError(error.message || "Failed to delete note");
        }
    };
    if (loading) {
        return <p>Loading notes...</p>;
    }
    return (
        <main>
            <h1>My Notes</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <h2>{editingId ? "Edit Note" : "Create Note"}</h2>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        placeholder="Note title"
                    />
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(event) =>
                            setContent(event.target.value)
                        }
                        placeholder="Write your note..."
                        rows="6"
                    />
                </div>
                <button type="submit" disabled={submitting}>
                    {submitting
                        ? "Saving..."
                        : editingId
                          ? "Update Note"
                          : "Create Note"}
                </button>
                {editingId && (
                    <button
                        type="button"
                        onClick={resetForm}
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                )}
            </form>
            <section>
                <h2>Notes</h2>
                {notes.length === 0 ? (
                    <p>No notes found.</p>
                ) : (
                    notes.map((note) => (
                        <article key={note._id}>
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                            <button
                                type="button"
                                onClick={() => handleEdit(note)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    handleDelete(note._id)
                                }
                            >
                                Delete
                            </button>
                        </article>
                    ))
                )}
            </section>
        </main>
    );
}
export default Notes;