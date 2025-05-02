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
  ];

  return (
    <Box
      sx={(theme) => ({
        bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.100",
        color: theme.palette.text.primary,
        px: { xs: 1, sm: 3, md: 6 },
        py: { xs: 4, sm: 6, md: 8 },
      })}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: { xs: 2, sm: 3 },
          fontWeight: "bold",
          fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
          lineHeight: 1.2,
        }}
      >
        Studies
      </Typography>

      <Typography
        sx={{
          mb: { xs: 4, sm: 5, md: 6 },
          maxWidth: 720,
          fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
          lineHeight: 1.6,
        }}
      >
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
                  titleTypographyProps={{
                    variant: "h6",
                    sx: {
                      fontWeight: "bold",
                      fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                    },
                  }}
                  subheaderTypographyProps={{
                    variant: "subtitle1",
                    sx: {
                      fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                      color: "text.secondary",
                    },
                  }}
                  title={title}
                  subheader={description}
                />
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 1,
                      color: "text.secondary",
                      fontSize: { xs: "0.95rem", sm: "1rem" },
                    }}
                  >
                    Problem
                  </Typography>
                  <Typography
                    sx={{
                      mb: 2,
                      fontSize: { xs: "1rem", sm: "1.125rem" },
                      lineHeight: 1.5,
                    }}
                  >
                    {problem}
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          mb: 1,
                          color: "text.secondary",
                          fontSize: { xs: "0.95rem", sm: "1rem" },
                        }}
                      >
                        Before
                      </Typography>
                      <SoundCloudEmbed embedUrl={beforeUrl} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          mb: 1,
                          color: "text.secondary",
                          fontSize: { xs: "0.95rem", sm: "1rem" },
                        }}
                      >
                        After
                      </Typography>
                      <SoundCloudEmbed embedUrl={afterUrl} />
                    </Grid>
                  </Grid>

                  <Divider
                    sx={{
                      my: { xs: 2, sm: 3 },
                    }}
                  />

                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 1,
                      color: "text.secondary",
                      fontSize: { xs: "0.95rem", sm: "1rem" },
                    }}
                  >
                    Conclusion
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.125rem" },
                      lineHeight: 1.5,
                    }}
                  >
                    {conclusion}
                  </Typography>
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
