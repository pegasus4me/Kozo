import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req) {
  let value = req.headers.get("referer");
  let split = value.split("/messages/")[1];

  try {
    const findOneRoom = await prisma.rooms.findFirst({
      where: {
        id: split,
      },
    });

    if (!findOneRoom) return NextResponse.json({ msg: "room not found" });

    return NextResponse.json({
      statut: 200,
      message: "this room exist",
      data: findOneRoom,
    });
  } catch (error) {
    console.log(error);
  }
}
