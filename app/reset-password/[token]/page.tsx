"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPassword } from "./_actions";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function ({ params }: { params: { token: string } }) {
  const [error, setError] = useState<string>("");
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    const res = await resetPassword(params.token, data);
    if(res?.error){
      setError(error)
    }
    return {
      Message : res
    }
  };
  return (
    <div className=" login_signup md:mb-20 rounded-md px-8 sm:h-[60vh] bg-white md:w-[50vh] md:h-auto flex flex-col justify-center  ">
      <h1 className="font-semibold text-violet-500 text-2xl">Reset Password</h1>
      <form onSubmit={submit}>
        <div className="m-3 flex flex-col gap-y-3 font-semibold">
          {error ? <p className="text-red-500 text-sm">{error}</p> : ""}
          <Input
            className="bg-transparent placeholder:text-xs placeholder:font-normal h-[50px] border-4 "
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Input
            className="bg-transparent text-sm placeholder:text-xs placeholder:font-normal h-[50px] border-4 "
            type="password"
            name="confirm-password"
            placeholder="Confirm Password"
            value={data.confirmPassword}
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
          />
          <Button
            variant="outline"
            type="submit"
            className="hover:bg-white border-violet-500 mt-2 text-white bg-violet-500  font-semibold font-mono "
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
