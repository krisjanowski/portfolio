import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SoloProjects from "./pages/SoloProjects";
import Collaborations from "./pages/Collaborations";
import Studies from "./pages/Studies";

function App() {
  return (
    <Router>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: { xs: 'grey.100', dark: 'grey.800' },
          color: 'grey.900',
          transition: "background-color 0.2s"
        }}
      >
        <Navbar />
        <Container sx={{ flex: 1, maxWidth: "xl", py: 8 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solo-projects" element={<SoloProjects />} />
            <Route path="/collaborations" element={<Collaborations />} />
            <Route path="/studies" element={<Studies />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;