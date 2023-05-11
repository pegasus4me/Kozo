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


const Page = () => {
  
  const [popup, setPopup] = useState(false)
  const [roomName, setRoomName] = useState("")

  useEffect(() => {
    // recuper le nom de l'user depuis la session nextAuth
    // appeler la route avec axios et lui passer les informations du front
    // mettre en place la logique de stockage et envoi messages avec input == ( a faire les composantn necessaies et les appeler ici et les passer les donnes d'affichage)
  },[])

  const showPopUp = useCallback(async () => {
    setPopup(!popup)
  }, [popup]);

  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <Button name="login to get access" path="/login" />;
  }

  return (
    <>
    <Banner />
    <div className="grid grid-cols-5 gap-2 mt-8">
      <Container newRoom={showPopUp}>
        <RoomContainer />
      </Container>

      {
        popup ? <Popup roomName={(e) => setRoomName(e.currentTarget.value) } addRoom={emitEvent}/>: null 
      }
    </div>
    </>
    
  );
};

export default Page;


