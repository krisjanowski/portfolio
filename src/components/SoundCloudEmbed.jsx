import React, { useState, useEffect, useRef } from "react";
import { Box, ButtonBase, Typography, useTheme, CircularProgress } from "@mui/material";
import { useGlobalAudioManager } from "../contexts/GlobalAudioManagerContext";
import { useSoundCloudPlayer } from "../contexts/SoundCloudPlayerContext";

function SoundCloudEmbed({ embedUrl, description, title }) {
    const { playSoundCloudTrack } = useGlobalAudioManager();
    const { currentTrack } = useSoundCloudPlayer();
    const theme = useTheme();

    const titleMatch = embedUrl.match(/tracks%2F(\d+)/);
    const trackId = titleMatch ? titleMatch[1] : "Unknown Track";

    const isPlaying = currentTrack?.embedUrl === embedUrl;

    const [iframeLoaded, setIframeLoaded] = useState(false);

    const handlePlay = () => {
        playSoundCloudTrack({
            title: title || `Track ${trackId}`,
            embedUrl,
        });
    };

    // Reset loading state when a new track starts
    useEffect(() => {
        setIframeLoaded(false);
    }, [embedUrl, isPlaying]);

    return (
        <Box
            sx={{
                boxShadow: 8,
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                position: "relative",
                minHeight: 200,
                transition: "background-color 0.3s, color 0.3s"
            }}
        >
            {!isPlaying ? (
                <>
                    <iframe
                        width="100%"
                        height="166"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={embedUrl}
                        style={{ borderRadius: "4px", marginBottom: "-7px" }}
                        title={title || `Track ${trackId}`}
                    ></iframe>

                    <ButtonBase
                        onClick={handlePlay}
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            bgcolor: "transparent",
                            "&:hover": {
                                bgcolor: theme.palette.action.hover,
                            },
                        }}
                        aria-label={`Play ${title || `Track ${trackId}`}`}
                    />
                </>
            ) : (
                <Box
                    sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                        height: "100%",
                    }}
                >
                    {!iframeLoaded && (
                        <CircularProgress
                            color="primary"
                            size={48}
                            sx={{ mb: 2 }}
                        />
                    )}

                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "166px",
                            opacity: iframeLoaded ? 1 : 0,
                            transition: "opacity 0.4s ease-in-out",
                        }}
                    >
                        <iframe
                            key={embedUrl}
                            width="100%"
                            height="166"
                            scrolling="no"
                            frameBorder="no"
                            allow="autoplay"
                            src={embedUrl}
                            style={{ borderRadius: "4px" }}
                            title={title || `Track ${trackId}`}
                            onLoad={() => setIframeLoaded(true)}
                        ></iframe>
                    </Box>

                    {iframeLoaded ? (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "end",
                                gap: "2px",
                                height: "50px",
                                marginBottom: "20px",
                                marginTop: "10px"
                            }}
                        >
                            <Box sx={{ width: "4px", height: "20%", bgcolor: theme.palette.primary.main, animation: "wave 1s infinite ease-in-out 0s" }} />
                            <Box sx={{ width: "4px", height: "50%", bgcolor: theme.palette.primary.main, animation: "wave 1s infinite ease-in-out 0.2s" }} />
                            <Box sx={{ width: "4px", height: "35%", bgcolor: theme.palette.primary.main, animation: "wave 1s infinite ease-in-out 0.4s" }} />
                            <Box sx={{ width: "4px", height: "65%", bgcolor: theme.palette.primary.main, animation: "wave 1s infinite ease-in-out 0.6s" }} />
                            <Box sx={{ width: "4px", height: "45%", bgcolor: theme.palette.primary.main, animation: "wave 1s infinite ease-in-out 0.8s" }} />
                        </Box>
                    ) : null}

                    <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
                        {iframeLoaded ? "Now Playing" : "Loading..."}
                    </Typography>
                </Box>
            )}

            {description && (
                <Typography
                    mt={2}
                    variant="body2"
                    fontStyle="italic"
                    sx={{
                        color: theme.palette.text.secondary
                    }}
                >
                    {description}
                </Typography>
            )}
        </Box>
    );
}

export default SoundCloudEmbed;
