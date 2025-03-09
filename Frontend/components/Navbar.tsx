import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Moon, Sun, Search, Bell } from "lucide-react";

type NavbarProps = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  
  // Set navbar width based on route
  const navbarWidth = "98%";

  return (
    <div
      style={{
        width: navbarWidth,
        height:'1.8rem',
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: theme === "dark" ? "#1a1a1a" : "transparent",
        transition: "width 0.3s ease-in-out",
      }}
    >
      {/* Left Side - Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        
      </button>
      <img src="logo.svg" alt="SwasthyaAI" width="300" style={{marginTop:"20px"}}/>
      {/* Right Side - Search & Notification Icons */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Expanding Search Box */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: searchActive ? "1px solid gray" : "none",
            borderRadius: "15px",
            padding: searchActive ? "5px 8px" : "0",
            backgroundColor: searchActive ? "#ffffff" : "transparent",
            transition: "width 0.3s ease-in-out",
            width: searchActive ? "200px" : "24px",
            height: "22px",
          }}
        >
          <Search
            size={24}
            style={{
              cursor: "pointer",
              color: theme === "dark" ? "white" : "black",
            }}
            onClick={() => setSearchActive(true)}
          />
          {searchActive && (
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              placeholder="Search..."
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                marginLeft: "10px",
                fontSize: "14px",
                background: "transparent",
                color: theme === "dark" ? "white" : "black",
              }}
              onBlur={() => {
                if (searchQuery === "") setSearchActive(false);
              }}
            />
          )}
        </div>

        {/* Notification Icon */}
        <Bell
          size={24}
          style={{
            cursor: "pointer",
            color: theme === "dark" ? "white" : "black",
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
