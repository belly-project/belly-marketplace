import React from "react";
import ReactModal from "react-modal";
import MetamaskActionButton from "./MetamaskActionButton";

export default function FaucetModal({
  showModal,
  onceCompleted,
  handleCloseModal,
  completed,
  inputValue,
  setInputValue,
  action,
  notCompletedText,
  completedText,
  loading,
  isBlocked,
}) {
  return (
    <ReactModal
      appElement={document.getElementsByClassName("App")}
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      contentLabel="Minimal Modal Example"
    >
      <>
        <div className="flex justify-between w-full align-center">
          {!completed ? (
            <div className="flex items-center justify-between w-full h-full">
              <h1 className="text-white">{notCompletedText.msg}</h1>
              {inputValue !== undefined && (
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              )}
              {loading ? (
                <button
                  className={`flex justify-evenly items-center border-primary-3 border px-4 py-4 relative rounded transition  border text-gray-2`}
                >
                  <div className="w-2 h-2 p-2 border-blue border-4 rounded-lg animate-spin">
                    {" "}
                  </div>
                  <p className="pl-4 text-white">Processing...</p>
                </button>
              ) : (
                <MetamaskActionButton
                  className={"mt-4"}
                  text={notCompletedText.button}
                  _onClick={action}
                />
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between w-full h-full">
              <h1 className="text-white">
                {isBlocked ? "No belly for you..." : completedText.msg}
              </h1>
              <MetamaskActionButton
                className={"mt-4"}
                text={isBlocked ? "Go to Inventory" : completedText.button}
                _onClick={() => onceCompleted()}
              />
            </div>
          )}
        </div>
      </>
    </ReactModal>
  );
}
