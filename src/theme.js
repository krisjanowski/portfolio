import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#1976d2",
		},
		background: {
			default: "#f5f5f5",
		},
		text: {
			primary: "#000000",
			secondary: "#555555",
		},
	},
	typography: {
		allVariants: {
			color: "#000000",  // Force all text to be black in light mode
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					color: "#000000",
					backgroundColor: "#f5f5f5",
				},
				html: {
					color: "#000000",
					backgroundColor: "#f5f5f5",
				},
			},
		},
	},
});

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#90caf9",
		},
		background: {
			default: "#121212",
		},
		text: {
			primary: "#ffffff",
			secondary: "#cccccc",
		},
	},
	typography: {
		allVariants: {
			color: "#ffffff",  // Force all text to be white in dark mode
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					color: "#ffffff",
					backgroundColor: "#121212",
				},
				html: {
					color: "#ffffff",
					backgroundColor: "#121212",
				},
			},
		},
	},
});
