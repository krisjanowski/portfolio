import React, { createContext, useContext, useState } from "react";

const SoundCloudPlayerContext = createContext();

export function SoundCloudPlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null); // { title, embedUrl }

  const playTrack = (track) => {
    setCurrentTrack(track);
  };

  const stopTrack = () => {
    setCurrentTrack(null);
  };

  return (
    <SoundCloudPlayerContext.Provider value={{ currentTrack, playTrack, stopTrack }}>
      {children}
    </SoundCloudPlayerContext.Provider>
  );
}

export function useSoundCloudPlayer() {
  return useContext(SoundCloudPlayerContext);
}