import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { getNotes, deleteNote } from "../services/notes";
import "./Notes.css";
function Notes() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
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
                        error.message ||
                            "Failed to fetch notes"
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
    const filteredNotes = useMemo(() => {
        const normalizedSearchTerm =
            searchTerm.trim().toLowerCase();
        if (!normalizedSearchTerm) {
            return notes;
        }
        return notes.filter((note) => {
            const title =
                note.title?.toLowerCase() || "";
            const content =
                note.content?.toLowerCase() || "";
            return (
                title.includes(normalizedSearchTerm) ||
                content.includes(normalizedSearchTerm)
            );
        });
    }, [notes, searchTerm]);
    const handleDelete = async (id) => {
        try {
            setError("");
            await deleteNote(id);
            setNotes((currentNotes) =>
                currentNotes.filter(
                    (note) => note._id !== id
                )
            );
        } catch (error) {
            setError(
                error.message ||
                    "Failed to delete note"
            );
        }
    };
    if (loading) {
        return <p>Loading notes...</p>;
    }
    return (
        <main className="notes-page">
            <header className="notes-page__header">
                <div>
                    <h1>My Notes</h1>
                </div>
                <button
                    className="notes-page__create"
                    type="button"
                    onClick={() =>
                        navigate("/notes/new")
                    }
                >
                    Create Note
                </button>
            </header>
            {error && (
                <p className="notes-page__error">
                    {error}
                </p>
            )}
            <section>
                <div className="notes-page__section-header">
                    <h2>Notes</h2>
                    <label
                        className="notes-page__search"
                        htmlFor="note-search"
                    >
                        <span>Search notes</span>
                        <input
                            id="note-search"
                            type="search"
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(
                                    event.target.value
                                )
                            }
                            placeholder="Search by title or content"
                        />
                    </label>
                </div>
                {notes.length === 0 ? (
                    <p>No notes found.</p>
                ) : filteredNotes.length === 0 ? (
                    <p>No matching notes found.</p>
                ) : (
                    <div className="notes-page__list">
                        {filteredNotes.map((note) => (
                            <article
                                className="notes-page__card"
                                key={note._id}
                            >
                                <h3>{note.title}</h3>
                                <div
                                    className="notes-page__content"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            DOMPurify.sanitize(
                                                note.content
                                            )
                                    }}
                                />
                                <div className="notes-page__actions">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                `/notes/${note._id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(
                                                note._id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
export default Notes;