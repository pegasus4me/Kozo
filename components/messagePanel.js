import React from "react";
import Input from "./input";

const MessagePanel = ({ channelName, send, value , children}) => {
  return (
    <div className="bg-white max-w-[70%] m-auto h-auto rounded-md shadow-lg p-6 overflow-auto">
      <p className="font-medium text-slate-900 flex text-xs  "># {channelName}</p>
      {/* recuperer les messages depuis la bdd et boucler ici */}
      {children}
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
