import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import {
    beforeEach,
    describe,
    expect,
    test,
    vi
} from "vitest";
import Notes from "./Notes";
import { deleteNote, getNotes } from "../services/notes";
vi.mock("../services/notes", () => ({
    getNotes: vi.fn(),
    deleteNote: vi.fn()
}));
function renderNotes() {
    return render(
        <MemoryRouter initialEntries={["/notes"]}>
            <Routes>
                <Route
                    path="/notes"
                    element={<Notes />}
                />
                <Route
                    path="/notes/new"
                    element={<h1>New Note Page</h1>}
                />
                <Route
                    path="/notes/:id"
                    element={<h1>Edit Note Page</h1>}
                />
            </Routes>
        </MemoryRouter>
    );
}
describe("Notes", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    test("shows loading state while notes are loading", () => {
        getNotes.mockImplementation(
            () => new Promise(() => {})
        );
        renderNotes();
        expect(
            screen.getByText("Loading notes...")
        ).toBeInTheDocument();
    });
    test("renders notes after loading", async () => {
        try {
            getNotes.mockResolvedValue([
                {
                    _id: "1",
                    title: "First Note",
                    content: "<p>First note content</p>"
                },
                {
                    _id: "2",
                    title: "Second Note",
                    content: "<p>Second note content</p>"
                }
            ]);
            renderNotes();
            expect(
                await screen.findByText("First Note")
            ).toBeInTheDocument();
            expect(
                screen.getByText("Second Note")
            ).toBeInTheDocument();
        } catch (error) {
            throw new Error(
                "Failed to test rendering notes after loading",
                {
                    cause: error
                }
            );
        }
    });
    test("shows empty state when there are no notes", async () => {
        try {
            getNotes.mockResolvedValue([]);
            renderNotes();
            expect(
                await screen.findByText("No notes found.")
            ).toBeInTheDocument();
        } catch (error) {
            throw new Error(
                "Failed to test empty notes state",
                {
                    cause: error
                }
            );
        }
    });
    test("filters notes by search term", async () => {
        try {
            const user = userEvent.setup();
            getNotes.mockResolvedValue([
                {
                    _id: "1",
                    title: "React Guide",
                    content: "<p>Learn React</p>"
                },
                {
                    _id: "2",
                    title: "Shopping List",
                    content: "<p>Buy milk</p>"
                }
            ]);
            renderNotes();
            await screen.findByText("React Guide");
            const searchInput =
                screen.getByRole("searchbox");
            await user.type(searchInput, "react");
            expect(
                screen.getByText("React Guide")
            ).toBeInTheDocument();
            expect(
                screen.queryByText("Shopping List")
            ).not.toBeInTheDocument();
        } catch (error) {
            throw new Error(
                "Failed to test note filtering by search term",
                {
                    cause: error
                }
            );
        }
    });
    test(
        "shows no matching notes message when search has no results",
        async () => {
            try {
                const user = userEvent.setup();
                getNotes.mockResolvedValue([
                    {
                        _id: "1",
                        title: "React Guide",
                        content: "<p>Learn React</p>"
                    }
                ]);
                renderNotes();
                await screen.findByText("React Guide");
                const searchInput =
                    screen.getByRole("searchbox");
                await user.type(
                    searchInput,
                    "database"
                );
                expect(
                    screen.getByText(
                        "No matching notes found."
                    )
                ).toBeInTheDocument();
            } catch (error) {
                throw new Error(
                    "Failed to test no matching notes search state",
                    {
                        cause: error
                    }
                );
            }
        }
    );
    test(
        "deletes a note when delete button is clicked",
        async () => {
            try {
                const user = userEvent.setup();
                getNotes.mockResolvedValue([
                    {
                        _id: "1",
                        title: "Note To Delete",
                        content: "<p>Delete this note</p>"
                    }
                ]);
                deleteNote.mockResolvedValue({});
                renderNotes();
                await screen.findByText(
                    "Note To Delete"
                );
                await user.click(
                    screen.getByRole("button", {
                        name: "Delete"
                    })
                );
                await waitFor(() => {
                    expect(
                        deleteNote
                    ).toHaveBeenCalledWith("1");
                });
                expect(
                    screen.queryByText(
                        "Note To Delete"
                    )
                ).not.toBeInTheDocument();
            } catch (error) {
                throw new Error(
                    "Failed to test note deletion",
                    {
                        cause: error
                    }
                );
            }
        }
    );
    test("shows an error when notes fail to load", async () => {
        try {
            getNotes.mockRejectedValue(
                new Error("Failed to fetch notes")
            );
            renderNotes();
            expect(
                await screen.findByText(
                    "Failed to fetch notes"
                )
            ).toBeInTheDocument();
        } catch (error) {
            throw new Error(
                "Failed to test notes loading error state",
                {
                    cause: error
                }
            );
        }
    });
});