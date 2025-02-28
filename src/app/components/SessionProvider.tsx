'use client'; // ✅ Make sure this is at the top

import { SessionProvider } from "next-auth/react";

export default function CustomSessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
