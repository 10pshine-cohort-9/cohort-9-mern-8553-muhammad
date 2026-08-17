import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";
import { login } from "../services/auth";
import "./Auth.css";
function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const registrationMessage =
        location.state?.message || "";
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login({
                email,
                password
            });
            navigate("/notes", { replace: true });
        } catch (error) {
            setError(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="auth-page">
            <section className="auth-card">
                <div className="auth-card__header">
                    <p className="auth-card__eyebrow">
                        Notes App
                    </p>
                    <h1>Welcome back</h1>
                    <p>
                        Sign in to access your notes.
                    </p>
                </div>
                {registrationMessage && (
                    <p
                        className="auth-card__success"
                        role="status"
                    >
                        {registrationMessage}
                    </p>
                )}
                {error && (
                    <p
                        className="auth-card__error"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >
                    <div className="auth-form__field">
                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div className="auth-form__field">
                        <label htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <button
                        className="auth-form__submit"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>
                </form>
                <p className="auth-card__footer">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Create one
                    </Link>
                </p>
            </section>
        </main>
    );
}
export default Login;