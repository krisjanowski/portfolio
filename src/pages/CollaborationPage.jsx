import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, CircularProgress, Button, Divider } from "@mui/material";
import SoundCloudEmbed from "../components/SoundCloudEmbed.jsx";
import ReactMarkdown from "react-markdown"; // For markdown support
import AudioPlayer from "../components/AudioPlayer.jsx";

function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/[\s\W-]+/g, "-");
}

function CollaborationPage() {
	const { slug } = useParams();

	const [collab, setCollab] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetch("/uploads/collaborations.json")
			.then((res) => res.json())
			.then((data) => {
				const collaborations = data.collaborations || [];
				const found = collaborations.find((c) => {
					const projectSlug = c.slug ? c.slug : slugify(c.title);
					return projectSlug === slug;
				});

				if (found) {
					setCollab(found);
				} else {
					setError(true);
				}

				setLoading(false);
			})
			.catch((err) => {
				console.error("Failed to load collaborations.json:", err);
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

	if (error || !collab) {
		return (
			<Box sx={{ p: 6, textAlign: "center" }}>
				<Typography variant="h4" sx={{ mb: 2 }}>
					Collaboration Not Found
				</Typography>
				<Typography variant="body1" sx={{ mb: 4 }}>
					The collaboration you are looking for does not exist or has been removed.
				</Typography>
				<Button variant="contained" component={Link} to="/collaborations">
					Back to Collaborations
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
				{collab.title}
			</Typography>

			<Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2, textAlign: "center" }}>
				Collaboration
			</Typography>

			<Divider sx={{ mb: 4 }} />

			{/* Image (if exists) */}
			{collab.image && (
				<Box
					component="img"
					src={collab.image}
					alt={collab.title}
					sx={{
						width: "100%",
						maxWidth: 600,
						height: "auto",
						mb: 4,
						borderRadius: 2,
						boxShadow: 2,
						mx: "auto",
						display: "block",
					}}
				/>
			)}

			{/* Audio or SoundCloud */}
			<Box sx={{ mb: 4 }}>
				{collab.embedUrl.includes("soundcloud.com") ? (
					<Box sx={{ mx: "auto", maxWidth: 700 }}>
						<SoundCloudEmbed embedUrl={collab.embedUrl} title={collab.title} description={collab.description} />
					</Box>
				) : (
					<Box sx={{ mx: "auto", maxWidth: 600 }}>
						<AudioPlayer src={collab.embedUrl} label={collab.title} artwork={collab.image || "/defaultArtwork.png"} />
					</Box>
				)}
			</Box>

			{/* Description */}
			<Typography variant="body1" sx={{ mb: 4, maxWidth: 800, mx: "auto", textAlign: "center" }}>
				{collab.description}
			</Typography>

			{/* Details (Markdown) */}
			{collab.details && (
				<Box
					sx={{
						maxWidth: 800,
						mx: "auto",
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
						{collab.details}
					</ReactMarkdown>
				</Box>
			)}

			<Box sx={{ textAlign: "center" }}>
				<Button variant="outlined" component={Link} to="/collaborations" sx={{ mt: 6 }}>
					← Back to Collaborations
				</Button>
			</Box>
		</Box>
	);
}

export default CollaborationPage;
