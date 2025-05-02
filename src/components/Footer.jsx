import React from "react";
import { Box, Link, Typography, Stack } from '@mui/material';

function Footer() {
  return (
    <Box
      as="footer"
      sx={{
        bgcolor: 'white',
        color: 'grey.800',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, sm: 4 },
        textAlign: 'center',
        '@media (prefers-color-scheme: dark)': {
          bgcolor: 'grey.800',
          color: 'grey.100',
        },
      }}
    >
      <Stack
        spacing={1.5}
        sx={{
          alignItems: 'center',
          fontSize: { xs: '0.95rem', sm: '1rem' },
        }}
      >
        <Typography>
          Contact: <Link href="mailto:kris.janowski@example.com" underline="hover">
            krisjanowski93@gmail.com
          </Link>
        </Typography>

        <Typography>
          <Link
            href="https://soundcloud.com/kris-janowski"
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            SoundCloud
          </Link>
        </Typography>

        <Typography>
          <Link
            href="/contact"
            underline="hover"
          >
            Contact Page
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
}

export default Footer;
