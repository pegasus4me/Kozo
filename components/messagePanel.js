"use client";
import React from "react";
import Input from "./input";
import { useSession } from 'next-auth/react';

const MessagePanel = ({ channelName, send, value , children, user}) => {

  const { data: session, status } = useSession();
  return (
    <div className="bg-white max-w-[70%] m-auto h-auto rounded-md shadow-lg p-6 overflow-auto border ">
      <p className="font-medium text-slate-900 flex text-xs  "># {channelName}</p>
      <div className={`p-3 border-dashed border rounded-sm m-2 flex flex-col ${user === session.user.username ? "justify-start items-start" :  "justify-end items-end"}`}>
      {children}
      </div>
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
