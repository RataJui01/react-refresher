import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("themes");
    return savedTheme ? JSON.parse(savedTheme) : "light";
  });

  function toggleTheme() {
    setTheme((cur) => (cur === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider
      value={{
        onToggleTheme: toggleTheme,
        theme,
        onSetTheme: setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
