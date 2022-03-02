import React from "react";
import ReactModal from "react-modal";
import { changeChainToMumbai } from "../../context/utils";
import MetamaskActionButton from "./../MetamaskActionButton";
import BasicModal from "./../BasicModal";

export default function ConnectionModal({ showModal, handleCloseModal }) {
  return (
    <BasicModal handleCloseModal={handleCloseModal} showModal={showModal}>
      <>
        <h1 className="text-xl text-white">
          You are in the incorrect Network!
        </h1>
        <div className=" flex my-5 items-center text-white">
          <div className="mr-5 md:text-xs">
            Please, switch the network to Mumbai Polygon Testnet
          </div>
          <MetamaskActionButton
            text={"Connect"}
            _onClick={() => changeChainToMumbai()}
          />
        </div>
      </>
    </BasicModal>
  );
}
