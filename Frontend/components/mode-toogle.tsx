"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  
      React.useEffect(() => {
          const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
          if (savedTheme) {
              setTheme(savedTheme);
          }
      }, []);
  
      const toggleTheme = () => {
          const newTheme = theme === 'light' ? 'dark' : 'light';
          setTheme(newTheme);
          localStorage.setItem('theme', newTheme);
      };

  return (
      <button
      style={{border:"0px"
      }}
        onClick={toggleTheme}
        className="p-2 rounded-md transition-colors hover:bg-transparent focus:outline-none"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-foreground" />
        ) : (
          <Moon className="h-5 w-5 text-foreground" />
        )}
      </button>
  );
}
