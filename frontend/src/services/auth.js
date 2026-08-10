const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";
const register = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Registration failed");
    }
    return data;
};
const login = async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }
    return data;
};
const getProfile = async () => {
    const response = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        credentials: "include"
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch profile"
        );
    }
    return data;
};
const logout = async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Logout failed");
    }
    return data;
};
export {
    register,
    login,
    getProfile,
    logout
};