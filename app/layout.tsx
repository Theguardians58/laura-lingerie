import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer"; // <-- 1. IMPORT THE FOOTER

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "L'aura Lingerie - Discover Your Confidence",
  description: "High-end, modern lingerie for the confident individual.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer /> {/* <-- 2. ADD THE FOOTER COMPONENT HERE */}
      </body>
    </html>
  );
}

          
