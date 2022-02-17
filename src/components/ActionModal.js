import React from "react";
import ReactModal from "react-modal";
import MetamaskActionButton from "./MetamaskActionButton";

export default function ActionModal({
  item,
  showModal,
  onceCompleted,
  handleCloseModal,
  completed,
  inputValue,
  setInputValue,
  action,
  notCompletedText,
  completedText,
  image,
  loading,
  disabledAction,
}) {
  return (
    <ReactModal
      appElement={document.getElementsByClassName("App")}
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      contentLabel="Minimal Modal Example"
    >
      <>
        <div className="flex justify-between align-center">
          <div>
            <img
              src={image ? image : "https://i.redd.it/udq9asephmpy.png"}
              alt={"jkaf"}
              width="128"
              height="128"
            />
          </div>
          {!completed ? (
            <div>
              <div className="flex flex-col items-center justify-between h-full">
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
                    className={`flex justify-evenly items-center border-[#3a3f50] border px-4 py-4 relative rounded transition  border text-gray-2`}
                  >
                    <div className="w-2 h-2 p-2 border-blue border-4 rounded-lg animate-spin">
                      {" "}
                    </div>
                    <p className="pl-4 text-white">Processing...</p>
                  </button>
                ) : (
                  <MetamaskActionButton
                    disabled={disabledAction}
                    className={"mt-4"}
                    text={notCompletedText.button}
                    _onClick={action}
                  />
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col items-center justify-between">
                <h1 className="text-white">{completedText.msg}</h1>
                <MetamaskActionButton
                  disabled={disabledAction}
                  className={"mt-4"}
                  text={completedText.button}
                  _onClick={() => onceCompleted()}
                />
              </div>
            </div>
          )}
        </div>
      </>
    </ReactModal>
  );
}
