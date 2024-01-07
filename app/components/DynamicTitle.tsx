"use client";

import { usePathname } from "next/navigation";

export default function Title() {
  const router = usePathname();
  if (router === "/signup") {
    return <title>MMD - Signup</title>;
  } else if (router === "/login") {
    return <title>MMD - Login</title>;
  } else if (router === "/") {
    return <title>MMD - Home</title>;
  }
  return <title>Meet My Director</title>;
}
