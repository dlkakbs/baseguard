import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BlockchainProvider } from "@/components/WagmiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BaseGuard - Protect Your Base Trades",
  description: "Analyze token security on Base blockchain. Detect honeypots, rug pulls, and scams before you invest.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BlockchainProvider>
          {children}
        </BlockchainProvider>
      </body>
    </html>
  );
}
