import { NextResponse } from "next/server";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function POST(req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
    NextResponse.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log('New client connected')
  })

  //    io.on("connection", (socket) => {
  //      console.log(`user connected ${socket.id}`)

  //     socket.on("send_message", (data) => {
  //         console.log(data)
  //     })

  //     socket.on("createRoom", async (roomName, userId) => {
  //       try {

  //         socket.emit("hello word")
  //         // const body = await req.json();
  //         // const { name, userId } = body

  //         // prisma register room to db ================
  //         const createdRoom = await prisma.rooms.create({
  //           data: {
  //             roomName,
  //             userId,
  //           },
  //         });
  //         console.log("Nouvelle salle créée :", createdRoom);

  //       } catch (error) {
  //         console.log(error);
  //       }
  //     });
  // });
}
