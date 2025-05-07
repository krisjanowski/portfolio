import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardHeader, CardContent, CircularProgress } from "@mui/material";
import SoundCloudEmbed from "../components/SoundCloudEmbed.jsx";
import { Link } from "react-router-dom"; // NEW
import AudioPlayer from "../components/AudioPlayer.jsx";

function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/[\s\W-]+/g, "-");
}

function Collaborations() {
	const [collaborations, setCollaborations] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/uploads/collaborations.json")
			.then((res) => res.json())
			.then((data) => {
				setCollaborations(data.collaborations || []);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Failed to load collaborations.json:", err);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<Box sx={{ p: 6, textAlign: "center" }}>
				<CircularProgress />
			</Box>
		);
	}

	if (!collaborations.length) {
		return (
			<Box sx={{ p: 6, textAlign: "center" }}>
				<Typography>No collaborations available.</Typography>
			</Box>
		);
	}

	return (
		<Box
			sx={(theme) => ({
				bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.50",
				color: theme.palette.text.primary,
				px: { xs: 2, md: 6 },
				py: { xs: 4, md: 8 },
			})}
		>
			<Typography
				variant="h4"
				component="h1"
				sx={{
					mb: { xs: 2, sm: 3 },
					fontWeight: "bold",
					fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
					lineHeight: 1.2,
				}}
			>
				Collaborations
			</Typography>

            <Typography sx={{ mb: 6, maxWidth: 720 }}>
				Working with other artists is a cornerstone of my creative process. I thrive on blending diverse styles and perspectives — whether
				collaborating with vocalists, instrumentalists, or fellow producers. These tracks showcase the fusion of unique talents and visions.
			</Typography>

			<Grid container spacing={4}>
				{collaborations.map(({ title, embedUrl, description, image, slug }, idx) => {
					const linkSlug = slug ? slug : slugify(title);

					return (
						<Grid
							item
							xs={12}
							sm={12}
							md={6} // Full width on mobile/tablets, side-by-side on desktops
							key={embedUrl + idx}
						>
							<Card
								variant="outlined"
								sx={{
									height: "100%",
									display: "flex",
									flexDirection: "column",
									bgcolor: "background.paper",
								}}
							>
								<CardHeader
									titleTypographyProps={{
										variant: "h6",
										sx: {
											fontWeight: "bold",
											fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.5rem" },
											lineHeight: 1.3,
										},
									}}
									title={
										<Link to={`/collaborations/${linkSlug}`} style={{ textDecoration: "none", color: "inherit" }}>
											{title.length > 30 ? `${title.slice(0, 30)}...` : title}
										</Link>
									}
									sx={{ pb: 0 }}
								/>
								<CardContent sx={{ flexGrow: 1 }}>
									{embedUrl.includes("soundcloud.com") ? (
										<SoundCloudEmbed embedUrl={embedUrl} title={title} description={description} />
									) : (
										<AudioPlayer src={embedUrl} label={title} artwork={image} />
									)}
									<Typography
										variant="body2"
										sx={{
											mt: 2,
											fontSize: { xs: "0.95rem", sm: "1rem" },
											lineHeight: 1.6,
										}}
									>
										{description}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
}

export default Collaborations;
