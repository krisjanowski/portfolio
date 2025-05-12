// GetAQuote.js
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Alert, Container, Checkbox, FormControlLabel, MenuItem, Paper, Divider } from "@mui/material";
import SpecialButton from "../components/SpecialButton.jsx";

const SERVICES = ["Mixing", "Mastering", "Both", "Stem Mixing", "Vocal Tuning", "Audio Restoration", "Podcast Editing"];
const GENRES = ["Pop", "Rock", "Hip-Hop", "Electronic", "Jazz", "Classical", "Other"];
const FORMATS = ["WAV Stems", "Full DAW Session", "Other"];

function calculateQuote({ services, trackCount, stemsPerTrack, extras, rush }) {
	let baseRate = 80; // updated base rate for London-based pro

	let serviceMultiplier = 1.0;
	if (services.includes("Both")) {
		serviceMultiplier = 1.75;
	} else if (services.includes("Mixing") && services.includes("Mastering")) {
		serviceMultiplier = 1.75;
	} else if (services.length === 1 && services[0] === "Mastering") {
		serviceMultiplier = 0.6;
	} else {
		serviceMultiplier = services.length * 0.8;
	}

	let stemComplexity = 1.0;
	if (stemsPerTrack > 30) stemComplexity = 1.5;
	else if (stemsPerTrack > 15) stemComplexity = 1.2;

	let extrasFee = 0;
	if (extras.includes("Vocal Tuning")) extrasFee += 15;
	if (extras.includes("Drum Editing")) extrasFee += 20;

	let rushFee = rush ? 1.4 : 1.0;

	let quote = trackCount * baseRate * serviceMultiplier * stemComplexity * rushFee + extrasFee * trackCount;
	return Math.round(quote * 10) / 10;
}

function GetAQuote() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		services: [],
		genre: "",
		trackCount: 1,
		stemsPerTrack: 10,
		format: "",
		referenceLinks: "",
		soundDescription: "",
		extras: [],
		deliveryDate: "",
		rush: false,
		notes: "",
		budget: "",
		agree: false,
	});

	const [quote, setQuote] = useState(null);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		if (type === "checkbox" && name === "agree") {
			setForm({ ...form, [name]: checked });
		} else {
			setForm({ ...form, [name]: value });
		}
	};

	const handleMultiSelect = (e) => {
		const { value } = e.target;
		setForm({ ...form, services: typeof value === "string" ? value.split(",") : value });
	};

	const handleExtrasToggle = (extra) => {
		setForm((prev) => ({
			...prev,
			extras: prev.extras.includes(extra) ? prev.extras.filter((e) => e !== extra) : [...prev.extras, extra],
		}));
	};

	const handleSubmit = () => {
		if (!form.name || !form.email || !form.services.length || !form.genre || !form.format || !form.agree) {
			setError("Please fill all required fields and accept the terms.");
			return;
		}
		setError(null);
		const cost = calculateQuote(form);
		setQuote(cost);
	};

	const handleFinalSubmit = async () => {
		const message = `
Name: ${form.name}
Email: ${form.email}

Services: ${form.services.join(", ")}
Genre: ${form.genre}
Number of Songs: ${form.trackCount}
Stems per Song: ${form.stemsPerTrack}
Session Format: ${form.format}
Reference Links: ${form.referenceLinks}
Sound Description: ${form.soundDescription}
Extras: ${form.extras.join(", ")}
Delivery Date: ${form.deliveryDate}
Rush: ${form.rush ? "Yes" : "No"}
Notes: ${form.notes}
Budget: ${form.budget}

Estimated Quote: £${quote}
  `;

		try {
			const response = await fetch("https://formspree.io/f/mdkgevwe", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: form.name,
					email: form.email,
					message,
				}),
			});

			if (!response.ok) {
				const errData = await response.json();
				throw new Error(errData?.error || "Submission failed.");
			}

			setSubmitted(true);
		} catch (err) {
			setError(err.message);
			setSubmitted(false);
		}
	};

	return (
		<Box
			sx={(theme) => ({
				bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.50",
				color: theme.palette.text.primary,
				px: { xs: 2, md: 6 },
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
				Get a Quote
			</Typography>
			<Typography variant="body1" gutterBottom>
				Fill out the form below to receive a personalized quote for your project. Please provide as much detail as possible to help us understand your needs.
			</Typography>

			<Divider sx={{ my: 3 }} />

			{error && <Alert severity="error">{error}</Alert>}

			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField fullWidth label="Your Name" name="name" value={form.name} onChange={handleChange} required />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField fullWidth label="Email Address" name="email" value={form.email} onChange={handleChange} required />
				</Grid>

				<Grid item xs={12}>
					<TextField
						fullWidth
						select
						label="Services Needed"
						value={form.services}
						onChange={handleMultiSelect}
						SelectProps={{ multiple: true }}
						helperText="Choose one or more services"
					>
						{SERVICES.map((option) => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</TextField>
				</Grid>

				<Grid item xs={12} sm={6}>
					<TextField fullWidth label="Number of Songs" name="trackCount" type="number" value={form.trackCount} onChange={handleChange} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="Stems per Song (estimate)"
						name="stemsPerTrack"
						type="number"
						value={form.stemsPerTrack}
						onChange={handleChange}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField fullWidth label="Genre" select value={form.genre} onChange={handleChange} name="genre">
						{GENRES.map((genre) => (
							<MenuItem key={genre} value={genre}>
								{genre}
							</MenuItem>
						))}
					</TextField>
				</Grid>

				<Grid item xs={12}>
					<TextField fullWidth select label="Session Format" name="format" value={form.format} onChange={handleChange}>
						{FORMATS.map((fmt) => (
							<MenuItem key={fmt} value={fmt}>
								{fmt}
							</MenuItem>
						))}
					</TextField>
				</Grid>

				<Grid item xs={12}>
					<TextField
						fullWidth
						label="Reference Links (optional)"
						name="referenceLinks"
						value={form.referenceLinks}
						onChange={handleChange}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						fullWidth
						multiline
						rows={3}
						label="Describe your sound or goals"
						name="soundDescription"
						value={form.soundDescription}
						onChange={handleChange}
					/>
				</Grid>

				<Grid item xs={12}>
					<FormControlLabel
						control={<Checkbox checked={form.extras.includes("Vocal Tuning")} onChange={() => handleExtrasToggle("Vocal Tuning")} />}
						label="Include Vocal Tuning"
					/>
					<FormControlLabel
						control={<Checkbox checked={form.extras.includes("Drum Editing")} onChange={() => handleExtrasToggle("Drum Editing")} />}
						label="Include Drum Editing"
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						type="date"
						label="Desired Delivery Date"
						name="deliveryDate"
						InputLabelProps={{ shrink: true }}
						value={form.deliveryDate}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControlLabel
						control={<Checkbox checked={form.rush} onChange={(e) => setForm({ ...form, rush: e.target.checked })} />}
						label="Rush Delivery?"
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField fullWidth multiline rows={2} label="Extra Notes" name="notes" value={form.notes} onChange={handleChange} />
				</Grid>

				<Grid item xs={12}>
					<TextField fullWidth label="Estimated Budget (optional)" name="budget" value={form.budget} onChange={handleChange} />
				</Grid>

				<Grid item xs={12}>
					<FormControlLabel
						control={<Checkbox checked={form.agree} onChange={handleChange} name="agree" />}
						label="I confirm I own the rights or have permission to submit this music."
					/>
				</Grid>

				<Grid item xs={12}>
					<SpecialButton action={handleSubmit} text="Get My Quote" />
				</Grid>
			</Grid>

			{quote && (
				<Paper elevation={3} sx={{ mt: 4, p: 3 }}>
					<Typography variant="h5">Estimated Quote: £{quote}</Typography>
					<Typography variant="body1" sx={{ mt: 2 }}>
						Based on your selection of <strong>{form.services.join(", ")}</strong> for {form.trackCount} song(s) in the genre of{" "}
						<strong>{form.genre}</strong>, with an estimated {form.stemsPerTrack} stems per song, the calculated total is{" "}
						<strong>£{quote}</strong>.
					</Typography>
                    <SpecialButton action={handleFinalSubmit} text="Send me the Deails" sx={{ mt: 2 }} />
					{submitted && (
						<Alert severity="success" sx={{ mt: 2 }}>
							Quote sent successfully!
						</Alert>
					)}
				</Paper>
			)}
		</Box>
	);
}

export default GetAQuote;
