import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                axios.get("http://localhost:8080/user/me", { withCredentials: true }).then(res => {
                    console.log({ res });
                    setProfile(res.data.result);
                });
            } catch (error) {
                console.log({ error });
            }
        };
        checkAuth();
    }, []);

    return (
        <div className="App">
            {profile ? (
                <Navbar profile={profile} setProfile={setProfile} />
            ) : (
                <>
                    <Login setProfile={setProfile} />
                </>
            )}
        </div>
    );
}
export default App;
