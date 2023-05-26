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
import { Context } from "@/app/actions/context";
import Loader from "@/components/loader";
import Link from "next/link";

const Page = () => {
  const [popup, setPopup] = useReducer((prev) => !prev, false);
  const [roomName, setRoomName] = useState("");
  const { data: session, status } = useSession();
  const [rooms, setRooms] = useState([]);


  const room_name = async () => {
    try {
      let createdRoom = await axios.post("/api/pusher", {
        name: roomName,
        userId: session.user.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") return <Loader />;
  if (status === "unauthenticated")
    return <Button name="login to get access" path="/login" />;

  return (
    <Context.Provider value={roomName}>
      <Banner />
      <div className="grid grid-cols-[0px_minmax(30px,_2fr)_1500px]  gap-2 mt-8">
        <Container newRoom={setPopup}>
          <RoomContainer roomvalue={roomName}/>
        </Container>
        {popup ? (
          <Popup
            roomName={(e) => setRoomName(e.currentTarget.value)}
            addRoom={() => room_name()}
          />
        ) : null}
      </div>

      {/* {rooms.map((one, index) => {
        return (
          <Link
            href={{
              pathname: `/messages/${one.id}`,
              query: roomName, // the data
            }}
          >
          </Link>
        );
      })} */}
    </Context.Provider>
  );
};
export default Page;
