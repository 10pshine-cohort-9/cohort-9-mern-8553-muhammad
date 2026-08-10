import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getProfile } from "../services/auth";
function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                await getProfile();
                setAuthenticated(true);
            } catch (error) {
                if (error.status === 401) {
                    setAuthenticated(false);
                } else {
                    setError(
                        error.message || "Unable to verify authentication"
                    );
                }
            } finally {
                setLoading(false);
            }
        };
        checkAuthentication();
    }, []);
    if (loading) {
        return <h1>Checking authentication...</h1>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
export default ProtectedRoute;