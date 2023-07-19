import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState("dracula");

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
    } else {
      localStorage.setItem("theme", "dracula");
    }
  }, [setTheme]);

  return (
    <div>
      <div id="submain" data-theme={theme} className=" border">
        <div className="header"><Header /></div>
          <div className="container mx-auto  pt-5 pb-10">
            <Outlet />
          </div>
          <div className="footer"><Footer /></div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
