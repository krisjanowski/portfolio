import React from "react";
import { Box, Typography, Grid, Card, CardContent, CardHeader } from "@mui/material";
import SoundCloudEmbed from "../components/SoundCloudEmbed.jsx";
import soloProjects from "../data/soloProjects.json";

function SoloProjects() {
	// Each project gets a title, description, and SoundCloud embed

	return (
		<Box
			sx={(theme) => ({
				bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.50",
				color: theme.palette.text.primary,
				px: { xs: 0, md: 6 },
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

			<Grid container spacing={4}>
				{soloProjects.map(({ title, embedUrl, description }, idx) => (
					<Grid item xs={12} sm={6} md={6} key={idx}>
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
								<SoundCloudEmbed embedUrl={embedUrl} />
								<Typography variant="body2" sx={{ mt: 2 }}>
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

export default SoloProjects;
