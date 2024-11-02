import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Nunito_Sans } from '@next/font/google';

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} ${nunitoSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
