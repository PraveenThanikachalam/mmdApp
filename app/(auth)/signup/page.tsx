"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import GithubSignInButton from "@/app/components/GithubButton";
import GoogleSignInButton from "@/app/components/GoogleButton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const router = useRouter();
  const { status } = useSession();
  if (status === "authenticated") {
    return redirect("/");
  }

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    console.log(e);
    axios
      .post("/api/register", data)
      .then(() => {
        toast("User registred successfully");
        return router.push("/login");
      })
      .catch((e) => {                
        toast.error("User already exists, try again with a different account");
        return false;
      });
  };

  return (
    <div className=" login_signup md:mb-20 rounded-md px-8 sm:h-[60vh] bg-white md:w-[50vh] md:h-[400px] flex flex-col justify-center  ">
      <h1 className="font-semibold text-violet-500 text-2xl">
        Create an account
      </h1>
      <form onSubmit={registerUser}>
        <div className="m-3 flex flex-col  gap-y-3 font-semibold">
          <Input
            className="bg-transparent placeholder:text-xs placeholder:font-normal h-[50px] border-4 "
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Input
            className="bg-transparent placeholder:text-xs placeholder:font-normal h-[50px] border-4 "
            type="username"
            name="username"
            placeholder="Username"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <Input
            className="bg-transparent text-sm placeholder:text-xs placeholder:font-normal h-[50px] border-4 "
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Button
            variant="outline"
            type="submit"
            className="hover:bg-white border-violet-500 text-white mx-auto bg-violet-500  font-semibold font-mono "
          >
            {" "}
            Sign Up
          </Button>
          <hr className="h-px  bg-black border-0 " />
          <div className=" flex justify-center gap-4 w-full ">
            <GithubSignInButton />
            <GoogleSignInButton />
          </div>
        </div>
      </form>
      <div className="text-md justify-center w-full  font-sans flex gap-2 ">
        Already have an account?
        <Link
          className="hover:underline font-semibold text-violet-500"
          href={"/login"}
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
