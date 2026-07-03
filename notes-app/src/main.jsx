import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThemeProvider from "./context/ThemeContext.jsx";
import NotesProvider from "./context/NotesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <NotesProvider>
        <App />
      </NotesProvider>
    </ThemeProvider>
  </StrictMode>,
);
