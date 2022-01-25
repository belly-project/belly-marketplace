import { Button, Container, Paper, Stack, styled } from "@mui/material";
import React, { useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { useLocation, useNavigate } from "react-router-dom";

const NavbarContainer = styled(Paper)(({ theme }) => ({
  height: "10vh",
  width: "87vw",
  position: "fixed",
  margin: "auto",
  top: 10,
  left: "12vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#0D1117",
  border: "1px solid gray",
}));

const NavbarLogoContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 0.2,
}));

const NavbarNavigationContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "250px",
}));

const NavbarOptionsContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 0.1,
}));

export default function Navbar() {
  return (
    <NavbarContainer elevation={2}>
      <NavbarLogoContainer>
        <NavbarNavigationContainer spacing={2}></NavbarNavigationContainer>
      </NavbarLogoContainer>
      <NavbarOptionsContainer></NavbarOptionsContainer>
    </NavbarContainer>
  );
}
