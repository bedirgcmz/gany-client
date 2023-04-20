import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import GanyContextProvider from "./Contexts/GanyContext";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={"dev--pmx--15.us.auth0.com"}
      clientId={"Nldd4qPYvcBfwZZG6gpEw5H9jKOwcCX0"}
      redirectUri={window.location.origin}
    >
      <GanyContextProvider>
        <App />
      </GanyContextProvider>
    </Auth0Provider>
  </React.StrictMode>
);
