import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_MODE === "dev" ? "http://localhost:5000/api" : "/api";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
