import { MixtapeType } from "@/app/mixtape/[id]/page";
import Link from "next/link";

interface CassetteProps extends MixtapeType {
  onClick: () => void;
}

export const Cassette = ({
  name,
  playlistName,
  spotifyUrl,
  onClick,
}: CassetteProps) => {
  return (
    <div className="w-full p-4 xl:p-8 h-full bg-gray-200 rounded-2xl">
      <div className="rounded-2xl w-full bg-orange-50 flex flex-col">
        <div className="w-full flex items-center gap-4 p-2 xl:p-4">
          <span className="bg-slate-600 size-8 rounded-xl flex items-center text-orange-50 justify-center font-bold">
            A
          </span>
          <p className="font-shadow my-0 text-xl xl:text-2xl text-blue-800">
            {name || playlistName}
          </p>
        </div>
        <span className="w-full h-1 xl:h-2 bg-orange-400" />
        <span className="w-full h-1 xl:h-2 bg-orange-950" />
        <div className="relative w-2/3 my-4 xl:my-8 mx-auto bg-gray-200 px-4 xl:px-8 py-3 xl:py-6 rounded-2xl flex justify-between items-center">
          <span className="size-6 xl:size-16 bg-white rounded-full" />

          <Link
            target="_blank"
            href={spotifyUrl}
            className="absolute left-0 right-0 m-auto w-fit text-xs xl:text-sm text-gray-700 uppercase rounded-full bg-green-400 hover:bg-green-400/80 px-4 py-2"
          >
            Listen in Spotify
          </Link>

          <span className="size-6 xl:size-16 bg-white rounded-full" />
        </div>
        <div className="w-2/3 mx-auto bg-gray-300 h-8 sm:h-12 xl:h-14 -mb-4 sm:-mb-7 rounded-xl"></div>
      </div>
    </div>
  );
};
