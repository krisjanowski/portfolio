import React, { useState, useRef } from "react";
import { Box, Typography, TextField, Button, Grid, Alert, Container, Paper, IconButton, Divider } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AppleIcon from "@mui/icons-material/Apple";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import RoomIcon from "@mui/icons-material/Room";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");
	const responseRef = useRef(null);

	// 👉 Replace this with your actual Formspree endpoint:
	const formEndpoint = "https://formspree.io/f/yourformid";

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Basic validation
		if (!formData.name || !formData.email || !formData.message) {
			setError("Please fill in all fields.");
			setSubmitted(false);
			responseRef.current?.scrollIntoView({ behavior: "smooth" });
			return;
		}

		setError("");

		try {
			const response = await fetch(formEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					message: formData.message,
				}),
			});

			if (response.ok) {
				setSubmitted(true);
				setFormData({ name: "", email: "", message: "" });
				responseRef.current?.scrollIntoView({ behavior: "smooth" });
			} else {
				const data = await response.json();
				throw new Error(data?.error || "An error occurred. Please try again later.");
			}
		} catch (err) {
			setError(err.message);
			setSubmitted(false);
			responseRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	};

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
				Contact Kris Janowski
			</Typography>
			<Typography variant="body1" gutterBottom>
				Interested in working together? Want to discuss a project or just say hello? Use the form below or reach out via social media.
			</Typography>

			<Divider sx={{ my: 3 }} />

			{/* Contact Form */}
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<TextField fullWidth label="Your Name" name="name" value={formData.name} onChange={handleChange} required />
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField fullWidth label="Your Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							label="Your Message"
							name="message"
							multiline
							rows={6}
							value={formData.message}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={12} ref={responseRef}>
						{error && (
							<Alert severity="error" sx={{ transition: "0.3s" }}>
								{error}
							</Alert>
						)}
						{submitted && (
							<Alert severity="success" sx={{ transition: "0.3s" }}>
								Thank you! Your message has been sent.
							</Alert>
						)}
					</Grid>
					<Grid item xs={12}>
						<Button type="submit" variant="contained" color="primary" size="large">
							Send Message
						</Button>
					</Grid>
				</Grid>
			</Box>

			<Divider sx={{ my: 4 }} />

			{/* Alternative Contact Info */}
			<Box sx={{ textAlign: "center" }}>
				<Typography variant="h5" gutterBottom>
					Connect with me
				</Typography>
				<Box>
					<IconButton
						component="a"
						href="https://soundcloud.com/kris-janowski"
						target="_blank"
						rel="noopener"
						title="SoundCloud"
						sx={{
							bgcolor: "primary.main",
							color: "white",
							m: 1,
							"&:hover": { bgcolor: "primary.dark" },
						}}
					>
						<MusicNoteIcon />
					</IconButton>
					<IconButton
						component="a"
						href="https://music.apple.com/us/artist/kris-janowski/1628563447"
						target="_blank"
						rel="noopener"
						title="Apple Music"
						sx={{
							bgcolor: "black",
							color: "white",
							m: 1,
							"&:hover": { bgcolor: "grey.800" },
						}}
					>
						<AppleIcon />
					</IconButton>
					<IconButton
						component="a"
						href="https://www.linkedin.com/in/kris-janowski-4a4b80b1/"
						target="_blank"
						rel="noopener"
						title="LinkedIn"
						sx={{
							bgcolor: "#0077B5",
							color: "white",
							m: 1,
							"&:hover": { bgcolor: "#005582" },
						}}
					>
						<LinkedInIcon />
					</IconButton>
				</Box>
			</Box>

			<Divider sx={{ my: 4 }} />

			{/* Business Metadata */}
			<Grid container spacing={2} justifyContent="center">
				<Grid item xs={12} md={6}>
					<Box display="flex" alignItems="center" justifyContent="center">
						<RoomIcon sx={{ mr: 1 }} />
						<Typography variant="body1">Based in Barkingside, London, UK</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} md={6}>
					<Box display="flex" alignItems="center" justifyContent="center">
						<AccessTimeIcon sx={{ mr: 1 }} />
						<Typography variant="body1">Availability: Mon–Fri, 8am–6pm GMT</Typography>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default Contact;
