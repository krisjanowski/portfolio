import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Tooltip,
  Stack,
  Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AppleIcon from "@mui/icons-material/Apple";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

// Update this when using toggleMode and mode props!
function Navbar({ toggleMode, mode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Projects", path: "/solo-projects" },
    { title: "Collabs", path: "/collaborations" },
    { title: "Studies", path: "/studies" },
    { title: "Blog", path: "/blog" },
    { title: "Contact", path: "/contact" },
  ];

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        boxShadow: 2,
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          maxWidth: (theme) => theme.breakpoints.values.lg,
          mx: "auto",
          px: { xs: 2, sm: 4 },
          py: { xs: 2, sm: 3 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
          >
            Kris Janowski
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontSize: "0.8rem" }}
          >
            Mixing & Mastering Engineer
          </Typography>
        </Box>

        {/* Desktop Links and Icons */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {navLinks.map((link) => (
              <Button
                key={link.title}
                component={Link}
                to={link.path}
                variant="text"
                color="inherit"
              >
                {link.title}
              </Button>
            ))}

            {/* Social Icons */}
            <Tooltip title="SoundCloud">
              <IconButton
                component="a"
                href="https://soundcloud.com/kris-janowski"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <MusicNoteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Apple Music">
              <IconButton
                component="a"
                href="https://music.apple.com/us/artist/kris-janowski/1628563447"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <AppleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="LinkedIn">
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/kris-janowski-4a4b80b1/"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <LinkedInIcon />
              </IconButton>
            </Tooltip>

            {/* Dark Mode Toggle */}
            <Tooltip title="Toggle light/dark mode">
              <IconButton onClick={toggleMode} color="inherit">
                {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <>
            <IconButton
              onClick={toggleDrawer(true)}
              edge="end"
              aria-label="menu"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{ width: 260, py: 2 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  {navLinks.map((link) => (
                    <ListItem key={link.title} disablePadding>
                      <ListItemButton component={Link} to={link.path}>
                        <ListItemText primary={link.title} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Stack direction="row" spacing={1} justifyContent="center">
                  <IconButton
                    component="a"
                    href="https://soundcloud.com/kris-janowski"
                    target="_blank"
                    rel="noopener"
                    color="inherit"
                  >
                    <MusicNoteIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="https://music.apple.com/your-apple-music"
                    target="_blank"
                    rel="noopener"
                    color="inherit"
                  >
                    <AppleIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="https://linkedin.com/in/your-linkedin"
                    target="_blank"
                    rel="noopener"
                    color="inherit"
                  >
                    <LinkedInIcon />
                  </IconButton>
                </Stack>

                <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
                  <Tooltip title="Toggle light/dark mode">
                    <IconButton onClick={toggleMode} color="inherit">
                      {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>
            </Drawer>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
