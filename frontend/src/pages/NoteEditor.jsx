import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useEditor,
    EditorContent
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
    getNote,
    createNote,
    updateNote
} from "../services/notes";
import "./NoteEditor.css";
function NoteEditor() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(Boolean(id));
    const [editorVersion, setEditorVersion] = useState(0);
    const editor = useEditor({
        extensions: [StarterKit],
        content: "",
        editorProps: {
            attributes: {
                "aria-label": "Note content"
            }
        }
    });
    useEffect(() => {
        if (!editor) {
            return;
        }
        const handleUpdate = () => {
            setEditorVersion((version) => version + 1);
        };
        editor.on("transaction", handleUpdate);
        return () => {
            editor.off("transaction", handleUpdate);
        };
    }, [editor]);
    useEffect(() => {
        if (!id || !editor) {
            return;
        }
        let ignore = false;
        const loadNote = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await getNote(id);
                const note = data.note || data;
                if (!note) {
                    throw new Error("Note not found");
                }
                if (!ignore) {
                    setTitle(note.title || "");
                    editor.commands.setContent(
                        note.content || ""
                    );
                }
            } catch (error) {
                if (!ignore) {
                    setError(
                        error.message ||
                            "Failed to fetch note"
                    );
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };
        loadNote();
        return () => {
            ignore = true;
        };
    }, [id, editor]);
    if (!editor || loading) {
        return (
            <main className="note-editor">
                <p>Loading editor...</p>
            </main>
        );
    }
    const isBold = editor.isActive("bold");
    const isItalic = editor.isActive("italic");
    const isH1 = editor.isActive("heading", {
        level: 1
    });
    const isH2 = editor.isActive("heading", {
        level: 2
    });
    const isBulletList = editor.isActive(
        "bulletList"
    );
    const isOrderedList = editor.isActive(
        "orderedList"
    );
    const canUndo = editor.can().undo();
    const canRedo = editor.can().redo();
    void editorVersion;
    const handleSave = async () => {
        const trimmedTitle = title.trim();
        const content = editor.getHTML();
        if (!trimmedTitle) {
            setError("Title is required.");
            return;
        }
        if (!editor.getText().trim()) {
            setError("Content is required.");
            return;
        }
        try {
            setSaving(true);
            setError("");
            if (id) {
                await updateNote(id, {
                    title: trimmedTitle,
                    content
                });
            } else {
                await createNote({
                    title: trimmedTitle,
                    content
                });
            }
            navigate("/notes");
        } catch (error) {
            setError(
                error.message ||
                    (id
                        ? "Failed to update note"
                        : "Failed to create note")
            );
        } finally {
            setSaving(false);
        }
    };
    const handleCancel = () => {
        navigate("/notes");
    };
    return (
        <main className="note-editor">
            <h1>
                {id ? "Edit Note" : "Note Editor"}
            </h1>
            {error && (
                <p className="note-editor__error">
                    {error}
                </p>
            )}
            <div className="note-editor__field">
                <label htmlFor="title">
                    Title
                </label>
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
            <div className="note-editor__toolbar">
                <button
                    type="button"
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    aria-pressed={isBold}
                >
                    Bold
                </button>
                <button
                    type="button"
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    aria-pressed={isItalic}
                >
                    Italic
                </button>
                <button
                    type="button"
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({
                                level: 1
                            })
                            .run()
                    }
                    aria-pressed={isH1}
                >
                    H1
                </button>
                <button
                    type="button"
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({
                                level: 2
                            })
                            .run()
                    }
                    aria-pressed={isH2}
                >
                    H2
                </button>
                <button
                    type="button"
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleBulletList()
                            .run()
                    }
                    aria-pressed={isBulletList}
                >
                    Bullet List
                </button>
                <button
                    type="button"
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleOrderedList()
                            .run()
                    }
                    aria-pressed={isOrderedList}
                >
                    Numbered List
                </button>
                <button
                    type="button"
                    onClick={() =>
                        editor.commands.undo()
                    }
                    disabled={!canUndo}
                >
                    Undo
                </button>
                <button
                    type="button"
                    onClick={() =>
                        editor.commands.redo()
                    }
                    disabled={!canRedo}
                >
                    Redo
                </button>
            </div>
            <div className="note-editor__content">
                <EditorContent editor={editor} />
            </div>
            <div className="note-editor__actions">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving
                        ? "Saving..."
                        : id
                          ? "Update Note"
                          : "Save"}
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                >
                    Cancel
                </button>
            </div>
        </main>
    );
}
export default NoteEditor;