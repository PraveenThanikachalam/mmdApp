import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./provider";
import Title from "./components/DynamicTitle";
import ToasterContext from "./context/ToasterContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Title />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <body className={inter.className}>
        <NextAuthProvider><ToasterContext />{children}</NextAuthProvider>
      </body>
    </html>
  );
}
