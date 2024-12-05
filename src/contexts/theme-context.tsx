import React, { createContext, useState, useContext, useEffect } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("system"); // default to 'system'

  // Apply theme on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Default to system preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      setTheme(systemTheme);
    }

    // Apply the current theme to the HTML document
    applyTheme(theme);
  }, []);

  // Apply theme on theme change
  useEffect(() => {
    // Whenever the theme changes, apply it and save to localStorage
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      setTheme(systemTheme); // Automatically adjust to system preference
    } else {
      applyTheme(theme);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const applyTheme = (theme: string) => {
    document.documentElement.classList.remove("light", "dark");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
