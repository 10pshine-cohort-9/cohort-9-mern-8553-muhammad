import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Notes from "./pages/Notes";
import NoteEditor from "./pages/NoteEditor";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<h1>Notes App</h1>}
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/notes"
                    element={
                        <ProtectedRoute>
                            <Notes />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/notes/new"
                    element={
                        <ProtectedRoute>
                            <NoteEditor />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/notes/:id"
                    element={
                        <ProtectedRoute>
                            <NoteEditor />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
export default App;