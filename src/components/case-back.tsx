import { MixtapeType } from "@/app/mixtape/[id]/page";

interface CaseBackInterface extends Partial<MixtapeType> {
  onClick?: () => void;
}

export const CaseBack = ({
  tracks,
  name,
  playlistName,
  onClick,
}: CaseBackInterface) => {
  return (
    <div
      className="w-full h-full flex flex-col bg-orange-50 border-4 border-slate-300/25 rounded-xs"
      onClick={onClick}
    >
      <div className="w-full bg-orange-200">
        <div className="flex">
          <span className="w-full overflow-hidden truncate font-bold font-shadow  text-blue-800 text-sm md:text-lg  p-4 pb-0">
            {name || playlistName}
          </span>
        </div>
        <span className="w-full h-[3px] bg-stone-600 block mb-4" />
      </div>
      <div className="w-full h-full flex flex-wrap text-sm md:text-xl p-4 font-shadow  text-blue-800 overflow-y-auto">
        {tracks?.map((track) => (
          <p key={track.id} className="m-0 group">
            {track.name}
            <span className="px-2 group-last-of-type:hidden">*</span>
          </p>
        ))}
      </div>
    </div>
  );
};
