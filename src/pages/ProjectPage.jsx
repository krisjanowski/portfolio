import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, CircularProgress, Button, Divider } from "@mui/material";
import SoundCloudEmbed from "../components/SoundCloudEmbed.jsx";
import AudioPlayer from "../components/AudioPlayer.jsx";
import ReactMarkdown from "react-markdown"; // <-- NEW for markdown rendering

function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/[\s\W-]+/g, "-");
}

function ProjectPage() {
	const { slug } = useParams();

	const [project, setProject] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetch("/uploads/soloProjects.json")
			.then((res) => res.json())
			.then((data) => {
				const projects = data.projects || [];
				const found = projects.find((p) => {
					const projectSlug = p.slug ? p.slug : slugify(p.title);
					return projectSlug === slug;
				});

				if (found) {
					setProject(found);
				} else {
					setError(true);
				}

				setLoading(false);
			})
			.catch((err) => {
				console.error("Failed to load soloProjects.json:", err);
				setError(true);
				setLoading(false);
			});
	}, [slug]);

	if (loading) {
		return (
			<Box sx={{ p: 6, textAlign: "center" }}>
				<CircularProgress />
			</Box>
		);
	}

	if (error || !project) {
		return (
			<Box sx={{ p: 6, textAlign: "center" }}>
				<Typography variant="h4" sx={{ mb: 2 }}>
					Project Not Found
				</Typography>
				<Typography variant="body1" sx={{ mb: 4 }}>
					The project you are looking for does not exist or has been removed.
				</Typography>
				<Button variant="contained" component={Link} to="/solo-projects">
					Back to Solo Projects
				</Button>
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
				textAlign: "left",
			})}
		>
			<Typography
				variant="h3"
				component="h1"
				sx={{
					fontWeight: "bold",
					mb: 1,
					fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
					lineHeight: 1.2,
					textAlign: "center",
				}}
			>
				{project.title}
			</Typography>

			<Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2, textAlign: "center" }}>
				{project.category}
			</Typography>

			<Divider sx={{ mb: 4 }} />

			{/* Image */}
			{project.image && (
				<Box
					component="img"
					src={project.image}
					alt={project.title}
					sx={{
						width: "100%",
						maxWidth: 600,
						height: "auto",
						mb: 4,
						borderRadius: 2,
						boxShadow: 2,
						mx: "auto", // centers horizontally
						display: "block",
					}}
				/>
			)}

			{/* Audio or SoundCloud */}
			<Box sx={{ mb: 4 }}>
				{project.embedUrl.includes("soundcloud.com") ? (
					<Box sx={{ mx: "auto", maxWidth: 700 }}>
						<SoundCloudEmbed embedUrl={project.embedUrl} title={project.title} description={project.description} />
					</Box>
				) : (
					<Box sx={{ mx: "auto", maxWidth: 600 }}>
						<AudioPlayer src={project.embedUrl} label={project.title} artwork={project.image || "/defaultArtwork.png"} />
					</Box>
				)}
			</Box>

			{/* Description */}
			<Typography variant="body1" sx={{ mb: 4, maxWidth: 800, mx: "auto", textAlign: "center" }}>
				{project.description}
			</Typography>

			{/* Details (Markdown) */}
			{project.details && (
				<Box
					sx={{
						maxWidth: 800,
						mx: "auto",
						textAlign: "left",
						bgcolor: "#2a2b2f",
						p: 3,
						borderRadius: 2,
					}}
				>
					<ReactMarkdown
						components={{
							h1: ({ node, ...props }) => <Typography variant="h4" gutterBottom {...props} />,
							h2: ({ node, ...props }) => <Typography variant="h5" gutterBottom {...props} />,
							p: ({ node, ...props }) => <Typography variant="body1" paragraph {...props} />,
							li: ({ node, ...props }) => (
								<li>
									<Typography component="span" variant="body1" {...props} />
								</li>
							),
						}}
					>
						{project.details}
					</ReactMarkdown>
				</Box>
			)}

			<Box sx={{ textAlign: "center" }}>
				<Button variant="outlined" component={Link} to="/solo-projects" sx={{ mt: 6 }}>
					← Back to Solo Projects
				</Button>
			</Box>
		</Box>
	);
}

export default ProjectPage;
