import React from "react";
import Input from "./input";

const MessagePanel = ({ channelName, send, value }) => {
  return (
    <div className="bg-white max-w-[70%] max-h-80 rounded-md shadow-lg p-6">
      <p className="text-xl font-medium text-slate-900"># {channelName}</p>

      <div>
        <Input 
            send={send} 
            value={value} 
        />
      </div>
    </div>
  );
};

export default MessagePanel;
