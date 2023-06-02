import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("email or password must be provided...");
        }
        const user = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });
        console.log("voici l'user", user)

        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }

        const checkPassword = await compare(password, user.hashedPassword);

        if (!checkPassword) throw new Error("password not correct");

        return user;
      },
    }),
  ],
  pages: {
    signin: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  jwt: {
    secret: process.env.NEXT_AUTH_JWT_SECRET,
  },

  callbacks: {
    
      async jwt({ token, user }) {
        // Persist the OAuth access_token and or the user id to the token right after signin
        console.log(user)
        if(user) {
          token.id = user.id;
          token.username = user.firstName
        }  
        return token
      },

      session: async ({session, token}) => {
        session.user.id = token.id
        session.user.username = token.username
        return session 
      }
  },

  secret: process.env.NEXT_AUTH_SECRET,
  
};
export default NextAuth(authOptions);

