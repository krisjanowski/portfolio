import React, { useState, useEffect } from "react";
import { Box, Typography, Skeleton } from '@mui/material';
import { useInView } from 'react-intersection-observer';

// npm install react-intersection-observer
// You must add this package to your project!

function SoundCloudEmbed({ embedUrl, description }) {
  const { ref, inView } = useInView({
    triggerOnce: true, // only trigger once per component
    threshold: 0.1 // loads when 10% visible
  });

  const [iframeLoaded, setIframeLoaded] = useState(false);

  // To prevent re-renders causing multiple iframe reloads:
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);

  useEffect(() => {
    if (inView) {
      setShouldLoadIframe(true);
    }
  }, [inView]);

  return (
    <Box
      ref={ref}
      sx={{
        boxShadow: 8,
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'white',
        '@media (prefers-color-scheme: dark)': {
          bgcolor: 'grey.200',
          color: 'grey.300',
        },
        padding: { xs: 0, sm: 0 },
        position: 'relative',
        minHeight: 160,
      }}
    >
      {/* Placeholder Skeleton */}
      {!iframeLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={160}
          animation="wave"
          sx={{ borderRadius: 1 }}
        />
      )}

      {/* Lazy-loaded iframe */}
      {shouldLoadIframe && (
        <Box
          sx={{
            display: iframeLoaded ? 'block' : 'none',
            transition: 'opacity 0.5s',
          }}
        >
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={embedUrl}
            onLoad={() => setIframeLoaded(true)}
            style={{ borderRadius: '4px', marginBottom:"-7px" }}
          ></iframe>
        </Box>
      )}

      {description && (
        <Typography
          mt={2}
          variant="body2"
          fontStyle="italic"
          color="grey.800"
          sx={{
            '@media (prefers-color-scheme: dark)': {
              color: 'grey.200',
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
