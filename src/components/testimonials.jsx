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
				setTestimonials(data.testimonials || []); // ✅ UPDATED
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
	elevation={0}
	sx={{
		position: "relative",
		overflow: "hidden",
		borderRadius: "30px",
		px: { xs: 4, sm: 6 },
		py: { xs: 5, sm: 7 },
		maxWidth: 720,
		mx: "auto",
		bgcolor:
			theme.palette.mode === "dark"
				? "rgba(24,24,24,0.75)"
				: "#fefefe", // 🧠 crisp solid light background
		border: "1px solid",
		borderColor:
			theme.palette.mode === "dark"
				? "rgba(255,255,255,0.1)"
				: "rgba(0,0,0,0.12)", // 🧠 visible in light mode
		boxShadow:
			theme.palette.mode === "dark"
				? "0 0 40px rgba(0, 255, 255, 0.05)"
				: "0 4px 24px rgba(0, 0, 0, 0.08)",
		backdropFilter: "blur(10px)",
		transform: "rotate(-0.25deg)",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: 2,
		"&::before": {
			content: '""',
			position: "absolute",
			inset: 0,
			background:
				theme.palette.mode === "dark"
					? "radial-gradient(circle at 40% 20%, rgba(0,255,255,0.05), transparent)"
					: "radial-gradient(circle at 40% 20%, rgba(0,0,0,0.02), transparent)",
			pointerEvents: "none",
		},
	}}
>
	<Box sx={{ position: "relative" }}>
		<Box
			sx={{
				position: "absolute",
				top: -10,
				left: -10,
				width: 110,
				height: 110,
				borderRadius: "50%",
				background:
					theme.palette.mode === "dark"
						? "radial-gradient(circle, rgba(0,212,255,0.2) 0%, rgba(0,0,0,0) 60%)"
						: "radial-gradient(circle, rgba(0,0,0,0.05) 0%, rgba(255,255,255,0) 60%)",
				zIndex: 0,
				animation: "pulseGlow 4s ease-in-out infinite",
			}}
		/>
		<Avatar
			src={avatar || ""}
			sx={{
				width: 90,
				height: 90,
				bgcolor: avatar ? "transparent" : theme.palette.primary.main,
				fontSize: 40,
				color: "white",
				position: "relative",
				zIndex: 1,
			}}
		>
			{!avatar && name ? name[0] : ""}
		</Avatar>
	</Box>

	<Typography
		variant="body1"
		sx={{
			fontSize: { xs: "1.1rem", sm: "1.25rem" },
			fontStyle: "italic",
			color: theme.palette.text.primary,
			lineHeight: 1.8,
			px: 2,
			textAlign: "center",
			textShadow: theme.palette.mode === "dark" ? "0 0 6px rgba(0,0,0,0.3)" : "none",
		}}
	>
		“{testimonial}”
	</Typography>

	<Typography
		variant="h6"
		sx={{
			fontWeight: "bold",
			letterSpacing: "0.4px",
			mt: 1,
			textTransform: "uppercase",
			color: theme.palette.primary.main,
		}}
	>
		{name}
	</Typography>

	<Typography
		variant="subtitle2"
		sx={{ color: theme.palette.text.secondary }}
	>
		{role}
	</Typography>

	{/* Controls */}
	<Box
		sx={{
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			gap: 1,
			mt: 3,
		}}
	>
		<IconButton
			onClick={handlePrev}
			aria-label="Previous"
			size="small"
			sx={{ color: theme.palette.text.secondary }}
		>
			<ArrowBackIosNewIcon fontSize="small" />
		</IconButton>
		{testimonials.map((_, i) => (
			<Box
				key={i}
				sx={{
					width: i === index ? 10 : 8,
					height: i === index ? 10 : 8,
					borderRadius: "50%",
					bgcolor: i === index
						? theme.palette.primary.main
						: theme.palette.divider,
					transition: "all 0.3s ease",
				}}
			/>
		))}
		<IconButton
			onClick={handleNext}
			aria-label="Next"
			size="small"
			sx={{ color: theme.palette.text.secondary }}
		>
			<ArrowForwardIosIcon fontSize="small" />
		</IconButton>
	</Box>
</Paper>

			</Fade>
		</Box>
	);
}

export default Testimonials;
