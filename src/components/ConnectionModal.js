import React from "react";
import ReactModal from "react-modal";
import { changeChainToMumbai } from "../context/utils";
import MetamaskActionButton from "./MetamaskActionButton";

export default function ConnectionModal({ showModal, handleCloseModal }) {
  return (
    <ReactModal
      appElement={document.getElementsByClassName("App")}
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      contentLabel="Minimal Modal Example"
    >
      <>
        <div className="flex flex-col justify-between align-center">
          <h1 className="text-xl text-white">
            You are in the incorrect Network!
          </h1>
          <div className=" flex my-5 items-center text-white">
            <div className="mr-5">
              Please, switch the network to Mumbai Polygon Testnet
            </div>
            <MetamaskActionButton
              text={"Connect"}
              _onClick={() => changeChainToMumbai()}
            />
          </div>
        </div>
      </>
    </ReactModal>
  );
}
