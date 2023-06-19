import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Suggestions from "./Suggestions";
import Navbar from "./Navbar";

function RootLayout() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="grid grid-cols-12 divide-x">
        <SideBar />
        <div className="grid col-span-7 justify-items-center gap-4 mt-6">
          <Outlet />
        </div>
        <Suggestions />
      </div>
    </div>
  );
}

export default RootLayout;
