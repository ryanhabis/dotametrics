import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Providers } from "./providers"; // Updated import

// Font initialization (keep your existing font setup)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Dotametrics | Real-Time Dota 2 Stats",
  description: "Win rates, hero builds, and live match analytics. Track the meta like a pro.",
  metadataBase: new URL("https://dotametrics.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${robotoMono.variable} font-sans`}>
        <Providers> {/* Wrap everything with Providers */}
          <Navbar />
          <main className="min-h-screen pt-16"> {/* Keep your spacing */}
            <div className="p-4 max-w-7xl mx-auto bg-background text-foreground">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}