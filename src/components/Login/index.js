import { useState } from "react";
import "./styles.css";

const Login = ({ googleLogin, emailLogin, emailSignUp }) => {
    const [openEmailSignIn, setOpenEmailSignIn] = useState(false);
    const [openSignUpForm, setOpenSignUpForm] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
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
    };

    const handleSignUp = e => {
        e.preventDefault();
        emailSignUp(firstName, lastName, email, password);
    };

    return (
        <div className="flexBoxColumn">
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
                        />
                    </div>
                    <div className="inputWrapper">
                        <label>Password:</label>
                        <input
                            type={"password"}
                            placeholder="enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="buttonWrapper">
                        <button type="submit">Login</button>
                        <button onClick={handleClose}>Cancel</button>
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
                            autoFocus
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
                            autoFocus
                        />
                    </div>
                    <div className="inputWrapper">
                        <label>Password:</label>
                        <input
                            type={"password"}
                            placeholder="enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="buttonWrapper">
                        <button type="submit">SignUp</button>
                        <button onClick={handleClose}>Cancel</button>
                    </div>
                </form>
            ) : (
                <>
                    <button onClick={() => setOpenEmailSignIn(true)}>Sign in with Email 📧 </button>
                    <button onClick={() => googleLogin()}>Continue with Google 🚀 </button>
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
