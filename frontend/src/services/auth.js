const API_URL = "http://localhost:5000";
const register = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
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
        body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }
    localStorage.setItem("token", data.token);
    return data;
};
const getProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found");
    }
    const response = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
    }
    return data;
};
const logout = () => {
    localStorage.removeItem("token");
};
export {
    register,
    login,
    getProfile,
    logout
};