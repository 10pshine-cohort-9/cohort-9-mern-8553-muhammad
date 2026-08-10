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
const register = async (userData) => {
    return request(
        `${API_URL}/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        },
        "Registration failed"
    );
};
const login = async (credentials) => {
    return request(
        `${API_URL}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        },
        "Login failed"
    );
};
const getProfile = async () => {
    return request(
        `${API_URL}/auth/profile`,
        {
            method: "GET"
        },
        "Failed to fetch profile"
    );
};
const logout = async () => {
    return request(
        `${API_URL}/auth/logout`,
        {
            method: "POST"
        },
        "Logout failed"
    );
};
export {
    register,
    login,
    getProfile,
    logout
};