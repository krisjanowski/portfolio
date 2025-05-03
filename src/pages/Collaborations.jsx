import React from "react";
import { Box, Typography, Grid, Card, CardHeader, CardContent } from "@mui/material";
import SoundCloudEmbed from "../components/SoundCloudEmbed.jsx";
import collabs from "../data/collaborations.json";

function Collaborations() {
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

			<Typography
				sx={{
					mb: { xs: 4, sm: 5, md: 6 },
					maxWidth: 720,
					fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
					lineHeight: 1.6,
				}}
			>
				Working with other artists is a cornerstone of my creative process. I thrive on blending diverse styles and perspectives — whether
				collaborating with vocalists, instrumentalists, or fellow producers. These tracks showcase the fusion of unique talents and visions.
			</Typography>

			<Grid container spacing={4}>
				{collabs.map(({ title, embedUrl, description }, idx) => (
					<Grid
						item
						xs={12}
						sm={12}
						md={6} // Full width on mobile/tablets, side-by-side on desktops
						key={idx}
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
								title={title.length > 30 ? `${title.slice(0, 30)}...` : title}
								sx={{ pb: 0 }}
							/>
							<CardContent sx={{ flexGrow: 1 }}>
								<SoundCloudEmbed embedUrl={embedUrl} />
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
				))}
			</Grid>
		</Box>
	);
}

export default Collaborations;
