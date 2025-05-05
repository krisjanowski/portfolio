import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, CircularProgress, Button, Divider, Grid } from "@mui/material";
import AudioPlayer from "../components/AudioPlayer";
import ReactMarkdown from "react-markdown";

function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/[\s\W-]+/g, "-");
}

function StudyPage() {
	const { slug } = useParams();

	const [study, setStudy] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetch("/uploads/studies.json")
			.then((res) => res.json())
			.then((data) => {
				const studies = data.studies || [];
				const found = studies.find((s) => {
					const studySlug = s.slug ? s.slug : slugify(s.title);
					return studySlug === slug;
				});

				if (found) {
					setStudy(found);
				} else {
					setError(true);
				}

				setLoading(false);
			})
			.catch((err) => {
				console.error("Failed to load studies.json:", err);
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

	if (error || !study) {
		return (
			<Box sx={{ p: 6, textAlign: "center" }}>
				<Typography variant="h4" sx={{ mb: 2 }}>
					Study Not Found
				</Typography>
				<Typography variant="body1" sx={{ mb: 4 }}>
					The study you are looking for does not exist or has been removed.
				</Typography>
				<Button variant="contained" component={Link} to="/studies">
					Back to Studies
				</Button>
			</Box>
		);
	}

	const type = study.type || "study";

	return (
		<Box
			sx={(theme) => ({
				bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.50",
				color: theme.palette.text.primary,
				px: { xs: 2, md: 6 },
				py: { xs: 4, md: 8 },
				textAlign: "center"
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
				}}
			>
				{study.title}
			</Typography>

			<Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
				{type === "study" ? "Study" : "Experiment"}
			</Typography>

			<Divider sx={{ mb: 4 }} />

			<Typography variant="body1" sx={{ mb: 4, maxWidth: 800, mx: "auto" }}>
				{study.description}
			</Typography>

			{/* Study type */}
			{type === "study" && (
				<>
					<Typography variant="h5" sx={{ mb: 2 }}>
						Problem
					</Typography>
					<Typography variant="body1" sx={{ mb: 4, maxWidth: 800, mx: "auto" }}>
						{study.problem}
					</Typography>

					<Grid container spacing={3} sx={{ mb: 4 }}>
						<Grid item xs={12} md={6}>
							<AudioPlayer
								src={study.beforeUrl}
								label="Before"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<AudioPlayer
								src={study.afterUrl}
								label="After"
							/>
						</Grid>
					</Grid>

					<Divider sx={{ my: { xs: 2, sm: 3 } }} />

					<Typography variant="h5" sx={{ mb: 2 }}>
						Conclusion
					</Typography>
					<Typography variant="body1" sx={{ mb: 4, maxWidth: 800, mx: "auto" }}>
						{study.conclusion}
					</Typography>
				</>
			)}

			{/* Experiment type */}
			{type === "experiment" && (
				<>
					{study.url && (
						<AudioPlayer
							src={study.url}
							label="Audio"
						/>
					)}

					<Divider sx={{ my: { xs: 2, sm: 3 } }} />

					<Typography variant="h5" sx={{ mb: 2 }}>
						Conclusion
					</Typography>
					<Typography variant="body1" sx={{ mb: 4, maxWidth: 800, mx: "auto" }}>
						{study.conclusion}
					</Typography>
				</>
			)}

			{/* Details (Markdown) */}
			{study.details && (
				<Box
					sx={{
						maxWidth: 800,
						mx: "auto",
						textAlign: "left",
						bgcolor: (theme) => theme.palette.mode === "dark" ? "grey.800" : "grey.100",
						p: 3,
						borderRadius: 2,
						boxShadow: 1
					}}
				>
					<Typography variant="h5" sx={{ mb: 2 }}>
						Additional Details
					</Typography>
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
						{study.details}
					</ReactMarkdown>
				</Box>
			)}

			<Button variant="outlined" component={Link} to="/studies" sx={{ mt: 6 }}>
				← Back to Studies
			</Button>
		</Box>
	);
}

export default StudyPage;
