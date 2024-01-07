import prisma from "@/prisma/index"
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const data = await req.json();
  const { name, email, password } = data;

  if (!name || !email || !password) {
    return Response.json({message:"Invalid credentials"},{status:500})
  }

  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  }); 
  if (exist) {
    Response.json({ message: "User already exists with the same email" });
    throw new Error("User already exists with the same email");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });
  console.log(user);
  return Response.json(user);
}
