import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Container, CssBaseline } from "@mui/material";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SoloProjects from "./pages/SoloProjects";
import Collaborations from "./pages/Collaborations";
import Studies from "./pages/Studies";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <CssBaseline /> {/* Ensures proper mobile scaling, resets, etc. */}
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
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
