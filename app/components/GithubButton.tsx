"use client"

import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { signIn } from "next-auth/react";

export default function GithubSignInButton(){
    return(
        <Button 
            onClick={()=>signIn("github")}
            variant="default"
         className="  rounded-full p-2  bg-violet-500  text-white  font-semibold font-mono " 
        ><GithubIcon/>
        </Button>
    )
}

