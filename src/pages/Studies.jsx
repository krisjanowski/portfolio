import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Divider,
} from "@mui/material";
import SoundCloudEmbed from "../components/SoundCloudEmbed.jsx";

function Studies() {
  const studies = [
    {
      title: "Immersive Binaural Mix Study",
      description:
        "Evaluating spatial positioning techniques for headphone‑focused releases.",
      problem:
        "Stereo mixes often lack realistic front‑back depth, leading to listener fatigue.",
      beforeUrl:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/456789012",
      afterUrl:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/456789013",
      conclusion:
        "Head‑related‑transfer‑function (HRTF) convolution increased front‑back localization scores by 38% in blind tests.",
    },
    {
      title: "Psychoacoustic Masking Control",
      description:
        "Reducing frequency masking in dense electronic arrangements.",
      problem:
        "Competing mid‑range elements masked the vocal formants, reducing clarity by >4 dB.",
      beforeUrl:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/567890123",
      afterUrl:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/567890124",
      conclusion:
        "Dynamic EQ side‑chaining restored vocal intelligibility, improving PESQ objective quality by 0.42.",
    },
    // add more study objects here
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
        Studies
      </Typography>

      <Typography sx={{ mb: 6, maxWidth: 720 }}>
        My academic work blends scientific research with creative audio
        exploration — from psychoacoustics to spatial perception. Each study
        below shows the “before” problem mix and the “after” solution.
      </Typography>

      <Grid container spacing={4}>
        {studies.map(
          (
            { title, description, problem, beforeUrl, afterUrl, conclusion },
            idx
          ) => (
            <Grid item xs={12} key={idx}>
              <Card
                variant="outlined"
                sx={{
                  bgcolor: "background.paper",
                }}
              >
                <CardHeader
                  titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
                  title={title}
                  subheader={description}
                />
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1, color: "text.secondary" }}
                  >
                    Problem
                  </Typography>
                  <Typography sx={{ mb: 2 }}>{problem}</Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="subtitle2"
                        sx={{ mb: 1, color: "text.secondary" }}
                      >
                        Before
                      </Typography>
                      <SoundCloudEmbed embedUrl={beforeUrl} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="subtitle2"
                        sx={{ mb: 1, color: "text.secondary" }}
                      >
                        After
                      </Typography>
                      <SoundCloudEmbed embedUrl={afterUrl} />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1, color: "text.secondary" }}
                  >
                    Conclusion
                  </Typography>
                  <Typography>{conclusion}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}

export default Studies;
