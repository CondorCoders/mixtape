import { MixtapeType } from "@/app/mixtape/[id]/page";

interface CaseFrontInterface extends MixtapeType {
  onClick?: () => void;
  open?: boolean;
}

export const CaseFront = ({
  from,
  to,
  name,
  playlistName,
  message,
  onClick,
}: CaseFrontInterface) => {
  return (
    <div
      className="w-full h-full group hover:cursor-pointer md:hover:scale-105 transition-all"
      onClick={onClick}
    >
      <div className="aspect-video flex flex-col bg-orange-50 border-4 border-slate-300/25 rounded-xs">
        <div className="w-full bg-orange-200">
          {from || to ? (
            <div className="w-full flex">
              {from && (
                <span className="w-1/2 font-bold text-sm md:text-lg font-mono p-4 pb-0">
                  <>
                    From:
                    <span className="font-shadow text-sm md:text-2xl pl-4 text-blue-800">
                      {from}
                    </span>
                  </>
                </span>
              )}
              {to && (
                <span className="w-1/2 font-bold text-sm md:text-lg font-mono p-4 pb-0">
                  <>
                    To:
                    <span className="font-shadow pl-4 text-sm md:text-2xl text-blue-800">
                      {to}
                    </span>
                  </>
                </span>
              )}
            </div>
          ) : (
            <p className="font-shadow p-4 pb-0 text-sm md:text-2xl text-blue-800">
              {name || playlistName}
            </p>
          )}

          <span className="w-full h-[3px] bg-stone-600 block mb-4" />
        </div>
        <div className="flex-1 w-full h-full flex flex-col items-center justify-center p-3 pb-0 ">
          {message && (
            <p className="font-shadow mt-auto text-base lg:text-lg xl:text-3xl -rotate-3 text-blue-800">
              {message}
            </p>
          )}

          <div className="w-full text-center mt-auto pb-2 sm:pb-4">
            <p className="text-xs uppercase text-stone-600/50 group-hover:text-stone-600/100 transition-colors">
              Click to open
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
