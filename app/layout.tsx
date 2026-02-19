import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Layout } from "@/features/Layout";
import { GameDataProvider } from "@/providers";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { getCategories } from "@/services/games";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Questplay",
  description: "Questplay",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = await getBaseUrl();
  const categories = await getCategories(baseUrl);

  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GameDataProvider categories={categories}>
          <Layout>{children}</Layout>
        </GameDataProvider>
      </body>
    </html>
  );
}
