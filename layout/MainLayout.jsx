import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;