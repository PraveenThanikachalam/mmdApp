'use client'

import Link from "next/link";


export default function Success() {
  return (
    <div className=" password_reset md:mb-20 rounded-md p-5 sm:h-[60vh] bg-white md:w-[45vh] md:h-auto flex flex-col items-center justify-center  ">
      <h6 className=" text-center font-medium underline text-violet-500 text-2xl">
        Password has been changed successfully
      </h6>
      <Link  className="mt-1 p-2 hover:bg-black text-white rounded-md font-sans text-sm bg-violet-500 " href={"/login"}>
        Go back to Login
      </Link>
    </div>
  );
}
