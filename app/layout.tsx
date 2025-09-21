import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// --- FIX: Use relative paths instead of aliases ---
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "L'Aura Lingerie - Discover Your Confidence",
  description: "High-end, elegant lingerie for the modern individual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

                                   
