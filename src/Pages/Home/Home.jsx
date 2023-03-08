import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Header />
      <div className="homeBody">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
