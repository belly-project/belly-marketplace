import { Paper, styled } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useContractsContext } from "../context/ContractProvider";

import MarketItems from "./MarketItems";

const MarketplaceContainer = styled(Paper)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#0D1117",
  border: "1px solid gray",
}));

export default function MarketPlaceContainer() {
  return (
    <MarketplaceContainer elevation={2}>
      <h1>Market Items</h1>
      <MarketItems />
    </MarketplaceContainer>
  );
}
