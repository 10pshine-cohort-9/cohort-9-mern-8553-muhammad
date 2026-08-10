import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getProfile } from "../services/auth";
function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                await getProfile();
                setAuthenticated(true);
            } catch {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuthentication();
    }, []);
    if (loading) {
        return <h1>Checking authentication...</h1>;
    }
    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
export default ProtectedRoute;