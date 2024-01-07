//@ts-nocheck

"use server";

import prisma from "@/prisma/index";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";

export async function resetPassword(token: string, data: any) {
  const { password, confirmPassword } = data;
  if(!password || !confirmPassword){
    return {
      error : "Please fill the fileds correctly"
    }
  }
  if(password !== confirmPassword){
    return {
      error : "Make sure you have entered the same password twice"
    }
  }

  const passwordResetToken = await prisma.PasswordResetToken.findUnique({
    where: {
      token,
      // created_at: { gt: new Date(Date.now() - 1000 * 60) },
      // reset_at: null,
    },
  });
  console.log(new Date());
  
  console.log(passwordResetToken)
  if (!passwordResetToken) {
    return {
      error:
        "Invalid token reset request. Please try resetting your password again.",
    };
  }
  console.log(data)


  const encrypted = await hash(password, 10);

  const updateUser = prisma.user.update({
    where: { id: passwordResetToken.userId },
    data: {
      password: encrypted,
    },
  });

  const updateToken = prisma.PasswordResetToken.update({
    where: {
      id: passwordResetToken.id,
    },
    data: {
      reset_at: new Date(),
    },
  });

  try {
    await prisma.$transaction([updateUser, updateToken]);
    
  } catch (err) {
    console.error(err);
    return {
      error: `An unexpected error occured. Please try again and if the problem persists, contact support.`,
    };
  }
  return redirect("/reset-password/success");


}
