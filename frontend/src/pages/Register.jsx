import { useState } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";
import { register } from "../services/auth";
import "./Auth.css";
function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            await register({
                name,
                email,
                password
            });
            navigate("/login", {
                replace: true,
                state: {
                    message:
                        "Registration successful. You can now log in."
                }
            });
        } catch (error) {
            setError(
                error.message ||
                    "Registration failed"
            );
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
                    <h1>Create your account</h1>
                    <p>
                        Start organizing your notes today.
                    </p>
                </div>
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
                        <label htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }
                            autoComplete="name"
                            required
                        />
                    </div>
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
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <button
                        className="auth-form__submit"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating account..."
                            : "Create Account"}
                    </button>
                </form>
                <p className="auth-card__footer">
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>
            </section>
        </main>
    );
}
export default Register;