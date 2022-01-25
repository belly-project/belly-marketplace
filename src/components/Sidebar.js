import { Button, Container, Paper, Stack, styled } from "@mui/material";
import React, { useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { useLocation, useNavigate } from "react-router-dom";

const SidebarContainer = styled(Paper)(({ theme }) => ({
  height: "95vh",
  width: "10vw",
  position: "fixed",
  margin: "auto",
  left: 10,
  top: 10,
  bottom: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#0D1117",
  border: "1px solid gray",
}));

const SideBarLogoContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 0.2,
}));

const SideBarNavigationContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "250px",
}));

const SideBarOptionsContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 0.1,
}));

export default function Sidebar() {
  return (
    <SidebarContainer elevation={2}>
      <SideBarLogoContainer>
        <SideBarNavigationContainer spacing={2}></SideBarNavigationContainer>
      </SideBarLogoContainer>
      <SideBarOptionsContainer></SideBarOptionsContainer>
    </SidebarContainer>
  );
}
