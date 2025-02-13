import Link from "next/link";
import "./globals.css";
import { Shadows_Into_Light } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";

const shadowIntoLight = Shadows_Into_Light({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-shadow",
});

export const metadata: Metadata = {
  title: "🎧 Mixtape 🎶",

  openGraph: {
    title: "🎧 Mixtape 🎶",
    description: "Crea Mixtapes para el Día del Amor y la Amistad",
    url: "https://mixtape-eight.vercel.app/",
    siteName: "CondorCoders",
    images: [
      {
        url: "./preview.gif",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Generar Mixtapes para tus relaciones interpersonales este Día de San Valentin"
        ></meta>

        <title>🎧 Mixtape 🎶</title>
        <meta />
      </head>
      <body
        className={`${shadowIntoLight.variable} relative min-h-dvh flex flex-col p-4`}
      >
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
        </div>
        {children}
        <Analytics />
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
