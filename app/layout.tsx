import type { Metadata } from "next";

import "./globals.css";
import QueryProviders from "@/providers/QueryProvider";




export const metadata: Metadata = {
  title: "PH Healthcare Management system",
   description: "A comprehensive healthcare management system built with Next.js, TypeScript, and Tailwind CSS. This application provides features for managing patient records, appointments, billing, and more, ensuring efficient healthcare administration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProviders>
           {children}
        </QueryProviders>
      </body>
    </html>
  );
}
