import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import SoundCloudEmbed from "../components/SoundCloudEmbed.jsx";

function Collaborations() {
  const collabs = [
    {
      title: "Echo & Embers (feat. Ella Rivers)",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/234567890",
      description:
        "A delicate blend of Ella Rivers’ acoustic guitar and vocals layered with airy synth pads.",
    },
    {
      title: "Pulse Shift (prod. with Lumen)",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/345678901",
      description:
        "Exploring experimental drum design and lush harmonic layering with producer Lumen.",
    },
    // add more collaboration objects whenever you have new releases
  ];

  return (
    <Box
      sx={(theme) => ({
        bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.100",
        color: theme.palette.text.primary,
        px: { xs: 3, md: 6 },
        py: { xs: 4, md: 8 },
      })}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: "bold" }}>
        Collaborations
      </Typography>

      <Typography sx={{ mb: 6, maxWidth: 720 }}>
        Working with other artists is a cornerstone of my creative process. I
        thrive on blending diverse styles and perspectives — whether
        collaborating with vocalists, instrumentalists, or fellow producers.
        These tracks showcase the fusion of unique talents and visions.
      </Typography>

      <Grid container spacing={4}>
        {collabs.map(({ title, embedUrl, description }, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.paper",
              }}
            >
              <CardHeader
                titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
                title={title}
                sx={{ pb: 0 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <SoundCloudEmbed embedUrl={embedUrl} />
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Collaborations;
