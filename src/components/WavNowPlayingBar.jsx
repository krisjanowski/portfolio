import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import WaveSurfer from "wavesurfer.js";
import { useWavPlayer } from "../contexts/WavPlayerContext";

function WavNowPlayingBar() {
	const { currentTrack, stopTrack, audioRef, currentTime, duration } = useWavPlayer();
	const [isPlaying, setIsPlaying] = useState(false);

	const waveformRef = useRef(null);
	const wavesurferRef = useRef(null);
	const theme = useTheme();

	useEffect(() => {
		const audio = audioRef.current;
		const onPlay = () => setIsPlaying(true);
		const onPause = () => setIsPlaying(false);

		audio.addEventListener("play", onPlay);
		audio.addEventListener("pause", onPause);

		return () => {
			audio.removeEventListener("play", onPlay);
			audio.removeEventListener("pause", onPause);
		};
	}, [audioRef]);

	const togglePlay = () => {
		const audio = audioRef.current;
		audio.paused ? audio.play() : audio.pause();
	};

	// ✅ Create WaveSurfer for visual only — no media binding!
	useEffect(() => {
		if (!currentTrack || !waveformRef.current) return;

		if (wavesurferRef.current) {
			wavesurferRef.current.destroy();
		}

		wavesurferRef.current = WaveSurfer.create({
			container: waveformRef.current,
			waveColor: theme.palette.mode === "light" ? "#b0bec5" : "#555", // lighter or darker based on mode
			progressColor: theme.palette.primary.main,
			cursorColor: theme.palette.primary.main,
			height: 50,
			responsive: true,
			barWidth: 2,
			barGap: 1,
			barAlign: "bottom",
			normalize: true,
		});

		wavesurferRef.current.load(currentTrack.src);

		// Seek by clicking waveform
		wavesurferRef.current.on("seek", (progress) => {
			const audio = audioRef.current;
			if (audio && audio.duration) {
				audio.currentTime = progress * audio.duration;
			}
		});

		return () => {
			if (wavesurferRef.current) {
				wavesurferRef.current.destroy();
				wavesurferRef.current = null;
			}
		};
	}, [currentTrack, audioRef, theme.palette.mode]);

	// ✅ Update waveform progress manually
	useEffect(() => {
		if (!wavesurferRef.current || !duration) return;
		const ratio = currentTime / duration;
		wavesurferRef.current.seekTo(Math.min(Math.max(ratio, 0), 1));
	}, [currentTime, duration]);

	if (!currentTrack) return null;

	return (
		<Box
			sx={{
				position: "fixed",
				bottom: 0,
				left: 0,
				width: "100%",
				bgcolor: theme.palette.background.paper,
				color: theme.palette.text.primary,
				borderTop: 1,
				borderColor: theme.palette.divider,
				px: 1.5,
				py: 1,
				display: "flex",
				alignItems: "center",
				gap: 1.5,
				boxShadow: 5,
				zIndex: 1500,
				height: 120,
				transition: "background-color 0.3s, color 0.3s"
			}}
		>
			<Box
				component="img"
				src={currentTrack.artwork || "/defaultArtwork.png"}
				sx={{ width: 80, height: 80, borderRadius: 1 }}
			/>

			<Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 0.3 }}>
				<Typography variant="subtitle2" fontWeight="bold" sx={{ textDecoration: "underline" }}>
					Kris Janowski
				</Typography>
				<Typography variant="subtitle1" fontWeight="bold" noWrap>
					{currentTrack.title}
				</Typography>

				<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
					<IconButton
						onClick={togglePlay}
						sx={{
							bgcolor: theme.palette.primary.main,
							color: theme.palette.primary.contrastText,
							"&:hover": { bgcolor: theme.palette.primary.dark },
							width: 40,
							height: 40,
							borderRadius: "50%",
						}}
					>
						{isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
					</IconButton>

					<Box
						ref={waveformRef}
						onClick={(e) => {
							if (!wavesurferRef.current || !duration) return;
							const rect = waveformRef.current.getBoundingClientRect();
							const x = e.clientX - rect.left;
							const percent = x / rect.width;
							audioRef.current.currentTime = percent * duration;
						}}
						sx={{
							flexGrow: 1,
							bgcolor: theme.palette.background.default,
							borderRadius: 1,
							height: 50,
							cursor: "pointer"
						}}
					/>

					<IconButton
						onClick={stopTrack}
						sx={{
							color: theme.palette.text.primary,
							"&:hover": {
								color: theme.palette.primary.main
							}
						}}
					>
						<CloseIcon />
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
}

export default WavNowPlayingBar;
