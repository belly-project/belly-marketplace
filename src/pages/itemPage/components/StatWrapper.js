import React from "react";

export default function StatWrapper({ stat }) {
  return (
    <div className="w-1/2 sm:w-auto mb-4">
      <div className="text-10 leading-14 font-bold tracking-1 mb-2 uppercase text-gray-1">
        {stat.name}
      </div>
      <div className="flex items-center">
        {stat.icon}
        <div className="ml-2 text-xl leading-24">{stat.value}</div>
      </div>
    </div>
  );
}
