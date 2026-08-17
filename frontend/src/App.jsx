import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Notes from "./pages/Notes";
import NoteEditor from "./pages/NoteEditor";
import Home from "./pages/Home";
import AppLayout from "./components/AppLayout";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        <Route
                            path="/notes"
                            element={<Notes />}
                        />
                        <Route
                            path="/notes/new"
                            element={<NoteEditor />}
                        />
                        <Route
                            path="/notes/:id"
                            element={<NoteEditor />}
                        />
                        <Route
                            path="/profile"
                            element={<Profile />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;