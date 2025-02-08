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
  params: { id: string };
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
    <div className="w-full min-h-dvh overflow-hidden relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <Mixtape {...mixtape} />
    </div>
  );
}
