import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "./globals.css";
import Header from "@/app/components/Header"; // ✅ Ensure Header is only imported here
import CustomSessionProvider from "@/app/components/SessionProvider"; // ✅ Wrap app in SessionProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Restaurant App",
  description: "Explore the best restaurants in your area",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CustomSessionProvider> {/* ✅ Wrapped in a Client Component */}
          <Header /> {/* ✅ Navbar with login/logout & user name */}
          <div className="container mt-4">
            {children}
          </div>
        </CustomSessionProvider>
      </body>
    </html>
  );
}
