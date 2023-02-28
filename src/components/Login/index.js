import { useState } from "react";
import "./styles.css";

const Login = ({ googleLogin, emailLogin }) => {
    const [openEmailSignIn, setopenEmailSignIn] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
        emailLogin(email, password);
    };

    const handleClose = () => {
        setopenEmailSignIn(false);
        setEmail("");
        setPassword("");
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
            ) : (
                <>
                    <button onClick={() => setopenEmailSignIn(true)}>Sign in with Email 📧 </button>
                    <button onClick={() => googleLogin()}>Sign in with Google 🚀 </button>
                </>
            )}
        </div>
    );
};

export default Login;
