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

////////////////

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json({
      statut: "405",
      msg: "only post method are avalaible for this request",
    });
  }

  try {
    const body = await req.json();
    const { message, sender, name, userId } = body;

    const CHECK_ROOM_NAME = await prisma.rooms.findFirst({
      where: {
        name,
        userId,
      },
    });

    if (!CHECK_ROOM_NAME) {
      let a = await prisma.rooms.create({
        data: {
          userId,
          name,
          joinedBy: {
            set: userId,
          },
        },
      });
    } else {
      const update = await prisma.rooms.update({
        where: {
          id: CHECK_ROOM_NAME.id,
        },
        data: {
          joinedBy: {
            set: userId,
          },
        },
      });
    }

    //////////////// pusher
    const response = await pusher.trigger(name, "messages-event", {
      message,
      sender,
    });

    return NextResponse.json({
      statut: 200,
      message: "channel succesfully created",
      data: CHECK_ROOM_NAME,
    });
  } catch (error) {
    NextResponse.json(error);
    console.log(error);
  }
}

/*

   

*/
