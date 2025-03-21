import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";
import localFont from "next/font/local";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

// Define the MADE Tommy font
const madeTommy = localFont({
  src: [
    {
      path: "../../public/fonts/made-tommy-thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/made-tommy-light.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/made-tommy-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/made-tommy-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-made-tommy",
});

// Define the MADE Tommy Soft font
const madeTommySoft = localFont({
  src: [
    {
      path: "../../public/fonts/made-tommy-soft-regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-made-tommy-soft",
});

export const metadata: Metadata = {
  title: "Khrave",
  description: "Share your unique custom orders!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${madeTommy.className}`}>
        <Provider>
          <main className="">
            <Navbar session={session} />
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
