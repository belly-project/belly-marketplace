import React from 'react';

export default function ChanceBidContainer() {
  return <div className="flex mt-8 flex-wrap justify-center w-full">
              
  <div className="flex flex-col justidy-center  p-2 m-2 bg-[#282b39]">
    <img src="https://i.redd.it/udq9asephmpy.png"></img>

    <div>
      <h4 className="uppercase text-[#a1a6b6]">Simple Crate</h4>
      <div className="flex justify-between align-center mt-2">
        <div className=""> 12.654 BLY  of 50 BLY</div>
        <button className="bg-[#6b7185] p-2 rounded-lg">Watch More</button>
      </div>
    </div>
  </div>
  <div className="flex flex-col justidy-center  p-2 m-2 bg-[#282b39]">
    <img src="https://i.redd.it/udq9asephmpy.png"></img>

    <div>
      <h4 className="uppercase text-[#a1a6b6]">Simple Crate</h4>
      <div className="flex justify-between align-center mt-2">
        <div className="">10 BLY</div>
        <button className="bg-[#6b7185] p-2 rounded-lg">Open</button>
      </div>
    </div>
  </div>
</div>;
}
