import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../services/auth";
import "./AppLayout.css";
function AppLayout() {
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);
    const [error, setError] = useState("");
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
    return (
        <div className="app-layout">
            <header className="app-layout__header">
                <div className="app-layout__nav">
                    <Link
                        className="app-layout__brand"
                        to="/"
                    >
                        Notes App
                    </Link>
                    <nav
                        className="app-layout__links"
                        aria-label="Main navigation"
                    >
                        <Link to="/notes">Notes</Link>
                        <Link to="/profile">Profile</Link>
                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={loggingOut}
                        >
                            {loggingOut
                                ? "Logging out..."
                                : "Logout"}
                        </button>
                    </nav>
                </div>
            </header>
            {error && (
                <p className="app-layout__error">
                    {error}
                </p>
            )}
            <div className="app-layout__content">
                <Outlet />
            </div>
        </div>
    );
}
export default AppLayout;