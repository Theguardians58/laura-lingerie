import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext"; // 1. Import CartProvider

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
        <CartProvider> {/* 2. Wrap the components */}
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider> {/* 3. Close the wrapper */}
      </body>
    </html>
  );
}

    
