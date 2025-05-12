import React from "react";
import { Box, Typography, Grid, Button, Card, CardContent, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import Testimonials from "../components/testimonials";
import LatestPosts from "../components/LatestPosts";
import SpecialButton from "../components/SpecialButton";

function Home() {
	const theme = useTheme();
	const cards = [
		{
			title: "Solo Projects",
			description: "Original works blending electronic soundscapes, polyrhythmic layers, and emotive melodies.",
			buttonText: "View Projects",
			link: "/solo-projects",
		},
		{
			title: "Collaborations",
			description: "A collection of tracks created with talented vocalists, instrumentalists, and fellow producers.",
			buttonText: "Explore Collaborations",
			link: "/collaborations",
		},
		{
			title: "Academic Studies",
			description: "Research into psychoacoustics, spatial perception, and advanced mixing techniques.",
			buttonText: "Read Studies",
			link: "/studies",
		},
	];
	return (
		<Box
			sx={(theme) => ({
				bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.50",
				color: theme.palette.text.primary,
				px: { xs: 2, md: 6 },
				py: { xs: 4, md: 8 },
			})}
		>
			{/* HERO SECTION */}
			<Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 }, px: { xs: 2, sm: 3, md: 4 } }}>
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

			<Grid container spacing={4}>
				{cards.map((card, index) => (
					<Grid item xs={12} md={4} key={index}>
						<Box
							sx={(theme) => ({
								position: "relative",
								overflow: "hidden",
								borderRadius: "20px",
								background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.02)" : theme.palette.background.paper,
								border: "1px solid",
								borderColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
								backdropFilter: "blur(10px)",
								transition: "transform 0.4s ease, box-shadow 0.4s ease",
								boxShadow: theme.palette.mode === "dark" ? "0 10px 30px rgba(0,0,0,0.3)" : "0 8px 20px rgba(0,0,0,0.05)",
								"&:hover": {
									transform: "translateY(-6px)",
									boxShadow: theme.palette.mode === "dark" ? "0 16px 40px rgba(0,0,0,0.4)" : "0 12px 28px rgba(0,0,0,0.08)",
								},
								"&::before": {
									content: '""',
									position: "absolute",
									top: 0,
									left: "-75%",
									width: "200%",
									height: "100%",
									background:
										theme.palette.mode === "dark"
											? "linear-gradient(120deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 20%, rgba(255,255,255,0.1) 60%)"
											: "linear-gradient(120deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.02) 20%, rgba(0,0,0,0.04) 60%)",
									transform: "skewX(-25deg)",
									transition: "0.8s",
									zIndex: 0,
								},
								"&:hover::before": {
									left: "100%",
								},
							})}
						>
							<Box
								sx={{
									position: "relative",
									zIndex: 1,
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									height: "100%",
									p: 3,
								}}
							>
								<CardContent sx={{ flexGrow: 1 }}>
									<Typography
										variant="h6"
										fontWeight="bold"
										sx={{
											fontSize: "1.25rem",
											letterSpacing: "0.5px",
											color: (theme) => theme.palette.primary.main,
											mb: 1,
										}}
									>
										{card.title}
									</Typography>
									<Typography
										variant="body2"
										sx={(theme) => ({
											color: theme.palette.text.secondary,
											fontSize: "0.95rem",
											lineHeight: 1.6,
										})}
									>
										{card.description}
									</Typography>
								</CardContent>
								<Box sx={{ mt: 3 }}>
									<Button
										variant="outlined"
										component={Link}
										to={card.link}
										size="large"
										fullWidth
										sx={(theme) => ({
											borderRadius: "28px",
											fontWeight: 600,
											textTransform: "none",
											py: 1.4,
											backdropFilter: "blur(6px)",
											backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
											borderColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.2)" : theme.palette.primary.main,
											color: theme.palette.mode === "dark" ? "#fff" : theme.palette.primary.main,
											"&:hover": {
												transform: "scale(1.05)",
												backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.04)",
												boxShadow:
													theme.palette.mode === "dark" ? "0 4px 14px rgba(0,0,0,0.4)" : "0 4px 12px rgba(0,0,0,0.1)",
											},
										})}
									>
										{card.buttonText}
									</Button>
								</Box>
							</Box>
						</Box>
					</Grid>
				))}
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
				<Testimonials />
				<SpecialButton link="/contact" text="Contact Me" />
				<Box sx={{ mt: 8 }}>
					<LatestPosts count={3} layout={"grid"} />
				</Box>
			</Box>
		</Box>
	);
}

export default Home;
