import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { useCookies } from "react-cookie";

function App() {
    const [profile, setProfile] = useState(null);
    const [, setCookies] = useCookies();

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

    const handleLogout = () => {
        googleLogout();
        setProfile(null);
        setCookies("authToken", "");
    };

    const googleLogin = useGoogleLogin({
        onSuccess: codeResponse => {
            handleLogin({ googleAccessToken: codeResponse.access_token });
        },
        onError: error => console.log("Google Login Failed:", error),
    });

    const emailLogin = (email, password) => {
        handleLogin({ email, password });
    };

    const handleLogin = async ({ email, password, googleAccessToken }) => {
        try {
            axios
                .post("http://localhost:8080/user/signin", { email, password, googleAccessToken })
                .then(res => {
                    console.log({ res });
                    setProfile(res.data.result);
                    setCookies("authToken", res.data.token);
                });
        } catch (error) {
            console.log({ error });
        }
    };

    const handleSignUp = async (firstName, lastName, email, password) => {
        try {
            axios
                .post("http://localhost:8080/user/signup", { firstName, lastName, email, password })
                .then(res => {
                    console.log({ res });
                    setProfile(res.data.result);
                    setCookies("authToken", res.data.token);
                });
        } catch (error) {
            console.log({ error });
        }
    };

    return (
        <div className="App">
            <h2>Task Planner</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <h3>User Logged in</h3>
                    <p>Name: {profile.firstName + " " + profile.lastName}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={handleLogout}>Log out</button>
                </div>
            ) : (
                <Login
                    googleLogin={googleLogin}
                    emailLogin={emailLogin}
                    emailSignUp={handleSignUp}
                />
            )}
        </div>
    );
}
export default App;
