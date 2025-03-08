import type { Metadata } from "next";
import "./globals.css";
import { Nunito_Sans } from 'next/font/google';
import Navbar from "../components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";
import localFont from 'next/font/local'


const madeTommy = localFont({
  src: [
    {
      path: '../../public/fonts/made-tommy-thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/made-tommy-light.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/made-tommy-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/made-tommy-bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-made-tommy',
})

const madeTommySoft = localFont({
  src: [
    {
      path: '../../public/fonts/made-tommy-soft-regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-made-tommy-soft',
})

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
      <body className={`${madeTommy.className}`}>
        <Provider>
          <main className=''>
            <Navbar />
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
