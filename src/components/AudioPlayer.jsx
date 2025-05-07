import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useGlobalAudioManager } from "../contexts/GlobalAudioManagerContext";
import { useWavPlayer } from "../contexts/WavPlayerContext";

function AudioPlayer({ src, label, artwork, bgcolor }) {
	const { playWavTrack } = useGlobalAudioManager();
	const { currentTrack } = useWavPlayer();

	const isPlaying = currentTrack?.src === src;

	const handlePlay = () => {
		playWavTrack({ title: label, src, artwork });
	};

	return (
		<Box
			sx={{
				bgcolor: bgcolor || "background.paper", // 🔥 Use prop or default
				border: 1,
				borderColor: (theme) => theme.palette.mode === "dark" ? "grey.700" : "grey.300",
				borderRadius: 2,
				px: 1.5,
				py: 1,
				display: "flex",
				alignItems: "left",
				gap: 1.5,
				width: "100%",
				maxWidth: 800,
			}}
		>
			<Box
				component="img"
				src={artwork || "/defaultArtwork.png"}
				alt="Artwork"
				sx={{ width: 100, height: 100, borderRadius: 1, objectFit: "cover" }}
			/>

			<Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
				<Typography variant="subtitle2" fontWeight="bold" sx={{ textDecoration: "underline" }}>
					Kris Janowski
				</Typography>
				<Typography variant="subtitle1" fontWeight="bold" noWrap>
					{label}
				</Typography>

				<Box sx={{ display: "flex", alignItems: "left", gap: 1 }}>
					{!isPlaying ? (
						<IconButton
							onClick={handlePlay}
							sx={{
								bgcolor: "orange",
								color: "white",
								"&:hover": { bgcolor: "darkorange" },
								width: 40,
								height: 40,
								borderRadius: "50%",
							}}
						>
							<PlayArrowIcon />
						</IconButton>
					) : (
						<Box
							sx={{
								display: "flex",
								alignItems: "end",
								gap: "2px",
								height: "30px",
								ml: 1,
							}}
						>
							<Box sx={{ width: "4px", height: "20%", bgcolor: "orange", animation: "wave 1s infinite ease-in-out 0s" }} />
							<Box sx={{ width: "4px", height: "50%", bgcolor: "orange", animation: "wave 1s infinite ease-in-out 0.2s" }} />
							<Box sx={{ width: "4px", height: "35%", bgcolor: "orange", animation: "wave 1s infinite ease-in-out 0.4s" }} />
							<Box sx={{ width: "4px", height: "65%", bgcolor: "orange", animation: "wave 1s infinite ease-in-out 0.6s" }} />
							<Box sx={{ width: "4px", height: "45%", bgcolor: "orange", animation: "wave 1s infinite ease-in-out 0.8s" }} />
						</Box>
					)}
				</Box>
			</Box>

			<style>
				{`
					@keyframes wave {
						0% { transform: scaleY(1); }
						50% { transform: scaleY(1.5); }
						100% { transform: scaleY(1); }
					}
				`}
			</style>
		</Box>
	);
}

export default AudioPlayer;
