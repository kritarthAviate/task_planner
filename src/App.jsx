import axios from "axios";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Tasklist from "./components/Tasklist";

function App() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("http://localhost:8080/user/me", {
                    withCredentials: true,
                });
                setProfile(res.data.result);
            } catch (error) {
                console.log({ error });
            }
        };
        checkAuth();
    }, []);

    return (
        <div className="App">
            {profile ? (
                <>
                    <Navbar profile={profile} setProfile={setProfile} />
                    <Tasklist profile={profile} />
                </>
            ) : (
                <>
                    <Login setProfile={setProfile} />
                </>
            )}
        </div>
    );
}
export default App;
