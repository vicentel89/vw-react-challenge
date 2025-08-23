import type { Metadata } from "next";
import { Nunito_Sans, Montserrat } from "next/font/google";

import "./globals.css";
import QueryProvider from "./_lib/react-query/QueryProvider";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Volkswagen React Challenge",
  description:
    "A challenge to build a React application for Volkswagen digital hub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <body className={`${nunitoSans.variable} ${montserrat.variable}`}>
          {children}
        </body>
      </html>
    </QueryProvider>
  );
}
