import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/global/footer";
import Main from "./components/global/main";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BHGM - Schedule",
  description: "Schedule for the 2024 Burry Heights Gaming Marathon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg"/>
        <link rel="icon" type="image/png" href="/favicon/favicon.png"/>
      </head>
      <body className={`${inter.className} text-white bg-rich-sky`}>
        <Main>
          {children}
        </Main>
        <Footer/>
      </body>
    </html>
  );
}
