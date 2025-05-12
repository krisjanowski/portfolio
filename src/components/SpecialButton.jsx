import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const SpecialButton = ({ link, action, text }) => {
	const theme = useTheme();
	const isDark = theme.palette.mode === "dark";

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				my: 4,
			}}
		>
			<Box
				sx={{
					position: "relative",
					display: "inline-block",
					borderRadius: "12px",
					padding: "3px",
					background: "linear-gradient(270deg, #ff007a, #00ffff, #00ff00, #ff007a)",
					backgroundSize: "600% 600%",
					animation: "borderMove 6s ease infinite",
				}}
			>
				<Button
					component={link ? RouterLink : "button"}
					to={link || undefined}
					onClick={action || undefined}
					variant="contained"
					size="large"
					sx={{
						px: 4,
						py: 1.5,
						borderRadius: "10px",
						backgroundColor: isDark ? "#111" : "#fff",
						color: isDark ? "#fff" : "#111",
						fontWeight: "bold",
						fontSize: "1.2rem",
						textTransform: "none",
						boxShadow: isDark ? "0 0 0 rgba(0,0,0,0)" : "0 4px 12px rgba(0,0,0,0.08)",
						transition: "background-color 0.3s ease, color 0.3s ease",
						position: "relative",
						zIndex: 2,
						"&:hover": {
							backgroundColor: isDark ? "#222" : "#f4f4f4",
						},
					}}
				>
					{text}
				</Button>
			</Box>

			{/* Keyframes definition */}
			<style>
				{`
					@keyframes borderMove {
						0% {
							background-position: 0% 50%;
						}
						50% {
							background-position: 100% 50%;
						}
						100% {
							background-position: 0% 50%;
						}
					}
				`}
			</style>
		</Box>
	);
};

export default SpecialButton;
