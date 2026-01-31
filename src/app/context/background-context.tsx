"use client";

import { createContext, useContext, useState } from "react";

export enum BackgroundOptions {
  RETRO = "retro",
  PINK = "pink",
  PURPLE = "purple",
}

interface BackgroundContextProps {
  background: BackgroundOptions;
  setBackground: (background: BackgroundOptions) => void;
}

const BackgroundContext = createContext<BackgroundContextProps>({
  background: BackgroundOptions.RETRO,
  setBackground: () => {},
});

export const BackgroundProvider = ({
  children,
  backgroundDefault,
}: React.PropsWithChildren<{ backgroundDefault?: BackgroundOptions }>) => {
  const [background, setBackground] = useState<BackgroundOptions>(
    backgroundDefault || BackgroundOptions.RETRO,
  );

  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => useContext(BackgroundContext);
