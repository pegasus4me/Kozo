import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
const saltround = 10;


export async function POST(req) {

  if (req.method !== "POST") {
    
    return NextResponse.json({
      statut: "405",
      msg: "only post method are avalaible for this request",
    });
  }

  try {
    const body = await req.json()
    const { firstName, lastName, email, password } = body

    console.log('password =======' , email)    

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json({ message: "email already registerd " });
    }
    
    const hashedPassword = await bcrypt.hash(password, saltround);
    console.log(hashedPassword)
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log("dd", error);
    return NextResponse.json({ status: 500, msg: error });
  }
}

