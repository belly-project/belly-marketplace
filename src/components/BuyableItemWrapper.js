import React from "react";

export default function BuyableItemWrapper({ children }) {
  return (
    <div className="block max-w-md md:inline-block md:w-50 align-top">
      {children}
    </div>
  );
}
