import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { useCookies } from "react-cookie";

function App() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [, setCookies] = useCookies();
    // console.log({ user, profile });
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    const googleLogin = useGoogleLogin({
        onSuccess: codeResponse => {
            setUser(codeResponse);
            handleLogin({ provider: "Google", OAuthToken: codeResponse.access_token });
        },
        onError: error => console.log("Google Login Failed:", error),
    });

    const emailLogin = (email, password) => {
        handleLogin({ email, password });
    };

    const handleLogin = async ({ email, password, provider, OAuthToken }) => {
        try {
            // const config = {
            //     method: "post",
            //     url: "http://localhost:6000/user/login",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     data: JSON.stringify({
            //         email,
            //         password,
            //         provider,
            //         OAuthToken,
            //     }),
            // };
            // const response = await axios(config);
            axios
                .post("http://localhost:6000/user/login", { email, password, provider, OAuthToken })
                .then(res => {
                    console.log({ res });
                    setCookies("authToken", res.data.token);
                });
        } catch (error) {
            console.log({ error });
        }
    };

    useEffect(() => {
        if (user) {
            axios
                .get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: "application/json",
                        },
                    },
                )
                .then(res => {
                    setProfile(res.data);
                })
                .catch(err => console.log(err));
        }
    }, [user]);

    return (
        <div className="App">
            <h2>Task Planner</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <Login googleLogin={googleLogin} emailLogin={emailLogin} />
            )}
        </div>
    );
}
export default App;
