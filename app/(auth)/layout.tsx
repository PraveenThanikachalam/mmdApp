import { ReactNode } from "react";
// import Image from "next/image";
import quotes from "@/Utils/quote.json";
import { ToastContainer } from "react-toastify";
// import Logo from "../../public/Logo.png";

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex].slogan;
}


export default async function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-full md:flex flex-col w-screen h-screen md:items-center sm:justify-center box">
      {  await new Promise(resolve=>setTimeout(resolve,500)) }
      {/* <Image
        className="  rounded-full sm:mx-auto md:translate-y-0 sm:translate-y-12  md:left-4 md:top-4"
        src={Logo}
        width={180}
        height={180}
        alt={"Logo"}
        priority
      /> */}
      {children}
    </div>
  );
}
