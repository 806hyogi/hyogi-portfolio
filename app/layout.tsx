import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Footer } from "@/components/layout/Footer";
import { pretendard } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hyogi Portfolio",
  description: "A full-stack developer portfolio built with Next.js App Router.",
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
      </body>
    </html>
  );
}
