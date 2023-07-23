import React, { useEffect, useState } from "react";
import $ from "jquery";
import { FaRegSun, FaMoon } from "react-icons/fa";

const Theme = () => {
  const [theme, setTheme] = useState("business");

  const toggleTheme = () => {
    if (theme === "business") {
      setTheme("night");
      $("#submain").attr("data-theme", "night");
      localStorage.setItem("theme", "night");
    } else {
      setTheme("business");
      $("#submain").attr("data-theme", "business");
      localStorage.setItem("theme", "business");
    }
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme")
      ? setTheme(localStorage.getItem("theme"))
      : localStorage.setItem("theme", "night");
  }, [setTheme]);

  return (
    <div className="">
      <div className="">
        <div className="" onClick={toggleTheme}>
          {theme === "business" ? (
            <FaMoon className="w-5 h-5" />
          ) : (
            <FaRegSun className="w-5 h-5" />
          )}
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Theme;
