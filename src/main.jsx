import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/* 🔥 TOAST */
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    {/* 🔥 TOASTER */}
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "#111",
          color: "#fff",
          borderRadius: "14px",
          padding: "12px 16px",
          fontSize: "14px",
        },
      }}
    />

    <App />

  </React.StrictMode>
);
