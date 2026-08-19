import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, logout } from "../services/auth";
import "./Profile.css";
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
                setError(
                    error.message || "Failed to load profile"
                );
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
            setError(
                error.message || "Logout failed"
            );
            setLoggingOut(false);
        }
    };
    if (loading) {
        return (
            <main className="profile-page">
                <section className="profile-card">
                    <p className="profile-card__loading">
                        Loading profile...
                    </p>
                </section>
            </main>
        );
    }
    if (error && !user) {
        return (
            <main className="profile-page">
                <section className="profile-card">
                    <p
                        className="profile-card__error"
                        role="alert"
                    >
                        {error}
                    </p>
                </section>
            </main>
        );
    }
    return (
        <main className="profile-page">
            <div className="profile-page__heading">
                <p className="profile-page__eyebrow">
                    Account
                </p>
                <h1>Profile</h1>
                <p>
                    Manage your account information.
                </p>
            </div>
            <section className="profile-card">
                <div className="profile-card__avatar">
                    {user.name
                        ? user.name
                              .charAt(0)
                              .toUpperCase()
                        : "U"}
                </div>
                <div className="profile-card__details">
                    <div className="profile-card__field">
                        <span>Name</span>
                        <strong>{user.name}</strong>
                    </div>
                    <div className="profile-card__field">
                        <span>Email</span>
                        <strong>{user.email}</strong>
                    </div>
                </div>
                {error && (
                    <p
                        className="profile-card__error"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
                <button
                    className="profile-card__logout"
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                >
                    {loggingOut
                        ? "Logging out..."
                        : "Logout"}
                </button>
            </section>
        </main>
    );
}
export default Profile;