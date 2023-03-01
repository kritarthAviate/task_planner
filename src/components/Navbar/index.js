import React from "react";
import "./styles.css";
import { googleLogout } from "@react-oauth/google";
import { useCookies } from "react-cookie";

const Navbar = ({ profile, setProfile }) => {
    const [, , removeCookie] = useCookies();

    const handleLogout = () => {
        googleLogout();
        setProfile(null);
        removeCookie("authToken");
    };

    return (
        <div className="navbarWrapper">
            <span className="appName">Task Planner</span>
            <div className="userInfo">
                <span>Hi, {profile.firstName}</span>
                <span className="logout" onClick={handleLogout}>
                    Logout
                </span>
            </div>
        </div>
    );
};

export default Navbar;
