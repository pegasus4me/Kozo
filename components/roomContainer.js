"use client";
import React from "react";
import RoomTab from "./roomTab";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect, useReducer } from "react";
import MessagePanel from "./messagePanel";

const RoomContainer = ({ send, value }) => {
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [tabColor, setTabColor] = useState("bg-green-500");
  const { data: session, status } = useSession();
  const [modal, setDiscussionModal] = useState(false);

  useEffect(() => {
    async function getroom() {
      
      try {
        let create_rooms = await axios.get("/api/Rooms");
        if (create_rooms.data.length === 0) {
          return setMessage("Create New Channel");
        }
        setRooms(create_rooms.data);
        
        // if (create_rooms.data.userId !== session.user.id) {
        //   // spot de diffrence betweeen two rooms
        //   setTabColor("bg-red-500");
        // }
      
      } catch (error) {
        throw new Error(error);
      }
    }
    getroom();
  }, []);

  function showModal() {
    setDiscussionModal(!modal);
    if (modal) {
      return <MessagePanel send={send} value={value} />;
    } else {
      return null;
    }
  }

  return (
    <div className="border-dotted border-2 border-gray-200 shadow-inner max-w-xs m-auto mt-7 h-4/6 rounded-md p-2 ">
      {!rooms.length !== 0 ? (
        <div>
          {rooms.map((one) => {
            // update here  the return statement
            return (
              <RoomTab
                roomName={one.name}
                color={tabColor}
                showDiscussionModal={showModal}
              />
            ); // info room derriere
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-80 w-32 m-auto">
          <p className="text-md text-gray-300 font-medium">{message}</p>
        </div>
      )}
    </div>
  );
};

export default RoomContainer;
