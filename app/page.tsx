"use client"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import {redirect} from "next/navigation"

export default function Home() {
  const { data:session,status } = useSession();
  if(status === "authenticated"){
    return (
      <main>
        {new Promise(resolve=>setTimeout(resolve,500))}
        <h1> Hi{session.user?.name}</h1>
        <button onClick={()=>signOut()} >
          SignOut
        </button>
      </main>
    )
  }
  return (
    redirect("/login")
  )
  
}
