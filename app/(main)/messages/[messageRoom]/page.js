"use client"
import React,{useEffect, useState} from 'react';
import { useParams } from 'next/navigation';
import MessagePanel from '@/components/messagePanel';
import Link from 'next/link';
const Page = () => {
    
    const [messageToSend, setMessageToSend] = useState("");
    const [message, setMessage] = useState("");
    const params = useParams();
    
    const onInputChange = (value) => setMessageToSend(value);
    const sendMessage = () => setMessage(messageToSend);
    
    return (
        <div className="text-center">
            <div className='mb-5'>
            <Link href="/messages" className='font-medium text-green-500 p-5'>++ go home ++</Link>
            </div>
            <MessagePanel
            channelName={params.messageRoom}
            value={onInputChange}
            send={sendMessage}
            />

        </div>
    );
}

export default Page;
