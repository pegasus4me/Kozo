'use client';
import React from 'react';
import { useSession } from 'next-auth/react';

const Message = ({sender, message}) => {
   
    const { data: session, status } = useSession();
    return (
        <div className={`flex flex-col mt-3`}>
            <div className={`bg-white m-auto max-h-80 rounded-md border p-4 text-start min-w-[40%] ${sender !== session.user.username ? "bg-gray-100" : "border-green-400"} `}>
                <h3 className='font-medium text-slate-900'>{message}</h3>
            </div>
            <p className='text-xs text-slate-500 text-start'>send by : {sender}</p>
        </div>
    );
}

export default Message;
