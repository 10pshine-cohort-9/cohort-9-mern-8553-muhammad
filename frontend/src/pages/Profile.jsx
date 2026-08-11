import { useEffect, useState } from "react";
import { getProfile } from "../services/auth";
function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
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
    if (loading) {
        return <h1>Loading profile...</h1>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}
export default Profile;