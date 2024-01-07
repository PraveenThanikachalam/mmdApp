"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import GithubSignInButton from "@/app/components/GithubButton";
import GoogleSignInButton from "@/app/components/GoogleButton";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { NextRequest } from "next/server";

export default function Login() {
  const { status } = useSession();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (status === "authenticated") {
      console.log(status);
      return redirect("/");
    }
  });
  const loginUser = async (e) => {
    e.preventDefault();
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      console.log("Auth entered");

      if (callback?.error) {
        console.log(callback.error);
        toast.error(callback.error);
      }

      if (callback?.ok && !callback?.error) {
        console.log(callback);

        toast.success("Logged in successfully!");
      }
    });
  };

  return (
    <div className=" login_signup md:mb-20 rounded-md px-8 sm:h-[60vh] bg-white md:w-[50vh] md:h-[400px] flex flex-col justify-center  ">
      <h1 className="font-semibold text-violet-500 text-2xl">Log In</h1>
      <form onSubmit={loginUser}>
        <div className="m-3 flex flex-col gap-y-3 font-semibold">
          <Input
            className="bg-transparent placeholder:text-xs placeholder:font-normal h-[50px] border-4 "
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
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
            Log In
          </Button>
          <hr className="h-px  bg-black border-0 " />
          <div className=" flex justify-center gap-4 w-full ">
            <GithubSignInButton />
            <GoogleSignInButton />
          </div>
        </div>
      </form>
      <div className="text-md justify-center w-full  font-sans flex gap-2 ">
        New to MMD?
        <Link
          className=" hover:underline font-semibold text-violet-500"
          href={"/signup"}
        >
          Sign up
        </Link>
        |
        <Link
          className="hover:underline font-semibold text-violet-500"
          href={"/forgot-password"}
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
