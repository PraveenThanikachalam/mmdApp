//@ts-nocheck

import { EmailTemplate } from "@/app/emails/PasswordReset";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import prisma from "@/prisma/index";
import { randomUUID } from "crypto";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export default function ForgotPassoword() {
  const submit = async (formData: FormData) => {
    "use server";
    const email = formData.get("email");
    const resend = new Resend(process.env.RESEND_APIKEY);

    if (!email || typeof email !== "string") {
      return {
        error: "Invalid email",
      };
    }

    //check the email is exist in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return { error: "User not found" };
    }

    //Generating Token
    const token = await prisma.PasswordResetToken.create({
      data: {
        userId: user.id,
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
      },
    });
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Password reset",
      react: EmailTemplate({ name: user.name, token: token.token }),
    });
    console.log(data, error);
    if (error) {
      NextResponse.json(error);
      throw new Error(error.message);
    }
    return redirect("/forgot-password/success");
  };

  return (
    <div className=" password_reset md:mb-20 rounded-md p-5 sm:h-[60vh] bg-white md:w-[45vh] md:h-auto flex flex-col justify-center  ">
      <h1 className=" font-semibold text-violet-500 text-2xl">Passwod Reset</h1>
      <p className=" mt-1 text-gray-400 font-mono">
        Type the valid email here :
      </p>
      <form action={submit}>
        <div className="mt-2 flex flex-col gap-y-3 font-semibold">
          <Input
            className=" bg-transparent placeholder:text-xs placeholder:font-normal h-[50px] "
            type="email"
            name="email"
            placeholder="Email"
            // value={data.email}
            // onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Button
            variant="outline"
            type="submit"
            className="hover:bg-white border-violet-500  text-white mx-auto bg-violet-500  font-semibold font-mono "
          >
            Submit
          </Button>
        </div>
      </form>
      <Link
        className="hover:underline w-32 font-medium text-violet-500"
        href={"/login"}
      >
        &lt; Back to Log In
      </Link>{" "}
    </div>
  );
}
