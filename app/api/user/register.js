import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const saltround = 10;

console.log("booom a l'exterieur ") // ne s'affiche pas dans le terminal

export default async function handler(req, res) {
   
  console.log("booom") // ne s'affiche pas dans le terminal
    
  if (req.method === "POST") {
      return res.status(405).end();
    }

  try {
    const { firstName, lastName, email, password } = req.body;
    
    const checkEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (checkEmail) {
      res.status(400).json({ message: "email already registerd " });
    }

    
    const hashedPassword = await bcrypt.hash(password, saltround);

    const user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password : hashedPassword,
      },
    });

    return res.status(200).json({ message: "User created successfully", data : user });
  
  } catch (error) {
    return res.status(400).end();
  }
}
