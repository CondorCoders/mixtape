import "./globals.css";
import { Shadows_Into_Light } from "next/font/google";

const shadowIntoLight = Shadows_Into_Light({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-shadow",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${shadowIntoLight.variable}`}>{children}</body>
    </html>
  );
}
