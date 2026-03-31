import React from "react";
import SideBar from "../../components/SideBar";
import { Outlet } from "react-router-dom";
import HeaderBar from "../../components/HeaderBar";

const HomeLayout = () => {
  return (
    <>
      <SideBar />
      <HeaderBar />
      <Outlet />
    </>
  );
};

export default HomeLayout;
