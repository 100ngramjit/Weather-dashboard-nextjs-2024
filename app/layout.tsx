import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalStore } from "@/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather Dashboard",
  description: "A weather app built with Next.js and shadcn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalStore />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
