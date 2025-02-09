import { MixtapeForm } from "@/components/mixtape-form";

export default async function Home() {
  return (
    <main className="w-full h-full flex-1 flex flex-col">
      <div className="text-center p-4">
        <h1 className="text-4xl font-bold font-shadow">🎧 Mixtape 🎶</h1>
        <p className="py-4 text-base">
          Turn your Spotify playlist into a mixtape and share it with someone
          who&apos;ll love it!
        </p>
      </div>

      <div className="max-w-5xl w-full mx-auto h-full flex-1 flex md:items-center md:justify-center">
        <MixtapeForm />
      </div>
    </main>
  );
}
