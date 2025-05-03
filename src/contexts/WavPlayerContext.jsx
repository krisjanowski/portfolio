import React, { createContext, useContext, useRef, useState, useEffect } from "react";

const WavPlayerContext = createContext();

export function useWavPlayer() {
	return useContext(WavPlayerContext);
}

export function WavPlayerProvider({ children }) {
	const audioRef = useRef(new Audio());

	const [currentTrack, setCurrentTrack] = useState(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		const audio = audioRef.current;

		const onTimeUpdate = () => setCurrentTime(audio.currentTime);
		const onLoadedMetadata = () => setDuration(audio.duration);

		audio.addEventListener("timeupdate", onTimeUpdate);
		audio.addEventListener("loadedmetadata", onLoadedMetadata);

		return () => {
			audio.removeEventListener("timeupdate", onTimeUpdate);
			audio.removeEventListener("loadedmetadata", onLoadedMetadata);
		};
	}, []);

	function playTrack({ title, src, artwork }) {
		if (!src) return;

		const audio = audioRef.current;

		// Same track → resume
		if (currentTrack?.src === src) {
			audio.play().catch(console.warn);
			return;
		}

		// New track
		setCurrentTrack({ title, src, artwork });

		audio.src = src;
		audio.addEventListener('canplay', function tryPlay() {
			audio.play().catch(console.warn);
			audio.removeEventListener('canplay', tryPlay);
		});
	}

	function stopTrack() {
		const audio = audioRef.current;
		audio.pause();
		audio.src = "";
		setCurrentTrack(null);
		setCurrentTime(0);
		setDuration(0);
	}

	return (
		<WavPlayerContext.Provider
			value={{ currentTrack, playTrack, stopTrack, audioRef, currentTime, duration }}
		>
			{children}
		</WavPlayerContext.Provider>
	);
}
