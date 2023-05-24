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


const Page = () => {
  const { data: session, status } = useSession();
  const [popup, setPopup] = useReducer((prev) => !prev, false);
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState(name);
  const [chats, setchats] = useState([]);

  useEffect(() => {
    pusherLogic();
  }, []);

  const pusherLogic = async () => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "eu",
    });
    const channel = pusher.subscribe(roomName);
    console.log(channel);
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
    
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <Button name="login to get access" path="/login" />;

  // callbacks funsionts pour child input import to messagePanel
 
  return (
    <>
      <Banner />
      <div className="grid grid-cols-[0px_minmax(30px,_2fr)_1500px]  gap-2 mt-8">
        <Container newRoom={setPopup}>
          <RoomContainer />
        </Container>
        {
          popup ? (
            <Popup
              roomName={(e) => setName(e.currentTarget.value)}
              addRoom={() => SEND_MESSAGES_DATA()}
            />
          ) : null
        }
      </div>
    </>
  );
};
export default Page;
