import type { Metadata } from "next";
import "./globals.css";
import { Nunito_Sans } from 'next/font/google';
import Navbar from "../components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-nunito-sans',
});

export const metadata: Metadata = {
  title: "Khrave",
  description: "Share your unique custom orders!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={nunitoSans.className}>
        <Provider>
          <main className='h-screen flex flex-col justify-center items-center'>
            <Navbar />
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
