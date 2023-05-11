import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req){

    try {
        
        const rooms = await prisma.rooms.findMany({
            orderBy : {
                createdAt : "desc",
            },

        })
        console.log(rooms)
            if(rooms === []) {
                return NextResponse.json('there are no rooms created')
            }
        
        return NextResponse.json(rooms)

    } catch (error) {
        return NextResponse.json(error)
    }

}