import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Footer } from "@/components/layout/Footer";
import { pretendard } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hyogi.dev"),
  title: "최광혁 | 개발자 포트폴리오",
  description: "프론트엔드 개발자 최광혁의 포트폴리오입니다.",
  openGraph: {
    title: "최광혁 | 개발자 포트폴리오",
    description: "프론트엔드 개발자 최광혁의 포트폴리오입니다.",
    url: "https://hyogi.dev",
    siteName: "최광혁 포트폴리오",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/images/og-image-20260803.png",
        width: 1200,
        height: 630,
        alt: "최광혁 개발자 포트폴리오",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "최광혁 | 개발자 포트폴리오",
    description: "프론트엔드 개발자 최광혁의 포트폴리오입니다.",
    images: ["/images/og-image-20260803.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={pretendard.variable}>
        <ThemeProvider>
          <Header />
          <main className="mx-auto w-full max-w-[800px]">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
