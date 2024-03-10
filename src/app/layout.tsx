import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";

const Zodiak = localFont({
  src: '../../public/fonts/zodiak/Zodiak-Variable.ttf',
  display: 'swap',
  variable: '--font-zodiak'
})

const PlusJakartaSans = localFont({
  src: '../../public/fonts/plus-jakarta-sans/PlusJakartaSans-Variable.ttf',
  display: 'swap',
  variable: '--font-plus-jakarta-sans'
})

export const metadata: Metadata = {
  title: "Delicatessen",
  description: "Under Construction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Zodiak.variable} ${PlusJakartaSans.variable}`}>{children}</body>
    </html >
  );
}
