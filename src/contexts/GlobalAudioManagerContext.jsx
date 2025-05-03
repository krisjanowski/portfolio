// contexts/GlobalAudioManagerContext.jsx
import React, { createContext, useContext } from "react";
import { useWavPlayer } from "./WavPlayerContext";
import { useSoundCloudPlayer } from "./SoundCloudPlayerContext";

const GlobalAudioManagerContext = createContext();

export function GlobalAudioManagerProvider({ children }) {
	const wavPlayer = useWavPlayer();
	const soundCloudPlayer = useSoundCloudPlayer();

	function playWavTrack(track) {
		// Stop SoundCloud first
		soundCloudPlayer.stopTrack?.();
		wavPlayer.playTrack(track);
	}

	function playSoundCloudTrack(track) {
		// Stop Wav first
		wavPlayer.stopTrack?.();
		soundCloudPlayer.playTrack(track);
	}

	return (
		<GlobalAudioManagerContext.Provider value={{ playWavTrack, playSoundCloudTrack }}>
			{children}
		</GlobalAudioManagerContext.Provider>
	);
}

export function useGlobalAudioManager() {
	return useContext(GlobalAudioManagerContext);
}
