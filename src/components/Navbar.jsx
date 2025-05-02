import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

function Navbar() {
  return (
    <Box sx={{ bgcolor: "common.white", boxShadow: 2 }}>
      {/* outer flex container */}
      <Box
        sx={{
          maxWidth: (theme) => theme.breakpoints.values.lg,
          mx: "auto",
          px: 4,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Kris Janowski
        </Typography>

        {/* inner flex container for links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button component={Link} to="/" variant="text">
            Home
          </Button>
          <Button component={Link} to="/solo-projects" variant="text">
            Solo Projects
          </Button>
          <Button component={Link} to="/collaborations" variant="text">
            Collaborations
          </Button>
          <Button component={Link} to="/studies" variant="text">
            Studies
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
