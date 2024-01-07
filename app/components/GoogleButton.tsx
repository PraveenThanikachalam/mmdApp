"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GoogleLogo from "@/public/Google.png";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return (
    <Button
      onClick={() => signIn("google")}
      className="rounded-full p-2 bg-violet-500 text-white font-semibold font-mono"
    >
      <Image 
        width={25}
        src={GoogleLogo}
        alt={"Google Signup"}
      />
    </Button>
  );
}
