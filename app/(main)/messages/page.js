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
import { io } from "socket.io-client";



const Page = () => {
  
  const [popup, setPopup] = useState(false)
  const [roomName, setRoomName] = useState("")

  const showPopUp = useCallback(async () => {
    // display modal
    setPopup(!popup)
    // save new Room on databse + establish socketIO connection 
    // trouver l'id et le passer dans le emit
    
  }, [popup]);
  useEffect(() => emitSocketEvents(), [])

  const emitSocketEvents = async() =>{
    let socket;
    await fetch('/api/socket')
    socket = io()
    
    socket.on('connect', () => {
      console.log('connected')
    })
    return null
  }

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
        <RoomContainer rooms={["ddd", "ddddd"]}></RoomContainer>
      </Container>

      {
        popup ? <Popup roomName={(e) => setRoomName(e.currentTarget.value) } addRoom={emitSocketEvents}/>: null 
      }
    </div>
    </>
    
  );
};

export default Page;


