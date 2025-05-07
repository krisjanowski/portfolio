import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, CardHeader, Grid, Divider, useTheme, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import ScienceIcon from "@mui/icons-material/Science"; // For experiments
import MenuBookIcon from "@mui/icons-material/MenuBook";

function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/[\s\W-]+/g, "-");
}

function getTypeIcon(type) {
	if (type === "experiment") {
		return <ScienceIcon color="primary" sx={{ fontSize: 32 }} />;
	} else {
		return <MenuBookIcon color="secondary" sx={{ fontSize: 32 }} />;
	}
}

function Studies() {
	const theme = useTheme();
	const [studies, setStudies] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/uploads/studies.json")
			.then((res) => res.json())
			.then((data) => {
				setStudies(data.studies || []);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Failed to load studies.json:", err);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<Box sx={{ p: 6, textAlign: "center" }}>
				<CircularProgress />
			</Box>
		);
	}

	if (!studies.length) {
		return (
			<Box sx={{ p: 6, textAlign: "center" }}>
				<Typography>No studies available.</Typography>
			</Box>
		);
	}

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
				Studies & Experiments
			</Typography>

			<Typography sx={{ mb: 6, maxWidth: 720 }}>
				My academic work blends scientific research with creative audio exploration — from psychoacoustics to spatial perception.
			</Typography>

			<Grid container spacing={4}>
				{studies.map((item, idx) => {
					const type = item.type || "study"; // or experiment
					const linkSlug = item.slug ? item.slug : slugify(item.title);

					return (
						<Grid item xs={12} key={idx}>
							<Card variant="outlined" sx={{ bgcolor: "background.paper" }}>
								<CardHeader
									avatar={getTypeIcon(type)}
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
									title={
										<Link to={`/studies/${linkSlug}`} style={{ textDecoration: "none", color: "inherit" }}>
											{item.title}
										</Link>
									}
									subheader={item.description}
								/>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
}

export default Studies;
