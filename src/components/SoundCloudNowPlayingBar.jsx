import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useSoundCloudPlayer } from "../contexts/SoundCloudPlayerContext";

function SoundCloudNowPlayingBar() {
  const { currentTrack, stopTrack } = useSoundCloudPlayer();
  const iframeRef = useRef(null);
  const theme = useTheme();

  // To store widget instance so we don't keep rebinding
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!currentTrack || !iframeRef.current) return;

    const iframeElement = iframeRef.current;

    // IMPORTANT: Create a fresh widget each time
    widgetRef.current = window.SC.Widget(iframeElement);

    const widget = widgetRef.current;

    const onReady = () => {
      widget.play();
    };

    widget.bind(window.SC.Widget.Events.READY, onReady);

    return () => {
      try {
        widget.unbind(window.SC.Widget.Events.READY);
      } catch (e) {
        // Widget already cleaned up
      }
    };
  }, [currentTrack?.embedUrl]); // << re-run every time the track changes

  if (!currentTrack) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderTop: 1,
        borderColor: theme.palette.divider,
        px: 2,
        py: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        boxShadow: 5,
        zIndex: 1500,
        transition: "background-color 0.3s, color 0.3s"
      }}
    >
      <Box sx={{ flexGrow: 1, minWidth: 300 }}>
        <Typography variant="subtitle1" fontWeight="bold" noWrap>
          Now Playing: {currentTrack.title}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <iframe
            key={currentTrack.embedUrl} // << Force React to recreate iframe
            ref={iframeRef}
            width="100%"
            height="80"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={currentTrack.embedUrl}
            title={currentTrack.title}
            style={{
              borderRadius: '4px',
              width: "100%",
              backgroundColor: theme.palette.background.paper,
            }}
          ></iframe>
        </Box>
      </Box>
      <IconButton
        onClick={stopTrack}
        sx={{
          ml: 2,
          color: theme.palette.text.primary,
          '&:hover': {
            color: theme.palette.primary.main,
          }
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

export default SoundCloudNowPlayingBar;
