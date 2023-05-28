"use client";
import React from "react";
import RoomTab from "./roomTab";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";

const RoomContainer = ({ roomvalue }) => {
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    async function getroom() {
      try {
        let create_rooms = await axios.get("/api/Rooms");
        if (create_rooms.data.length === 0)
          return setMessage("Create New Channel");
        for (let i = 0; i < create_rooms.data.length; i++) {
          if (session.user.id === create_rooms.data[i].userId) {
            setRooms((previous) => [...previous, create_rooms.data[i]]);
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    }
    getroom();
  }, []);

  return (
    <div className="border-dotted border-2 border-gray-200 shadow-inner max-w-xs m-auto mt-7 h-4/6 rounded-md p-2 ">
      {!rooms.length !== 0 ? (
        <div>
          {rooms.map((one, index) => {
            return (
              <div key={index}>
                <RoomTab
                  roomName={one.name}
                  showPage={() =>
                    router.push(`/messages/${one.id}`)
                  }
                />
              </div>
            );
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
