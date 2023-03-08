import { useState } from "react";
import "./styles.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = ({ setProfile }) => {
    const [openEmailSignIn, setOpenEmailSignIn] = useState(false);
    const [openSignUpForm, setOpenSignUpForm] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");

    // eslint-disable-next-line no-undef
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

    const handleSubmit = e => {
        e.preventDefault();
        emailLogin(email, password);
    };

    const handleClose = () => {
        setOpenSignUpForm(false);
        setOpenEmailSignIn(false);
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setError("");
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
            const response = await axios.post(
                `${backendUrl}/user/signin`,
                {
                    email,
                    password,
                    googleAccessToken,
                },
                {
                    withCredentials: true,
                },
            );

            setProfile(response.data.result);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const handleSignUp = async event => {
        event.preventDefault();
        try {
            const res = await axios.post(
                `${backendUrl}/user/signup`,
                {
                    firstName,
                    lastName,
                    email,
                    password,
                },
                {
                    withCredentials: true,
                },
            );
            setProfile(res.data.result);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="flexBoxColumn">
            <h2>Task Planner</h2>

            {openEmailSignIn ? (
                <form onSubmit={handleSubmit} className="formWrapper">
                    <div className="inputWrapper">
                        <label>Email:</label>
                        <input
                            type={"email"}
                            label={"Email"}
                            placeholder="enter email address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="inputWrapper">
                        <label>Password:</label>
                        <input
                            type={"password"}
                            placeholder="enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {!!error && <span className="errorText">{error}</span>}
                    <div className="buttonWrapper">
                        <button className="textButton" type="submit">
                            Login
                        </button>
                        <button className="textButton" onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            ) : openSignUpForm ? (
                <form onSubmit={handleSignUp} className="formWrapper">
                    <div className="inputWrapper">
                        <label>First Name:</label>
                        <input
                            type={"text"}
                            label={"First Name"}
                            placeholder="enter first name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="inputWrapper">
                        <label>Last Name:</label>
                        <input
                            type={"text"}
                            label={"Last Name"}
                            placeholder="enter last name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="inputWrapper">
                        <label>Email:</label>
                        <input
                            type={"email"}
                            label={"Email"}
                            placeholder="enter email address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="inputWrapper">
                        <label>Password:</label>
                        <input
                            type={"password"}
                            placeholder="enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {!!error && <span className="errorText">{error}</span>}
                    <div className="buttonWrapper">
                        <button className="textButton" type="submit">
                            SignUp
                        </button>
                        <button className="textButton" onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <button className="loginButton" onClick={() => setOpenEmailSignIn(true)}>
                        Sign in with Email 📧
                    </button>
                    <button className="loginButton" onClick={() => googleLogin()}>
                        Continue with Google 🚀
                    </button>
                    <span className="signupText">
                        Not a user?
                        <span className="signup" onClick={() => setOpenSignUpForm(true)}>
                            SignUp
                        </span>
                    </span>
                </>
            )}
        </div>
    );
};

export default Login;
