import React, { useState, useEffect } from "react";
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

    const [iframeKey, setIframeKey] = useState(0);
    const [loading, setLoading] = useState(false);

    const handlePlay = () => {
        playSoundCloudTrack({
            title: title || `Track ${trackId}`,
            embedUrl,
        });

        setLoading(true); // Spinner immediately

        setTimeout(() => {
            setLoading(false);
        }, 1000); // 1s minimum spinner time
    };

    // 🔥 Always reset loading & iframe when track changes
    useEffect(() => {
        setIframeKey(prev => prev + 1);

        if (isPlaying) {
            setLoading(true);

            const timeout = setTimeout(() => {
                setLoading(false);
            }, 1000); // Adjust for spinner duration

            return () => clearTimeout(timeout);
        } else {
            setLoading(false);
        }
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
                transition: "background-color 0.3s, color 0.3s"
            }}
        >
            {!isPlaying ? (
                <>
                    <iframe
                        key={"preview-" + iframeKey}
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
                        position: "relative",
                    }}
                >
                    {/* Spinner */}
                    {loading && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                zIndex: 10,
                            }}
                        >
                            <CircularProgress color="primary" size={48} />
                        </Box>
                    )}

                    {/* Iframe */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "166px",
                            opacity: 1,
                        }}
                    >
                        <iframe
                            key={"playing-" + iframeKey}
                            width="100%"
                            height="166"
                            scrolling="no"
                            frameBorder="no"
                            allow="autoplay"
                            src={embedUrl}
                            style={{ borderRadius: "4px" }}
                            title={title || `Track ${trackId}`}
                        ></iframe>
                    </Box>

                    {/* Animation Bars */}
                    {!loading && (
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
                    )}

                    <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
                        {loading ? "Loading..." : "Now Playing"}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}

export default SoundCloudEmbed;
