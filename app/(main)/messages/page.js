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

  useEffect(() => {
    const request = async () => {
      // connect pusher whit my API_KEY
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: "eu",
      });
      // join public channel
      const channel = pusher.subscribe(roomName);

      // mettre en place la logique de stockage et envoi messages avec input == ( a faire les composantn necessaies et les appeler ici et les passer les donnes d'affichage)

      // recuper le nom de l'user depuis la session nextAuth

      // message === recuperé depuis le composant input du messagePanel avec props passé dans le bind du pusher pour lui donner le state actuel
      let sender = session.user.username;
      // axios appel de route api enregister un post
      let responses = await axios.post("/api/pusher", {
        sender: sender,
        channelName: roomName,

        // le message est recuperé depuis l'imput de la modal de discussion
      });
    };

    return () => {
      // unmount
    };
  }, []);

  const showPopUp = useCallback(async () => {
    setPopup(!popup);
  }, [popup]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <Button name="login to get access" path="/login" />;
  }

  return (
    <>
      <Banner />
      <div className="grid grid-cols-[0px_minmax(30px,_2fr)_1500px]  gap-2 mt-8">
        <Container newRoom={showPopUp}>
          <RoomContainer />
        </Container>

        {
          popup ? (
            <Popup roomName={(e) => setRoomName(e.currentTarget.value)} />
          ) : null // enlevé le emit event
        }

        <MessagePanel>

          {/* je map sur la state qui stocke mes messages pour les afficher  */}
          <Input 
          value={(e) => setMessageToSend(e.currentTarget.value)}
          send={message} 
          />
        </MessagePanel>
      </div>
    </>
  );
};

export default Page;
