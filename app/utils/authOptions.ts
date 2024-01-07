import prisma from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions, SessionStrategy } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          type: "email",
          placeholder: "helo@example.com",
          label: "email",
        },
        password: {
          placeholder: "Password",
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        console.log(credentials);

        if (!credentials.email || !credentials.password) {
          console.log("Provide valid credentials");
          throw new Error("Provide valid credentials");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user.password) {
          throw new Error("No user found");
        }
        const passwordMatch = await bcrypt.compare(credentials.password,user.password);
        console.log(passwordMatch);
        
        if (!passwordMatch) {
          throw new Error("Invalid password");
        }
        return user;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  debug: process.env.NODE_ENV === "development",
  // pages:{
  //   signIn : "/login",
  //   newUser : "/signup",
  //   signOut : "/"
  // }
  
};
