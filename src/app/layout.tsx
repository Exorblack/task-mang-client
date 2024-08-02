"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Nav from "@/components/Nav";
import { Provider } from 'react-redux';
import {store} from "@/Redux/store";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
      <body className={inter.className}>
        <Toaster position="top-center" richColors/>
        <Nav/>
          {children}
      </body>
      </Provider>
    </html>
  );
}
