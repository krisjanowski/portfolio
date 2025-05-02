import React from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { useSoundCloudPlayer } from "../contexts/SoundCloudPlayerContext";

function SoundCloudEmbed({ embedUrl, description, title }) {
	const { playTrack, currentTrack } = useSoundCloudPlayer();

	const titleMatch = embedUrl.match(/tracks%2F(\d+)/);
	const trackId = titleMatch ? titleMatch[1] : "Unknown Track";

	const isPlaying = currentTrack?.embedUrl === embedUrl;

	const handlePlay = () => {
		playTrack({
			title: title || `Track ${trackId}`,
			embedUrl,
		});
	};

	return (
		<Box
			sx={{
				boxShadow: 8,
				borderRadius: 2,
				overflow: "hidden",
				bgcolor: "white",
				"@media (prefers-color-scheme: dark)": {
					bgcolor: "grey.200",
					color: "grey.300",
				},
				position: "relative",
				minHeight: 166,
			}}
		>
			{!isPlaying ? (
				<>
					<iframe
						width="100%"
						height="166"
						scrolling="no"
						frameBorder="no"
						allow="autoplay"
						src={embedUrl}
						style={{ borderRadius: "4px", marginBottom: "-7px" }}
						title={title || `Track ${trackId}`}
					></iframe>

					{/* Full overlay invisible button */}
					<ButtonBase
						onClick={handlePlay}
						sx={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							bgcolor: "transparent",
							"&:hover": {
								bgcolor: "rgba(0,0,0,0.05)", // Light overlay on hover
							},
						}}
						aria-label={`Play ${title || `Track ${trackId}`}`}
					/>
				</>
			) : (
				<Box
					sx={{
						p: 2,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: 1,
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "end",
							gap: "2px",
							height: "50px",
                            marginBottom:"20px",
                            marginTop:"10px"
						}}
					>
						<Box sx={{ width: "4px", height: "20%", bgcolor: "primary.main", animation: "wave 1s infinite ease-in-out 0s" }} />
						<Box sx={{ width: "4px", height: "50%", bgcolor: "primary.main", animation: "wave 1s infinite ease-in-out 0.2s" }} />
						<Box sx={{ width: "4px", height: "35%", bgcolor: "primary.main", animation: "wave 1s infinite ease-in-out 0.4s" }} />
						<Box sx={{ width: "4px", height: "65%", bgcolor: "primary.main", animation: "wave 1s infinite ease-in-out 0.6s" }} />
						<Box sx={{ width: "4px", height: "45%", bgcolor: "primary.main", animation: "wave 1s infinite ease-in-out 0.8s" }} />
					</Box>
					<Typography variant="subtitle1" fontWeight="bold" textAlign="center">
						Now Playing
					</Typography>
				</Box>
			)}

			{description && (
				<Typography
					mt={2}
					variant="body2"
					fontStyle="italic"
					color="grey.800"
					sx={{
						"@media (prefers-color-scheme: dark)": {
							color: "grey.200",
						},
					}}
				>
					{description}
				</Typography>
			)}
		</Box>
	);
}

export default SoundCloudEmbed;
