"use client";

import { useState } from "react";

export const MixtapeSuccessMessage = ({ slug }: { slug: string }) => {
  const [copied, setCopied] = useState(false);
  const mixtapeUrl = `${window.location.origin}/mixtape/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(mixtapeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <p className="text-2xl md:text-4xl font-bold">
        Your mixtape is ready! 🎶✨
      </p>
      <p className="text-gray-700">
        Share it with friends and let the music speak for itself:
      </p>
      <div
        className="w-full md:max-w-96 flex items-center gap-2 bg-white p-2 rounded-lg shadow-md border border-gray-300 cursor-pointer hover:bg-gray-100 transition relative"
        onClick={handleCopy}
      >
        <span className="w-full overflow-hidden font-medium text-gray-400 select-none truncate">
          {mixtapeUrl}
        </span>
        <button className="w-fit whitespace-nowrap px-3 py-1.5 cursor-pointer bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 transition">
          Copy Link
        </button>
        {copied && (
          <span className="absolute z-10 left-1/2 -translate-x-1/2 top-full mt-1 bg-black text-white text-xs px-2 py-1 rounded">
            Copied!
          </span>
        )}
      </div>
    </div>
  );
};
