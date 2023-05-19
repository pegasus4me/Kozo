"use client";
import React from "react";
import { useSession, getSession } from "next-auth/react";
import { useState, useEffect, useMemo, useCallback, useReducer } from "react";
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
  const { data: session, status } = useSession();
  const [popup, setPopup] = useReducer((prev) => !prev, false);
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState(name);
  const [messageToSend, setMessageToSend] = useState("");
  const [message, setMessage] = useState("");
  const [chats, setchats] = useState([]);
  const [modal, setDiscussionModal] = useReducer((prev) => !prev, false);
  
  useEffect(() => {
    pusherLogic()
  }, []);

  console.log("let chats en live" ,chats)

  const pusherLogic = async () => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "eu",
    });
    const channel = pusher.subscribe(roomName);
    console.log(channel)
    let setChannel = channel.bind("messages-event", (data) => {
      
      setchats((previous) => [
        ...previous,
        { sender: data.sender, message: data.message },
      ]);
    });    
  };

  const SEND_MESSAGES_DATA = async () => {
    let sender = session.user.username;
    let userId = session.user.id;
    setRoomName(name);
    try {
      let responses = await axios.post("/api/pusher", {
        sender: sender,
        userId: userId,
        name: name,
        message: message,
      });
      console.log(responses.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <Button name="login to get access" path="/login" />;
  }

  // callbacks funsionts pour child input import to messagePanel
  const onInputChange = (value) => {
    setMessageToSend(value);
  };

  const sendMessage = () => {
    // Logique pour envoyer le message
    setMessage(messageToSend);
    // ici
  };

  return (
    <>
      <Banner />
      <div className="grid grid-cols-[0px_minmax(30px,_2fr)_1500px]  gap-2 mt-8">
        <Container newRoom={setPopup}>
          <RoomContainer
            value={onInputChange}
            send={sendMessage}
            showContainer={setDiscussionModal}
          />
        </Container>

        {modal && <MessagePanel value={onInputChange} send={sendMessage} />}
        {
          popup ? (
            <Popup
              roomName={(e) => setName(e.currentTarget.value)}
              addRoom={() => SEND_MESSAGES_DATA()}
            />
          ) : null // enlevé le emit event
        }
      </div>
    </>
  );
};

export default Page;
