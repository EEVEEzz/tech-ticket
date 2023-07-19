import React, { useEffect, useState } from "react";
import $ from "jquery";
import { FaRegSun, FaMoon } from "react-icons/fa";

const Theme = () => {
  const [theme, setTheme] = useState("Lofi");

  const toggleTheme = () => {
    if (theme === "lofi") {
      setTheme("dracula");
      $("#submain").attr("data-theme", "dracula");
      localStorage.setItem("theme", "dracula");
    } else {
      setTheme("lofi");
      $("#submain").attr("data-theme", "lofi");
      localStorage.setItem("theme", "lofi");
    }
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme")
      ? setTheme(localStorage.getItem("theme"))
      : localStorage.setItem("theme", "dracula");
  }, [setTheme]);

  return (
    <div className="">
      <div className="">
        <button className="" onClick={toggleTheme}>
          {theme === "lofi" ? (
            <FaMoon className="w-5 h-5" />
          ) : (
            <FaRegSun className="w-5 h-5" />
          )}
        </button>
      </div>

      <div></div>
    </div>
  );
};

export default Theme;
