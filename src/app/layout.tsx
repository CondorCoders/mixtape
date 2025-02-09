import Link from "next/link";
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
      <body
        className={`${shadowIntoLight.variable} relative min-h-dvh flex flex-col p-4`}
      >
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
        </div>
        {children}
        <footer className="w-full text-center text-sm">
          Made with ❤️ by{" "}
          <Link
            target="_blank"
            href="https://www.instagram.com/condorcoders/"
            className="underline hover:text-blue-800"
          >
            CondorCoders
          </Link>
        </footer>
      </body>
    </html>
  );
}
