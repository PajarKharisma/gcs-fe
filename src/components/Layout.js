import React from "react";
import { Box, Paper, Typography, CssBaseline, Container } from "@mui/material";
import BottomNavBar from "./BottomNavBar";
import MenuBar from "./MenuBar";

const Layout = ({ children }) => {
  return (
    <>
      <MenuBar />
      <CssBaseline />
      {children}
      <BottomNavBar />
    </>
  );
};

export default Layout;
