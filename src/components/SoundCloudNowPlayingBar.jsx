import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useSoundCloudPlayer } from "../contexts/SoundCloudPlayerContext";

function SoundCloudNowPlayingBar() {
  const { currentTrack, stopTrack } = useSoundCloudPlayer();
  const iframeRef = useRef(null);

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
        bgcolor: 'white',
        color: 'black',
        borderTop: 1,
        borderColor: 'grey.300',
        px: 2,
        py: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        boxShadow: 5,
        zIndex: 1500,
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
            style={{ borderRadius: '4px' }}
          ></iframe>
        </Box>
      </Box>
      <IconButton onClick={stopTrack} sx={{ ml: 2 }}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

export default SoundCloudNowPlayingBar;
