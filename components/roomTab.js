import React from "react";

const RoomTab = ({ roomName, showPage }) => {
  return (
    <div
      className="max-w-lg h-10 rounded-md flex justify-center items-center bg-green-500 mb-2 hover:bg-green-600"
      onClick={showPage}
    >
      <p className="font-medium text-slate-200">{roomName}</p>
    </div>
  );
};

export default RoomTab;
