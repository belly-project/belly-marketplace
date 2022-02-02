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
              src={"https://i.redd.it/udq9asephmpy.png"}
              alt={"jkaf"}
              width="128"
              height="128"
            />
          </div>
          {!completed ? (
            <div>
              <div className="flex flex-col items-center justify-between">
                <h1 className="text-white">{notCompletedText.msg}</h1>
                {inputValue !== undefined && (
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                )}
                <MetamaskActionButton
                  className={"mt-4"}
                  text={notCompletedText.button}
                  _onClick={action}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col items-center justify-between">
                <h1 className="text-white">{completedText.msg}</h1>
                <MetamaskActionButton
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
