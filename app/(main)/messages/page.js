"use client";
import React from "react";
import { useSession, getSession } from "next-auth/react";
import { useState, useEffect, useMemo, useCallback } from "react";
import Button from "@/components/button";
import Container from "@/components/Container";
import RoomContainer from "@/components/roomContainer";
import Popup from "@/components/popup";
import Banner from "@/components/banner";
import axios from "axios";
import Pusher from "pusher-js";
import MessagePanel from "@/components/messagePanel";
import Input from "@/components/input";

const Page = () => {
  const [popup, setPopup] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [messageToSend, setMessageToSend] = useState("");
  const { data: session, status } = useSession();
  const [chats, setchats] = useState([]);
  
  const messagesQ = async () => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "eu",
    });
    const channel = pusher.subscribe(roomName);
    let sender = session.user.username;

    let a = channel.bind("messages-event", (data) => {
      console.log("data : ", data);
      setchats((previous) => [
        ...previous,
        { sender: data.sender, message: data.message },
      ]);
    });
    console.log(a);

    // let responses = await axios.post("/api/pusher", {
    //   sender: sender,
    //   channelName: roomName,

    // });
  };



  const showPopUp = useCallback(async () => {
    setPopup(!popup);
  }, [popup]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <Button name="login to get access" path="/login" />;
  }


  const handleInputChange = (value) => {
    setMessageToSend(value);
  };


  const sendMessage = () => {
    // Logique pour envoyer le message
    console.log('message: ', messageToSend)
  };

  return (
    <>
      <Banner />
      <div className="grid grid-cols-[0px_minmax(30px,_2fr)_1500px]  gap-2 mt-8">
        <Container newRoom={showPopUp}>
          <RoomContainer
            onInputChange ={handleInputChange}
            send={handleInputChange}
            value={messageToSend}

          />
        </Container>

        {
          popup ? (
            <Popup
              roomName={(e) => setRoomName(e.currentTarget.value)}
              addRoom={() => messagesQ()}
            />
          ) : null // enlevé le emit event
        }
      </div>
      <MessagePanel />
    </>
  );
};

export default Page;
