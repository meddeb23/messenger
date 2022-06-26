import { createContext } from "react";
import React from "react";
import { useState } from "react";

export const ThemeContext = createContext({
  theme: "",
});

export default function ThemeProvide({ children }) {
  const [currentTheme, setcurrentTheme] = useState(
    localStorage.theme || "dark"
  );
  return (
    <ThemeContext.Provider value={{ currentTheme, setcurrentTheme }}>
      <div className={currentTheme === "dark" ? "dark" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
}
