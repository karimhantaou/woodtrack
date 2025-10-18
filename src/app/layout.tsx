import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'

const myFont = localFont({
    src: '../assets/fonts/Nitti.ttf',
})

export const metadata: Metadata = {
  title: "WoodTrack",
  description: "Application web de gestion de chargements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={myFont.className}>
      <body className={`h-screen w-screen flex flex-col bg-stone-100`}>
        <nav className={"w-full h-1/8 text-4xl flex items-center gap-2 border-b-1 text-white bg-stone-800  shadow-2xs"}>
            <img src={"./logo.png"} alt={"Logo"} className={"h-full"}/>
            <p className={"hover:tracking-widest transition-all duration-300"}>WoodTrack</p>
        </nav>
        {children}
      </body>
    </html>
  );
}
