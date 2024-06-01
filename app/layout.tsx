import type { Metadata } from "next";
import { ABeeZee } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./Providers/ThemeProvider";

const aBeeZee = ABeeZee({
  subsets: ["latin"],
  weight: "400",
});

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
      <body className={aBeeZee.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
