"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MessagePanel from "@/components/messagePanel";
import Link from "next/link";
import Pusher from "pusher-js";
import axios from "axios";
import Loader from "@/components/loader";
import Message from "@/components/message";
const Page = () => {
  const { data: session, status } = useSession();
  const [messageToSend, setMessageToSend] = useState("");
  const [chats, setChats] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(true);
  const [roomNameLoaded, setRoomNameLoaded] = useState(false);
  const [persistMessages , setPersistVal] = useState('')
  useEffect(() => {
    if (!roomNameLoaded) {
      findOneRoom();
    } else {
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: "eu",
      });
      const channel = pusher.subscribe(roomName);
      channel.bind("messages-event", (data) => {
        setChats((chats) => [...chats, data]);
      });
    }
  }, [roomName, roomNameLoaded]);
      
  const findOneRoom = async () => {
    try {
      let check = await axios.get("/api/oneRoom");
      setLoading(false);
      setRoomNameLoaded(true);
      setRoomName(check.data.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Send message and redirect
   */
  const handleSubmit = async () => {
    try {
      await axios.post("/api/pusher", {
        name: roomName,
        message: messageToSend,
        sender: session.user.username,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onInputChange = (value) => setMessageToSend(value);
  return (
    <div className="text-center">
      <div className="mb-5">
        <Link href="/messages" className="font-medium text-green-500 p-5 hover:underline">
        go home 
        </Link>
      </div>
      {loading ? (
        <Loader />
      ) : roomName ? (
        <MessagePanel
          user={session.user.username}
          channelName={roomName}
          value={onInputChange}
          send={handleSubmit}
        >
          {chats.map((chat, index) => (
            <Message sender={chat.sender} message={chat.message} key={index}/>
          ))}
        </MessagePanel>
      ) : null}
    </div>
  );
};

export default Page;


/**
 * 
 * fix probleme reception message sur chat state
 * fix overflow scroll
 * fix deux messages qui pop une fois je clique sur enter ()
 * 
 */