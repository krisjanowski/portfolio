import React from "react";
import { Box, Typography, Grid, Card, CardContent, CardHeader } from "@mui/material";
import SoundCloudEmbed from "../components/SoundCloudEmbed.jsx";

function SoloProjects() {
	// Each project gets a title, description, and SoundCloud embed
	const soloProjects = [
		{
			title: "Asomatous [FULL RELEASE EDITION EP STREAM]",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Fasomatous-full-release-edition-ep-stream",
			description:
				"A multi‑movement progressive‑metal journey that blends lush synth ambience with polyrhythmic guitar layers and cinematic drops.",
		},
		{
			title: "Bird of Paradise (Featuring Ashe O'Hara & Ania Diamond) [Mastered Release Edition]",
			embedUrl:
				"https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Fbird-of-paradise-featuring-ashe-ohara-ania-diamond-mastered-release-edition",
			description:
				"An atmospheric vocal collaboration that juxtaposes soaring falsetto lines with downtempo electronic beats and shimmering guitars.",
		},
		{
			title: "Majesty Part III: Glory",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Fmajesty-part-iii-glory",
			description:
				"The triumphant finale of the Majesty trilogy—anthemic chord progressions, cinematic drums, and a soaring lead‑guitar climax.",
		},
		{
			title: "Falling From Grace (Unfinished Demo)",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Ffalling-from-grace-unfinished-demo",
			description: "A raw work‑in‑progress that captures haunting vocal sketches over evolving synth pads and lo‑fi percussion loops.",
		},
		{
			title: "Euphoria AXE FX Edition",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Feuphoria-2016",
			description: "A re‑amped remake of the original track showcasing crisp AXE‑FX tones, tighter low‑end, and expanded ambient textures.",
		},
		{
			title: "Heaven's Gone 2.0 (no vocals)",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Fheavens-gone-2-no-vocals",
			description: "An instrumental mix focusing on lush string layers and intricate rhythmic guitars, leaving space for imagined vocals.",
		},
		{
			title: "Majesty Part II: Grandeur",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Fmajesty-part-ii-grandeur-1",
			description:
				"The majestic mid‑section of the trilogy—downtempo grooves evolve into expansive orchestral climaxes and lead‑guitar sweeps.",
		},
		{
			title: "Majesty Part I: Grace",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Fmajesty-part-i-grace",
			description:
				"Opening chapter of the trilogy featuring delicate piano motifs, atmospheric swells, and a gradual build into post‑rock drums.",
		},
		{
			title: "Retrospect Tone",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Fretrospect-tone",
			description: "A short tone‑test track showcasing crystalline clean guitars layered with reverse delays and granular textures.",
		},
		{
			title: "Armageddon Part 4 Outro",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Farmageddon-part-4-outro",
			description: "The crushing finale to the Armageddon suite—massive down‑tuned riffs fade into eerie post‑apocalyptic ambience.",
		},
		{
			title: "Fluffy Kittens (pre‑Mix)",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Ffluffy-kittens-pre-mix",
			description: "A playful progressive‑metal sketch with tongue‑in‑cheek chord changes and hyperactive drumming—captured pre‑mix.",
		},
		{
			title: "Sack of Balls",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Fbawlaq-preview",
			description: "Funk‑metal meets glitch: slap‑bass grooves collide with metallic guitar chops and stuttered vocal samples.",
		},
		{
			title: "Antics (Mayones Regius 8 demo clip)",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Fantics-mayones-regius-8-demo",
			description: "A raw 8‑string demo riffing on djent grooves and odd‑time glitch fills—captured direct from the Mayones Regius 8.",
		},
		{
			title: "Antics (AXE FX II Clip)",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Fantics-axe-fx-ii-clip",
			description: "Alternate take of 'Antics' re‑amped through the AXE‑FX II for tighter low‑end and sharper midrange bite.",
		},
		{
			title: "Absolution - Doublethink (Kris Edit)",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Fabsolution-doublethink-kris-1",
			description: "Kris’s extended edit of Absolution’s industrial metal anthem, adding atmospheric intros and off‑kilter breakdowns.",
		},
		{
			title: "Axe Fx II & Mayones Regius 7+8 Test",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Faxe-fx-ii-mayones-regius-7-8",
			description: "Side‑by‑side tone test of 7‑string and 8‑string Mayones Regius through AXE‑FX II amp sims and IRs.",
		},
		{
			title: "Euphoria (solo version) Feat. Tom Fahey",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Feuphoria-solo-version-feat-tom",
			description: "An intimate guitar duet revisiting 'Euphoria' with guest soloist Tom Fahey, recorded in one take.",
		},
		{
			title: "Holographics",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Fholographics",
			description: "Glitchy IDM percussion meets soaring post‑rock melodies, creating a vivid holographic sonic landscape.",
		},
		{
			title: "Euphoria",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Feuphoria",
			description: "The original version—melodic progressive rock with layered synth atmospheres and uplifting chorus hooks.",
		},
		{
			title: "Never Coming Home",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Fnever-coming-home",
			description: "A melancholic ballad featuring plaintive piano, reverberant vocals, and a climactic post‑rock crescendo.",
		},
		{
			title: "Revenge Is a Dish Best Served Sweet",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Frevenge-is-a-dish-best-served",
			description: "Groovy staccato riffs and orchestral stabs underpin this tongue‑in‑cheek progressive‑metal outing.",
		},
		{
			title: "Blood Of Heroes",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Fblood-of-heroes-1",
			description: "Epic cinematic metal with choir pads, thunderous percussion, and a heroic lead‑guitar refrain.",
		},
		{
			title: "Brainwash",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Fbrainwash",
			description: "Industrial grooves and distorted spoken‑word samples illustrating the concept of media indoctrination.",
		},
		{
			title: "Distances Draw Nearer",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Fdistances-draw-nearer",
			description: "Dreamy shoegaze textures dissolve into post‑metal walls of sound, reflecting themes of departure and reunion.",
		},
		{
			title: "Genesis",
			embedUrl: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fkris-janowski%2Fgenesis-1",
			description: "A reflective piano‑and‑strings opening evolves into expansive ambient drones—the genesis of a larger concept suite.",
		},
	];

	return (
		<Box
			sx={(theme) => ({
				bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.50",
				color: theme.palette.text.primary,
				px: { xs: 0, md: 6 },
				py: { xs: 4, md: 8 },
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
                Solo Projects
              </Typography>

			<Typography sx={{ mb: 6, maxWidth: 720 }}>
				My solo work reflects my personal vision — blending electronic soundscapes, intricate rhythms, and emotive melodic structures. Each
				piece is carefully crafted to push creative boundaries and evoke powerful responses.
			</Typography>

			<Grid container spacing={4}>
				{soloProjects.map(({ title, embedUrl, description }, idx) => (
					<Grid item xs={12} sm={6} md={6} key={idx}>
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
								title={title.length > 30 ? `${title.slice(0, 30)}...` : title}
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

export default SoloProjects;
