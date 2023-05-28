"use client";
import React from "react";
import { useState, useEffect, useReducer } from "react";
import Button from "@/components/button";
import Container from "@/components/Container";
import RoomContainer from "@/components/roomContainer";
import Popup from "@/components/popup";
import Banner from "@/components/banner";
import axios from "axios";
import { useSession } from "next-auth/react";
import Loader from "@/components/loader";

const Page = () => {
  const [popup, setPopup] = useReducer((prev) => !prev, false);
  const [roomName, setRoomName] = useState("");
  const { data: session, status } = useSession();


  
  const room_name = async () => {
    try {
      let a = await axios.post("/api/pusher", {
        name: roomName,
        userId: session.user.id,
      });
      
      console.log("data", a)
    } catch (error) {
      console.log(error);
      console.log("dddd");
    }
  };

  if (status === "loading") return <Loader />;
  if (status === "unauthenticated")
    return <Button name="login to get access" path="/login" />;

  return (
    <>
      <Banner />
      <div className="grid grid-cols-[0px_minmax(30px,_2fr)_1500px]  gap-2 mt-8">
        <Container newRoom={setPopup}>
          <RoomContainer roomvalue={roomName} />
        </Container>
        {popup ? (
          <Popup
            roomName={(e) => setRoomName(e.currentTarget.value)}
            addRoom={() => room_name()}
          />
        ) : null}
      </div>
    </>
  );
};
export default Page;
