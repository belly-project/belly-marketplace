import React, { createContext, useContext, useEffect, useReducer } from "react";

const ContractContext = createContext();

const ContractProvider = ({ reducer, initialState, children }) => {
  return (
    <ContractContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContractsContext = () => useContext(ContractContext);
export default ContractProvider;
