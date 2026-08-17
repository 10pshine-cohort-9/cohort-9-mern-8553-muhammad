import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
    return (
        <main className="home-page">
            <section className="home-page__hero">
                <p className="home-page__eyebrow">
                    Simple. Organized. Yours.
                </p>
                <h1>Notes App</h1>
                <p className="home-page__description">
                    Create, organize, and manage your notes
                    in one simple workspace.
                </p>
                <div className="home-page__actions">
                    <Link
                        className="home-page__button home-page__button--primary"
                        to="/register"
                    >
                        Get Started
                    </Link>
                    <Link
                        className="home-page__button home-page__button--secondary"
                        to="/login"
                    >
                        Login
                    </Link>
                </div>
            </section>
            <section className="home-page__features">
                <article className="home-page__feature">
                    <h2>Create Notes</h2>
                    <p>
                        Write and format your notes with
                        the rich note editor.
                    </p>
                </article>
                <article className="home-page__feature">
                    <h2>Stay Organized</h2>
                    <p>
                        Keep your notes together in one
                        easy-to-use workspace.
                    </p>
                </article>
                <article className="home-page__feature">
                    <h2>Access Anywhere</h2>
                    <p>
                        Sign in to access your notes and
                        manage your personal workspace.
                    </p>
                </article>
            </section>
        </main>
    );
}
export default Home;