import { getMixtape } from "@/app/actions";
import { Mixtape } from "@/components/mixtape";

export interface TrackType {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
}

export interface MixtapeType {
  id: string;
  name?: string;
  from?: string;
  to?: string;
  playlistName: string;
  message?: string;
  spotifyUrl: string;
  tracks: TrackType[];
}

export default async function MixtapePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const mixtapeId = (await params).id;
  const mixtape = await getMixtape(mixtapeId);

  if (!mixtape) {
    return (
      <div>
        <h2>There was an error loading the tape.</h2>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 overflow-hidden relative flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold font-shadow mb-10">🎧 Mixtape 🎶</h1>
      <Mixtape {...mixtape} />
    </div>
  );
}
