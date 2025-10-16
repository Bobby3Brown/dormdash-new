import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/globals.css";
import App from "./App";
import { UserProvider } from "./context/UserContext";

import { inject } from '@vercel/analytics'
inject()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <App />
  </UserProvider>
);
