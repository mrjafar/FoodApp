import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { useState } from "react";
import LoginPopup from "../UI/LoginPopUP/LoginPopup";

export const AppLayout = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
