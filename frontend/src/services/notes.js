const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";
const request = async (url, options, defaultMessage) => {
    try {
        const response = await fetch(url, {
            ...options,
            credentials: "include"
        });
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error("Invalid server response", {
                cause: error
            });
        }
        if (!response.ok) {
            const error = new Error(
                data.message || defaultMessage
            );
            error.status = response.status;
            throw error;
        }
        return data;
    } catch (error) {
        if (
            error instanceof Error &&
            error.message !== "Invalid server response"
        ) {
            const serviceError = new Error(
                error.message || defaultMessage,
                {
                    cause: error
                }
            );
            serviceError.status = error.status;
            throw serviceError;
        }
        throw error;
    }
};
const getNotes = async () => {
    return request(
        `${API_URL}/notes`,
        {
            method: "GET"
        },
        "Failed to fetch notes"
    );
};
const getNote = async (id) => {
    return request(
        `${API_URL}/notes/${id}`,
        {
            method: "GET"
        },
        "Failed to fetch note"
    );
};
const createNote = async (noteData) => {
    return request(
        `${API_URL}/notes`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(noteData)
        },
        "Failed to create note"
    );
};
const updateNote = async (id, noteData) => {
    return request(
        `${API_URL}/notes/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(noteData)
        },
        "Failed to update note"
    );
};
const deleteNote = async (id) => {
    return request(
        `${API_URL}/notes/${id}`,
        {
            method: "DELETE"
        },
        "Failed to delete note"
    );
};
export {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
};