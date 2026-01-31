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
  title: "Mixtape | Share Your Music with a Mixtape Style 🎶",
  description:
    "Turn your Spotify playlist into a custom mixtape and share it with someone special! Personalize the cover, add a message, and relive the nostalgia of mixtapes.",
  openGraph: {
    title: "Mixtape | Create & Share Personalized Playlists 🎵",
    description:
      "Transform your Spotify playlists into unique mixtapes. Add a custom cover, message, and share the experience with friends!",
    url: "https://mixtape.condorcoders.com/",
    images: [
      {
        url: "/Mixtape_OG.png",
        alt: "Mixtape | Share Your Music with Style",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mixtape | Share Your Music with Style 🎶",
    description:
      "Turn your Spotify playlist into a custom mixtape and share it with someone special!",
    images: ["/Mixtape_OG.png"],
  },
};

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
