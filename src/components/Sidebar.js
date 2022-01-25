import { Button, Container, Paper, Stack, styled } from "@mui/material";
import React, { useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { useLocation, useNavigate } from "react-router-dom";

const SidebarContainer = styled(Paper)(({ theme }) => ({
  height: "96vh",
  width: "10vw",
  margin: "auto",
  left: 10,
  top: 10,
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

const SidebarLogo = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "10px",
  width: "48px",
  height: "48px",
  borderRadius: 999,
  backgroundColor: "#F5F2A4",
}));

export default function Sidebar() {
  return (
    <SidebarContainer elevation={2}>
      <SideBarLogoContainer>
        <SidebarLogo>
          <h2 style={{ color: "#7c7a53" }}>β</h2>
        </SidebarLogo>
      </SideBarLogoContainer>
      <SideBarNavigationContainer spacing={2}></SideBarNavigationContainer>
      <SideBarOptionsContainer></SideBarOptionsContainer>
    </SidebarContainer>
  );
}
