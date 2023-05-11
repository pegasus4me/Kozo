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

/*
 * cette route la va subscribe a channel (pusher.subscribe(channelName) avec pusher + on va le save dans le model Room dans notre BDD 
coté client on va utiliser notre state qui stocke le nom attribué a la room et on va le passe au prima.create()
ce nom sera aussi passé en relais a mon composant qui gere l'affichage des rooms dans la modal 

pour partir d'une discussion on va utiliser (pusher.unsubscribe(channelName)

// 1----
au Click sur chaque tab j'affiche la page de disscussion associé a celle ci
events == packaging messages in the Channels

*/
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
