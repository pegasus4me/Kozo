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

  const { data: session, status } = useSession();
  const [popup, setPopup] = useState(false);
  const [name, setName] = useState("");

  const [messageToSend, setMessageToSend] = useState("");
  const [message, setMessage] = useState("");

  const [chats, setchats] = useState([]);

  const messagesQ = async () => {
    
    let sender = session.user.username;
    let userId = session.user.id

    // const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    //   cluster: "eu",
    // });
    // const channel = pusher.subscribe(roomName);
  
    // let setChannel = channel.bind("messages-event", (data) => {
    //   console.log("data : ", data);
    //   setchats((previous) => [
    //     ...previous,
    //     { sender: data.sender, message: data.message },
    //   ]);
    // });
    // console.log(setChannel);

    try {
      
      let responses = await axios.post("/api/pusher",{
        // sender: sender,
        userId : userId,
        name : name
        // message : message   //:: ( j'ai ajouté message ici )
  
      });
      console.log(responses.data)
    } catch (error) {
      console.log(error.data)
    }
   
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

  const onInputChange = (value) => {
    setMessageToSend(value);
  };

  const sendMessage = () => {
    // Logique pour envoyer le message
    setMessage(messageToSend);
  };

 
  return (
    <>
      <Banner />
      <div className="grid grid-cols-[0px_minmax(30px,_2fr)_1500px]  gap-2 mt-8">
        <Container newRoom={showPopUp}>
          <RoomContainer value={onInputChange} send={sendMessage} />
        </Container>

        {
          popup ? (
            <Popup
              roomName={(e) => setName(e.currentTarget.value)}
              addRoom={() => messagesQ()}
            />
          ) : null // enlevé le emit event
        }
      </div>

    </>
  );
};

export default Page;
