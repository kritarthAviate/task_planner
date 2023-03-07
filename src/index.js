import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CookiesProvider } from "react-cookie";

const clientId = process.env.REACT_APP_OAUTH_CLIENTID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GoogleOAuthProvider clientId={clientId}>
        <CookiesProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </CookiesProvider>
    </GoogleOAuthProvider>,
);
