import { MixtapeType } from "@/app/mixtape/[id]/page";
import Link from "next/link";
import Spotify from "./icons/spotify";

interface CassetteProps extends Partial<MixtapeType> {
  linkText?: string;
}

export const Cassette = ({
  name,
  playlistName,
  spotifyUrl,
  linkText,
}: CassetteProps) => {
  if (!spotifyUrl) return null;
  return (
    <div className="relative transition-transform group hover:scale-105 w-full p-4 xl:p-8 h-full bg-gray-200 rounded-2xl">
      <Link
        target="_blank"
        href={spotifyUrl}
        className="absolute inset-0 w-full pb-1 h-full flex items-end justify-center"
      >
        <span className="font-bold text-xs xl:text-sm text-green-600 uppercase  group-hover:text-green-700 px-4 py-2">
          {linkText || "Listen in Spotify"} ↗
        </span>
      </Link>

      <div className="rounded-2xl w-full bg-orange-50 flex flex-col">
        <div className="w-full flex items-center gap-2 md:gap-4 p-2 xl:p-4">
          <Spotify className="size-4 md:size-8" />
          <p className="w-full overflow-hidden truncate font-shadow my-0 text-base lg:text-xl xl:text-2xl text-blue-800">
            {name || playlistName}
          </p>
        </div>
        <span className="w-full h-1 xl:h-2 bg-orange-400" />
        <span className="w-full h-1 xl:h-2 bg-orange-950" />
        <div className=" w-2/3 my-4 xl:my-8 mx-auto bg-gray-200 px-2 sm:px-4 xl:px-8 py-2 sm:py-3 xl:py-6 rounded-2xl flex justify-between items-center">
          <span className="size-7 sm:size-10 xl:size-16 bg-white rounded-full" />
          <span className="size-7 sm:size-10 xl:size-16 bg-white rounded-full" />
        </div>
        <div className="w-2/3 mx-auto bg-gray-300 h-8 sm:h-12 xl:h-14 -mb-4 sm:-mb-7 rounded-xl"></div>
      </div>
    </div>
  );
};
