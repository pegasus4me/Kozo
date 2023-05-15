import Pusher from "pusher";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
});


export async function POST(req) {
  try {
    const body = await req.json();
    const { message, sender, channelName } = body; // channelName recuperé depuis le font

    const response = await pusher.trigger(channelName, "messages-event", {
      message,
      sender,
    });

    const SAVE_CHANNEL_TO_DATABASE = await prisma.rooms.create({
      data: {
        name: channelName,
      },
    });
    return NextResponse.json({
      statut: 200,
      message: "channel succesfully created",
      data: SAVE_CHANNEL_TO_DATABASE,
    });
  } catch (error) {
    NextResponse.json(error);
  }
}
