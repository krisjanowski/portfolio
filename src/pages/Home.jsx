import React from "react";
import { Box, Typography } from "@mui/material";

function Home() {
  return (
    <Box
      sx={(theme) => ({
        maxWidth: theme.breakpoints.values.lg,
        mx: "auto",
        py: 6,
        px: 4,
        bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.50",
        color: theme.palette.mode === "dark" ? "grey.50" : "grey.900",
      })}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: "bold" }}>
        Welcome to Kris Janowski’s Portfolio
      </Typography>

      <Typography sx={{ mb: 4 }}>
        I’m Kris Janowski, a 32‑year‑old audio engineer and producer based in
        London. Passionate about mixing, mastering, production, and creative
        collaborations, I’ve been immersed in music since the age of 12.
      </Typography>

      <Typography sx={{ mb: 4 }}>
        My journey has taken me from early experimental projects to professional
        studio work. I hold a BSc in Neuroscience and a Master’s in Popular
        Music Production. This unique background allows me to blend technical
        expertise with creative artistry — crafting sound that not only meets
        industry standards but resonates deeply with listeners.
      </Typography>

      <Typography>
        Explore my solo projects, collaborations, and academic studies to
        discover the sonic landscapes I’ve built throughout my career.
      </Typography>
    </Box>
  );
}

export default Home;
