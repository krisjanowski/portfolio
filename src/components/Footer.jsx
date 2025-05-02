import React from "react";
import { Box, Link, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      as="footer"
      sx={{
        bgcolor: 'white',
        color: 'gray.800',
        shadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
        p: 4,
        textAlign: 'center',
        '@media (prefers-color-scheme: dark)': {
          bgcolor: 'gray.800',
          color: 'white',
        },
      }}
    >
      <Typography>
        Contact: <Link href="mailto:kris.janowski@example.com" underline="hover">kris.janowski@example.com</Link>
      </Typography>
      <Typography>
        <Link href="https://soundcloud.com/krisjanowski" underline="hover" target="_blank" rel="noopener noreferrer">
          SoundCloud
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;