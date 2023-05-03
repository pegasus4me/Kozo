import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const {email , password} = credentials
        if(!email || !password) {
            throw new Error("email or password must be provided...")
        }

        


      },
    }),
  ],
};
export default NextAuth(authOptions);



/***
 * 
 * 
 * const user = await prisma.user.findUnique({
            where : {
                email : email
            }
        });

        if(!user || !user.hashedPassword) {
                throw new Error('Email does not exist')
        }
 */