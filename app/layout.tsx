import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});


export const metadata: Metadata = {
  title: "L'Aura Lingerie - Discover Your Inner Confidence",
  description: "Beautifully crafted lingerie for the modern individual. Explore our collections of bras, panties, and sleepwear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-primary`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

  
