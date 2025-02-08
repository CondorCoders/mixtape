import { MixtapeType } from "@/app/mixtape/[id]/page";

interface CaseBackInterface extends MixtapeType {
  onClick?: () => void;
}

export const CaseBack = ({
  tracks,
  name,
  playlistName,
  onClick,
}: CaseBackInterface) => {
  return (
    <div className="w-full h-full " onClick={onClick}>
      <div className="w-full h-full flex flex-col bg-orange-50 border-4 border-slate-300/25 rounded-sm">
        <div className="w-full bg-orange-200">
          <div className="flex">
            <span className="w-full font-bold font-shadow  text-blue-800 text-sm md:text-lg  p-4 pb-0">
              {name || playlistName}
            </span>
          </div>
          <span className="w-full h-[3px] bg-stone-600 block mb-4" />
        </div>
        <div className="w-full h-full flex flex-wrap text-sm md:text-xl p-4 font-shadow  text-blue-800 overflow-y-auto">
          {tracks.map((track) => (
            <>
              <p key={track.id} className="m-0">
                {track.name}
              </p>
              <span className="px-2 last-of-type:hidden">*</span>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
