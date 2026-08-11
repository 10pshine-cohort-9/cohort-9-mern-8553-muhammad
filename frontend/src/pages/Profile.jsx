import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, logout } from "../services/auth";
function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await getProfile();
                setUser(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, []);
    const handleLogout = async () => {
        try {
            setLoggingOut(true);
            setError("");
            await logout();
            navigate("/login", { replace: true });
        } catch (error) {
            setError(error.message || "Logout failed");
            setLoggingOut(false);
        }
    };
    if (loading) {
        return <h1>Loading profile...</h1>;
    }
    if (error && !user) {
        return <p>{error}</p>;
    }
    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            {error && <p>{error}</p>}
            <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
            >
                {loggingOut ? "Logging out..." : "Logout"}
            </button>
        </div>
    );
}
export default Profile;