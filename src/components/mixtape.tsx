"use client";
import { MixtapeType } from "@/app/mixtape/[id]/page";
import { CaseFront } from "./case-front";
import { useState } from "react";
import { Cassette } from "./cassette";
import { CaseBack } from "./case-back";

export const Mixtape = ({ ...mixtape }: MixtapeType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [viewSongs, setViewSongs] = useState<boolean>(false);
  const [flip, setFlip] = useState<boolean>(false);
  const [flipBack, setFlipBack] = useState<boolean>(false);

  const handleSeeSongs = () => {
    setViewSongs(true);
    setFlipBack(false);

    if (open) {
      setOpen(false);
    } else {
      setFlip(true);
    }
  };

  const handleSeeCover = () => {
    setFlipBack(true);
    setFlip(false);
    setViewSongs(false);
  };

  const handleAnimationEnd = () => {
    // When flipBack completes, we can set flip to true (if needed) or handle further transitions.
    if (!open && viewSongs) {
      setFlip(true);
    }
  };

  return (
    <div className="w-full p-4 flex flex-col items-center justify-center">
      <div
        className="relative aspect-video w-full sm:w-2/3 md:w-2/4 lg:w-2/5 xl:w-1/2"
        style={{ perspective: "1200px" }}
      >
        <div
          className={`absolute w-full h-full transition-all duration-500 ${
            open ? "animate-backToFront" : "animate-frontToBack"
          }`}
        >
          <Cassette {...mixtape} onClick={() => setOpen(!open)} />
        </div>
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className={`absolute w-full ease duration-700 ${
              open
                ? "animate-swap" // If flipping back, apply flipBack animation.
                : flip
                ? "animate-flipBack"
                : flipBack
                ? "animate-flip"
                : "animate-swapBack" // If not open and not flipping, apply swapBack.
            }`}
            onAnimationEnd={handleAnimationEnd}
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <CaseFront
              {...mixtape}
              onClick={() => {
                setOpen(!open);
                setFlipBack(false);
              }}
            />
          </div>
          <div
            className={`absolute w-full h-full -rotate-y-180 ${
              flip ? "animate-flip" : ""
            } ${flipBack ? "animate-flipBack" : ""}`}
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <CaseBack {...mixtape} />
          </div>
        </div>
        <p
          role="button"
          className="mt-14 w-fit text-right ml-auto text-xs md:text-sm uppercase text-gray-700/70 hover:text-gray-700/100 transition-colors"
          onClick={viewSongs ? handleSeeCover : handleSeeSongs}
        >
          {viewSongs ? "see cover" : "see songs"}
        </p>
      </div>
    </div>
  );
};
