import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Synergy Sphere",
  description: "Synergy Sphere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider defaultTheme="system" attribute={"class"}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
