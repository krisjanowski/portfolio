import React from "react";
import { Box, Typography, Grid, Button, Card, CardContent, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
	const theme = useTheme();

	return (
		<Box
			sx={(theme) => ({
				bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.50",
				color: theme.palette.text.primary,
				px: { xs: 0, md: 6 },
				py: { xs: 4, md: 8 },
			})}
		>
			{/* HERO SECTION */}
			<Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						mb: { xs: 4, sm: 5, md: 6 },
					}}
				>
					<Box
						component="img"
						src="/image.png"
						alt="Kris Janowski profile"
						sx={{
							width: { xs: 150, sm: 200, md: 250 },
							height: { xs: 150, sm: 200, md: 250 },
							borderRadius: "50%",
							objectFit: "cover",
							boxShadow: 3,
							bgcolor: theme.palette.background.paper,
						}}
					/>
				</Box>
				<Typography
					variant="h3"
					sx={{
						fontWeight: "bold",
						fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
						mb: 2,
						lineHeight: 1.2,
						whiteSpace: "normal",
					}}
				>
					Welcome to Kris Janowski’s Portfolio
				</Typography>

				<Typography
					sx={{
						fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.5rem" },
						mb: 3,
						maxWidth: 700,
						mx: "auto",
						lineHeight: 1.5,
					}}
				>
					Audio Engineer | Producer | Sound Researcher
				</Typography>

				<Typography
					sx={{
						fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
						maxWidth: 800,
						mx: "auto",
						lineHeight: 1.6,
					}}
				>
					I’m Kris Janowski, a 32‑year‑old audio engineer and producer based in London. Passionate about mixing, mastering, production, and
					creative collaborations, I’ve been immersed in music since the age of 12.
				</Typography>
			</Box>

			{/* SIGNATURE STATEMENT */}
			<Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
				<Typography
					variant="h5"
					sx={{
						fontWeight: "medium",
						fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
						lineHeight: 1.3,
					}}
				>
					“Crafting immersive sound that resonates — technically precise, creatively inspired.”
				</Typography>
			</Box>

			{/* JOURNEY & CREDENTIALS */}
			<Box sx={{ mb: { xs: 5, md: 8 }, maxWidth: 900, mx: "auto" }}>
				<Typography
					sx={{
						fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
						mb: { xs: 2, sm: 3 },
						lineHeight: 1.6,
					}}
				>
					My journey has taken me from early experimental projects to professional studio work. I hold a BSc in Neuroscience and a Master’s
					in Popular Music Production. This unique background allows me to blend technical expertise with creative artistry — crafting sound
					that not only meets industry standards but resonates deeply with listeners.
				</Typography>
				<Typography
					sx={{
						fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
						lineHeight: 1.6,
					}}
				>
					Explore my solo projects, collaborations, and academic studies to discover the sonic landscapes I’ve built throughout my career.
				</Typography>
			</Box>

			{/* FEATURED SECTIONS PREVIEW */}
			<Grid container spacing={4}>
				<Grid item xs={12} md={4}>
					<Card
						variant="outlined"
						sx={{
							height: "100%",
							bgcolor: theme.palette.background.paper,
							color: theme.palette.text.primary,
						}}
					>
						<CardContent>
							<Typography variant="h6" fontWeight="bold" gutterBottom>
								Solo Projects
							</Typography>
							<Typography sx={{ mb: 2 }}>
								Original works blending electronic soundscapes, polyrhythmic layers, and emotive melodies.
							</Typography>
							<Button variant="contained" component={Link} to="/solo-projects" size="small">
								View Projects
							</Button>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} md={4}>
					<Card
						variant="outlined"
						sx={{
							height: "100%",
							bgcolor: theme.palette.background.paper,
							color: theme.palette.text.primary,
						}}
					>
						<CardContent>
							<Typography variant="h6" fontWeight="bold" gutterBottom>
								Collaborations
							</Typography>
							<Typography sx={{ mb: 2 }}>
								A collection of tracks created with talented vocalists, instrumentalists, and fellow producers.
							</Typography>
							<Button variant="contained" component={Link} to="/collaborations" size="small">
								Explore Collaborations
							</Button>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} md={4}>
					<Card
						variant="outlined"
						sx={{
							height: "100%",
							bgcolor: theme.palette.background.paper,
							color: theme.palette.text.primary,
						}}
					>
						<CardContent>
							<Typography variant="h6" fontWeight="bold" gutterBottom>
								Academic Studies
							</Typography>
							<Typography sx={{ mb: 2 }}>Research into psychoacoustics, spatial perception, and advanced mixing techniques.</Typography>
							<Button variant="contained" component={Link} to="/studies" size="small">
								Read Studies
							</Button>
						</CardContent>
					</Card>
				</Grid>
			</Grid>

			{/* CALL TO ACTION */}
			<Box sx={{ textAlign: "center", mt: { xs: 5, md: 8 } }}>
				<Typography
					variant="h5"
					sx={{
						mb: 2,
						fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
						fontWeight: "medium",
					}}
				>
					Ready to collaborate or need an expert touch for your next project?
				</Typography>
				<Button variant="outlined" size="large" component={Link} to="/contact">
					Contact Kris
				</Button>
			</Box>
		</Box>
	);
}

export default Home;
