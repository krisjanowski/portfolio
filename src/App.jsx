import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Box, Container, CssBaseline, useTheme } from "@mui/material";
import { HelmetProvider } from "react-helmet-async"; // ✅ import added
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SoloProjects from "./pages/SoloProjects";
import Collaborations from "./pages/Collaborations";
import Studies from "./pages/Studies";
import Contact from "./pages/Contact";
import ProjectPage from "./pages/ProjectPage";
import CollaborationPage from "./pages/CollaborationPage";
import StudyPage from "./pages/StudyPage";

import SoundCloudNowPlayingBar from "./components/SoundCloudNowPlayingBar";
import { SoundCloudPlayerProvider } from "./contexts/SoundCloudPlayerContext";
import { WavPlayerProvider } from "./contexts/WavPlayerContext";
import WavNowPlayingBar from "./components/WavNowPlayingBar";
import { GlobalAudioManagerProvider } from "./contexts/GlobalAudioManagerContext";
import ScrollToTop from "./components/ScrollToTop";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import GetAQuote from "./pages/GetAQuote";

function AppContent({ toggleMode, mode }) {
	const theme = useTheme();
	const location = useLocation();

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				bgcolor: theme.palette.background.default,
				color: theme.palette.text.primary,
				transition: "background-color 0.2s, color 0.2s",
			}}
		>
			<Navbar toggleMode={toggleMode} mode={mode} />
			<SoundCloudNowPlayingBar />
			<WavNowPlayingBar />
			<Container
				sx={{
					flex: 1,
					maxWidth: { xs: "100%", sm: "100%", md: "85%", lg: "1200px" },
					width: "100%",
					py: { xs: 1, sm: 2, md: 8 },
				}}
			>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/solo-projects" element={<SoloProjects />} />
					<Route path="/collaborations" element={<Collaborations />} />
					<Route path="/collaborations/:slug" element={<CollaborationPage />} />
					<Route path="/studies" element={<Studies />} />
					<Route path="/studies/:slug" element={<StudyPage />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/projects/:slug" element={<ProjectPage />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/blog/:slug" element={<BlogPost />} />
					<Route path="/get-a-quote" element={<GetAQuote />} />
				</Routes>
			</Container>
			<Footer />
		</Box>
	);
}

function App({ toggleMode, mode }) {
	return (
		<WavPlayerProvider>
			<SoundCloudPlayerProvider>
				<GlobalAudioManagerProvider>
					<Router>
						<HelmetProvider> {/* ✅ Correct placement */}
							<ScrollToTop />
							{/* CssBaseline REMOVED from here — it's already applied in main.jsx */}
							<AppContent toggleMode={toggleMode} mode={mode} />
						</HelmetProvider>
					</Router>
				</GlobalAudioManagerProvider>
			</SoundCloudPlayerProvider>
		</WavPlayerProvider>
	);
}

export default App;
