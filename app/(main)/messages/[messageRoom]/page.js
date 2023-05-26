"use client";
import { useSession} from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MessagePanel from "@/components/messagePanel";
import Link from "next/link";
import Pusher from "pusher-js";
import axios from "axios";
import { useContext } from "react";
import { Context } from "@/app/actions/context";

const Page = () => {
  const { data: session, status } = useSession();
  const params = useParams();
  const [messageToSend, setMessageToSend] = useState("");
  const [message, setMessage] = useState("");
  
  const value  = useContext(Context);
  console.log(value);
  useEffect(() => {
   
  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: "eu",
  });

  // challenge c'est de recuperer le name crée et l'ajouter au params
     const channel = pusher.subscribe(params.messageRoom);
  //   console.log(channel);
  //   let setChannel = channel.bind("messages-event", (data) => {
  //     setchats((previous) => [
  //       ...previous,
  //       { sender: data.sender, message: data.message },
  //     ]);
  //   });
 
  }, []);
  // let sender = session.user.username;
  // let userId = session.user.id;
  // conenction pusher  
  const onInputChange = (value) => setMessageToSend(value);
  const sendMessage = () => setMessage(messageToSend);

 
  return (
    <div className="text-center">
      <div className="mb-5">
        <Link href="/messages" className="font-medium text-green-500 p-5">++ go home ++</Link>
      </div>
      <MessagePanel
        channelName={params.messageRoom}
        value={onInputChange}
        send={sendMessage}
      />

    </div>
  );
};

export default Page;

// s