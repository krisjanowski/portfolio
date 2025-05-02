import React from "react";
import { Box, Typography } from '@mui/material';

function SoundCloudEmbed({ embedUrl, description }) {
  return (
    <Box
      sx={{
        boxShadow: 8,
        borderRadius: 8,
        overflow: 'hidden',
        bgcolor: 'white',
        '@media (prefers-color-scheme: dark)': {
          bgcolor: 'gray.700',
          color: 'gray.200',
        },
        padding: 4,
      }}
    >
      <iframe
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={embedUrl}
      ></iframe>
      {description && (
        <Typography
          mt={2}
          variant="body2"
          fontStyle="italic"
          color="gray.800"
          sx={{
            '@media (prefers-color-scheme: dark)': {
              color: 'gray.200',
            },
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}

export default SoundCloudEmbed;