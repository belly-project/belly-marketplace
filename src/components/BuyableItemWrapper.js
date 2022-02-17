import React from "react";

export default function BuyableItemWrapper({
  detailItem,
  ItemAction,
  ItemInfo,
  ItemPresentation,
}) {
  return (
    <div className="mt-20 pb-20 sm:pb-32">
      <div className="mx-auto px-16 flex justify-center">
        {detailItem.owner ? (
          <div className="block flex flex-row align-top w-full justify-evenly">
            {ItemPresentation && <ItemPresentation detailItem={detailItem} />}
            <div className="">
              <ItemAction detailItem={detailItem} />
              {ItemInfo && <ItemInfo detailItem={detailItem} />}
            </div>
          </div>
        ) : (
          <>
            {detailItem.price && (
              <div className="block flex flex-row align-top w-full justify-evenly">
                {ItemPresentation && (
                  <ItemPresentation detailItem={detailItem} />
                )}

                <div className="">
                  <ItemAction detailItem={detailItem} />
                  {ItemInfo && <ItemInfo detailItem={detailItem} />}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
