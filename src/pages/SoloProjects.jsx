import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, CardHeader, CircularProgress } from "@mui/material";
import SoundCloudEmbed from "../components/SoundCloudEmbed.jsx";
import AudioPlayer from "../components/AudioPlayer.jsx";

function SoloProjects() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/uploads/soloProjects.json")
			.then((res) => res.json())
			.then((data) => {
				setProjects(data.projects || []);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Failed to load soloProjects.json:", err);
				setLoading(false);
			});
	}, []);

	// Group by category
	const grouped = projects.reduce((acc, project) => {
		if (!acc[project.category]) {
			acc[project.category] = [];
		}
		acc[project.category].push(project);
		return acc;
	}, {});

	if (loading) {
		return (
			<Box sx={{ p: 6, textAlign: "center" }}>
				<CircularProgress />
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
				Solo Projects
			</Typography>

			<Typography sx={{ mb: 6, maxWidth: 720 }}>
				My solo work reflects my personal vision — blending electronic soundscapes, intricate rhythms, and emotive melodic structures. Each
				piece is carefully crafted to push creative boundaries and evoke powerful responses.
			</Typography>

			{/* Loop through categories */}
			{Object.entries(grouped).map(([category, projects]) => (
				<Box key={category} sx={{ mb: 6 }}>
					<Typography
						variant="h5"
						sx={{
							fontWeight: "bold",
							mb: 3,
							borderBottom: 2,
							borderColor: "divider",
							pb: 1
						}}
					>
						{category}
					</Typography>

					<Grid container spacing={4}>
						{projects.map(({ title, embedUrl, description, image }, idx) => (
							<Grid item xs={12} sm={6} md={6} key={embedUrl + idx}>
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
										titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
										title={title.length > 30 ? `${title.slice(0, 30)}...` : title}
										sx={{ pb: 0 }}
									/>
									<CardContent sx={{ flexGrow: 1 }}>
										{/* 🔥 Decide which player to show */}
										{embedUrl.includes("soundcloud.com") ? (
											<SoundCloudEmbed embedUrl={embedUrl} title={title} description={description} />
										) : (
											<AudioPlayer
												src={embedUrl}
												label={title}
												artwork={embedUrl.endsWith(".wav") ? image : undefined}
											/>
										)}

										<Typography variant="body2" sx={{ mt: 2 }}>
											{description}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>
			))}
		</Box>
	);
}

export default SoloProjects;
