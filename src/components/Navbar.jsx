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
  useMediaQuery
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Solo Projects", path: "/solo-projects" },
  { title: "Collaborations", path: "/collaborations" },
  { title: "Studies", path: "/studies" },
];

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ bgcolor: "common.white", boxShadow: 2 }}>
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
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          Kris Janowski
        </Typography>

        {/* Desktop Links */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 2 }}>
            {navLinks.map((link) => (
              <Button
                key={link.title}
                component={Link}
                to={link.path}
                variant="text"
              >
                {link.title}
              </Button>
            ))}
          </Box>
        )}

        {/* Mobile Hamburger Menu */}
        {isMobile && (
          <>
            <IconButton
              onClick={toggleDrawer(true)}
              edge="end"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{ width: 250 }}
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
              </Box>
            </Drawer>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
