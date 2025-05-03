import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Container, CssBaseline } from "@mui/material";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SoloProjects from "./pages/SoloProjects";
import Collaborations from "./pages/Collaborations";
import Studies from "./pages/Studies";
import Contact from "./pages/Contact";
import SoundCloudNowPlayingBar from "./components/SoundCloudNowPlayingBar";
import { SoundCloudPlayerProvider } from "./contexts/SoundCloudPlayerContext";
import { WavPlayerProvider } from "./contexts/WavPlayerContext";
import WavNowPlayingBar from "./components/WavNowPlayingBar";
import { GlobalAudioManagerProvider } from "./contexts/GlobalAudioManagerContext";

function App() {
	return (
		<WavPlayerProvider>
			<SoundCloudPlayerProvider>
				<GlobalAudioManagerProvider>
					<Router>
						<CssBaseline />
						<Box
							sx={{
								minHeight: "100vh",
								display: "flex",
								flexDirection: "column",
								bgcolor: { xs: "grey.100", dark: "grey.800" },
								color: "grey.900",
								transition: "background-color 0.2s",
							}}
						>
							<Navbar />
							<SoundCloudNowPlayingBar />
							<WavNowPlayingBar />
							<Container
								sx={{
									flex: 1,
									maxWidth: { xs: "95%", sm: "90%", md: "85%", lg: "1200px" },
									width: "100%",
									py: { xs: 1, md: 8 },
								}}
							>
								<Routes>
									<Route path="/" element={<Home />} />
									<Route path="/solo-projects" element={<SoloProjects />} />
									<Route path="/collaborations" element={<Collaborations />} />
									<Route path="/studies" element={<Studies />} />
									<Route path="/contact" element={<Contact />} />
								</Routes>
							</Container>
							<Footer />
						</Box>
					</Router>
				</GlobalAudioManagerProvider>
			</SoundCloudPlayerProvider>
		</WavPlayerProvider>
	);
}

export default App;
