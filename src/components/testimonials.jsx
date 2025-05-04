import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, IconButton, useTheme, Fade, Paper, CircularProgress } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Testimonials() {
	const theme = useTheme();
	const [testimonials, setTestimonials] = useState([]);
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(true);

	// ✅ Load JSON dynamically at runtime
	useEffect(() => {
		fetch("/uploads/testimonials.json")
			.then((res) => res.json())
			.then((data) => {
				setTestimonials(data.testimonials || []);  // ✅ UPDATED
				setLoading(false);
			})
			.catch((err) => {
				console.error("Failed to load testimonials.json:", err);
				setLoading(false);
			});
	}, []);

	const handleNext = () => {
		setIndex((prev) => (prev + 1) % testimonials.length);
	};

	const handlePrev = () => {
		setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	};

	// ✅ Auto-advance every 8 seconds (only when testimonials loaded)
	useEffect(() => {
		if (!testimonials.length) return;

		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % testimonials.length);
		}, 8000);

		return () => clearInterval(interval);
	}, [testimonials]);

	if (loading) {
		return (
			<Box sx={{ p: 6, textAlign: "center" }}>
				<CircularProgress />
			</Box>
		);
	}

	if (!testimonials.length) {
		return (
			<Box sx={{ p: 6, textAlign: "center" }}>
				<Typography>No testimonials available.</Typography>
			</Box>
		);
	}

	const { name, role, testimonial, avatar } = testimonials[index];

	return (
		<Box sx={{ mb: 6, pt: 3, textAlign: "center" }}>
			<Fade in={true} timeout={600} key={index}>
				<Paper
					elevation={3}
					sx={{
						maxWidth: 700,
						mx: "auto",
						py: { xs: 4, sm: 5 },
						px: { xs: 3, sm: 4 },
						borderRadius: 4,
						bgcolor: theme.palette.background.paper,
						color: theme.palette.text.primary,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 2,
						position: "relative",
					}}
				>
					<Avatar
						src={avatar || ""}
						sx={{
							width: 90,
							height: 90,
							bgcolor: avatar ? "transparent" : theme.palette.primary.main,
							fontSize: 40,
						}}
					>
						{!avatar && name ? name[0] : ""}
					</Avatar>

					<Typography
						variant="body1"
						sx={{
							fontStyle: "italic",
							fontSize: { xs: "1.1rem", sm: "1.2rem" },
							lineHeight: 1.7,
							maxWidth: 600,
						}}
					>
						{testimonial}
					</Typography>

					<Typography variant="h6" fontWeight="bold">
						{name}
					</Typography>
					<Typography variant="subtitle2" color="text.secondary">
						{role}
					</Typography>

					{/* Controls */}
					<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mt: 2 }}>
						<IconButton onClick={handlePrev} aria-label="Previous" size="small">
							<ArrowBackIosNewIcon fontSize="small" />
						</IconButton>
						{testimonials.map((_, i) => (
							<Box
								key={i}
								sx={{
									width: 8,
									height: 8,
									borderRadius: "50%",
									bgcolor: i === index ? theme.palette.primary.main : theme.palette.grey[400],
									transition: "all 0.3s",
								}}
							/>
						))}
						<IconButton onClick={handleNext} aria-label="Next" size="small">
							<ArrowForwardIosIcon fontSize="small" />
						</IconButton>
					</Box>
				</Paper>
			</Fade>
		</Box>
	);
}

export default Testimonials;
