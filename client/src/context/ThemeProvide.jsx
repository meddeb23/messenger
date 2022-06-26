import { createContext } from "react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export const ThemeContext = createContext({
  theme: "",
});

const detectOSTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export default function ThemeProvide({ children }) {
  const [currentTheme, setcurrentTheme] = useState(
    localStorage.theme || detectOSTheme()
  );
  useEffect(() => {
    localStorage.theme = currentTheme;
  }, [currentTheme]);
  return (
    <ThemeContext.Provider value={{ currentTheme, setcurrentTheme }}>
      <div className={currentTheme === "dark" ? "dark" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
}
