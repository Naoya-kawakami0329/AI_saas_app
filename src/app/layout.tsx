import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  preload: true,
});

export const metadata: Metadata = {
  title: "AI SaaS Application",
  description: "AIの機能を使ったWebサービスです",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={"/dashboard"}>
    <html lang="ja">
      <body
        className={`${notoSansJP.className} antialiased`}
      >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
