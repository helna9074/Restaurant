import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ToastProvider from "@/components/ui/toastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export const metadata: Metadata = {
  title: "Rastaurant Mangement System",
  description: "Modern and User-Friendly Restaurant Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
  className={`${inter.className} ${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
>
        <ReactQueryProvider>
          {children}
          <ToastProvider />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
