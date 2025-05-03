import React from "react";
import { Box, Typography, Card, CardContent, CardHeader, Grid, Divider, useTheme } from "@mui/material";
import studies from "../data/studies.json";
import AudioPlayer from "../components/AudioPlayer";

function Studies() {
	const theme = useTheme();

	return (
		<Box
			sx={{
				bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.50",
				color: theme.palette.text.primary,
				px: { xs: 2, md: 6 },
				py: { xs: 4, md: 8 },
			}}
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
				Studies
			</Typography>

			<Typography
				sx={{
					mb: { xs: 4, sm: 5, md: 6 },
					maxWidth: 720,
					fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
					lineHeight: 1.6,
				}}
			>
				My academic work blends scientific research with creative audio exploration — from psychoacoustics to spatial perception. Each study
				below shows the “before” problem mix and the “after” solution.
			</Typography>

			<Grid container spacing={4}>
				{studies.map(
					(
						{ title, description, problem, beforeUrl, afterUrl, conclusion },
						idx
					) => (
						<Grid item xs={12} key={idx}>
							<Card variant="outlined" sx={{ bgcolor: "background.paper" }}>
								<CardHeader
									titleTypographyProps={{
										variant: "h6",
										sx: {
											fontWeight: "bold",
											fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
										},
									}}
									subheaderTypographyProps={{
										variant: "subtitle1",
										sx: {
											fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
											color: "text.secondary",
										},
									}}
									title={title.length > 30 ? `${title.slice(0, 30)}...` : title}
									subheader={description}
								/>
								<CardContent>
									<Typography
										variant="subtitle2"
										sx={{
											mb: 1,
											color: "text.secondary",
											fontSize: { xs: "0.95rem", sm: "1rem" },
										}}
									>
										Problem
									</Typography>
									<Typography
										sx={{
											mb: 2,
											fontSize: { xs: "1rem", sm: "1.125rem" },
											lineHeight: 1.5,
										}}
									>
										{problem}
									</Typography>

									<Grid container spacing={3}>
										<Grid item xs={12} md={6}>
											<AudioPlayer
												src={beforeUrl}
												label="Before"
												bgcolor={
													theme.palette.mode === "dark"
														? "rgba(139, 0, 0, 0.2)"  // Dark red tint
														: "rgba(255, 0, 0, 0.1)"  // Light red tint
												}
											/>
										</Grid>

										<Grid item xs={12} md={6}>
											<AudioPlayer
												src={afterUrl}
												label="After"
												bgcolor={
													theme.palette.mode === "dark"
														? "rgba(0, 100, 0, 0.2)"  // Dark green tint
														: "rgba(0, 128, 0, 0.1)"  // Light green tint
												}
											/>
										</Grid>
									</Grid>

									<Divider sx={{ my: { xs: 2, sm: 3 } }} />

									<Typography
										variant="subtitle2"
										sx={{
											mb: 1,
											color: "text.secondary",
											fontSize: { xs: "0.95rem", sm: "1rem" },
										}}
									>
										Conclusion
									</Typography>
									<Typography
										sx={{
											fontSize: { xs: "1rem", sm: "1.125rem" },
											lineHeight: 1.5,
										}}
									>
										{conclusion}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					)
				)}
			</Grid>
		</Box>
	);
}

export default Studies;
