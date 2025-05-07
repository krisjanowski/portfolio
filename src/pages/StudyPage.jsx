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

function AudioBox({ label, src }) {
	if (!src) return null; // Defensive: Don’t render empty boxes

	return <AudioPlayer src={src} label={label} />;
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
				{study.title}
			</Typography>

			<Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2, textAlign: "center" }}>
				{type === "study" ? "Study" : "Experiment"}
			</Typography>

			<Divider sx={{ mb: 4 }} />

			<Typography variant="body1" sx={{ mb: 4, maxWidth: 800, mx: "auto", textAlign: "center" }}>
				{study.description}
			</Typography>

			{/* Study type */}
			{type === "study" && (
				<>
					<Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
						Problem
					</Typography>
					<Typography variant="body1" sx={{ mb: 4, maxWidth: 800, mx: "auto", textAlign: "center" }}>
						{study.problem}
					</Typography>

					<Grid
						container
						spacing={{ xs: 0, sm: 3 }} // 🔥 spacing removed on mobile
						justifyContent="left"
						sx={{
							mb: 4,
							maxWidth: "100%",
							mx: "auto",
						}}
					>
						<Grid item xs={12} sm={6}>
							<AudioBox label={study.beforeLabel || "Before"} src={study.beforeUrl} />
						</Grid>
						<Grid item xs={12} sm={6}>
							<AudioBox label={study.afterLabel || "After"} src={study.afterUrl} />
						</Grid>
					</Grid>

					<Divider sx={{ my: { xs: 2, sm: 3 } }} />

					<Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
						Conclusion
					</Typography>
					<Typography variant="body1" sx={{ mb: 4, maxWidth: 800, mx: "auto", textAlign: "center" }}>
						{study.conclusion}
					</Typography>
				</>
			)}

			{type === "experiment" && (
				<>
					<Grid
						container
						spacing={3}
						justifyContent="center"
						sx={{
							mb: 4,
							maxWidth: 1000,
							mx: "auto",
						}}
					>
						{study.beforeUrl && (
							<Grid item xs={12} sm={4}>
								<AudioBox label={study.beforeLabel || "Before"} src={study.beforeUrl} />
							</Grid>
						)}
						{study.url && (
							<Grid item xs={12} sm={4}>
								<AudioBox label={study.urlLabel || "Audio"} src={study.url} />
							</Grid>
						)}
						{study.afterUrl && (
							<Grid item xs={12} sm={4}>
								<AudioBox label={study.afterLabel || "After"} src={study.afterUrl} />
							</Grid>
						)}
					</Grid>

					<Divider sx={{ my: { xs: 2, sm: 3 } }} />

					<Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
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
						bgcolor: (theme) => (theme.palette.mode === "dark" ? "grey.800" : "grey.100"),
						p: 3,
						borderRadius: 2,
						boxShadow: 1,
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
						{study.details}
					</ReactMarkdown>
				</Box>
			)}

			<Box sx={{ textAlign: "center" }}>
				<Button variant="outlined" component={Link} to="/studies" sx={{ mt: 6 }}>
					← Back to Studies
				</Button>
			</Box>
		</Box>
	);
}

export default StudyPage;
