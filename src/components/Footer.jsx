import React from "react";
import { Box, Link, Typography, Stack, IconButton, Divider, useTheme } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AppleIcon from "@mui/icons-material/Apple";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import HomeIcon from "@mui/icons-material/Home";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import WorkIcon from "@mui/icons-material/Work";

function Footer() {
    const theme = useTheme(); // ✅ Grab the current theme
    const currentYear = new Date().getFullYear();

    return (
        <Box
            as="footer"
            sx={{
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                boxShadow: "0px -1px 4px rgba(0, 0, 0, 0.2)",
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 4, sm: 5 },
                textAlign: "center",
            }}
        >
            {/* Brand Tagline */}
            <Typography variant="h6" gutterBottom>
                Kris Janowski Audio · Mixing & Mastering
            </Typography>
            <Typography variant="body2" gutterBottom>
                Precision sound engineering for artists, producers, and creators.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Social Icons */}
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
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
            </Stack>

            {/* Quick Links */}
            <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 2 }}>
                <Link href="/" underline="hover" sx={{ color: theme.palette.text.primary }}>
                    <HomeIcon fontSize="small" /> Home
                </Link>
                <Link href="/solo-projects" underline="hover" sx={{ color: theme.palette.text.primary }}>
                    <WorkIcon fontSize="small" /> Portfolio
                </Link>
                <Link href="/contact" underline="hover" sx={{ color: theme.palette.text.primary }}>
                    <ContactMailIcon fontSize="small" /> Contact
                </Link>
            </Stack>

            {/* Email */}
            <Typography variant="body2" sx={{ mb: 2 }}>
                <Link
                    href="mailto:kris.janowski93@gmail.com"
                    underline="hover"
                    sx={{ color: theme.palette.text.primary }}
                >
                    kris.janowski93@gmail.com
                </Link>
            </Typography>

            {/* Legal */}
            <Typography variant="caption" display="block" sx={{ color: theme.palette.text.secondary }}>
                © {currentYear} Thomas Fahey
            </Typography>
        </Box>
    );
}

export default Footer;
