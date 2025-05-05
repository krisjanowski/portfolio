import React, { useEffect, useState } from "react";
import {
	Box,
	Typography,
	Card,
	CardContent,
	CardActionArea,
	CardMedia,
	Grid
} from "@mui/material";
import { Link } from "react-router-dom";

function LatestPosts({ count = 5 }) {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch("/uploads/blogPosts.json")
			.then((res) => res.json())
			.then((data) => {
				const sorted = (data.posts || []).sort(
					(a, b) => new Date(b.date) - new Date(a.date)
				);
				setPosts(sorted.slice(0, count));
			});
	}, [count]);

	const slugify = (text) =>
		text.toString().toLowerCase().trim().replace(/[\s\W-]+/g, "-");

	return (
		<Box>
			<Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
				Latest Posts
			</Typography>
			<Grid container spacing={3}>
				{posts.map(({ title, slug, summary, date, coverImage }, idx) => {
					const linkSlug = slug ? slug : slugify(title);
					return (
						<Grid item xs={12} sm={6} md={4} key={idx}>
							<Card
								variant="outlined"
								sx={{
									height: "100%",
									display: "flex",
									flexDirection: "column",
									borderRadius: 2,
									transition: "transform 0.2s",
									"&:hover": {
										transform: "scale(1.02)",
										boxShadow: 4
									}
								}}
							>
								<CardActionArea
									component={Link}
									to={`/blog/${linkSlug}`}
									sx={{ height: "100%" }}
								>
									{coverImage && (
										<CardMedia
											component="img"
											height="160"
											image={coverImage}
											alt={title}
											sx={{ objectFit: "cover" }}
										/>
									)}
									<CardContent>
										<Typography
											variant="h6"
											fontWeight="bold"
											gutterBottom
										>
											{title.length > 60
												? `${title.slice(0, 60)}...`
												: title}
										</Typography>
										<Typography
											variant="body2"
											color="text.secondary"
											sx={{ mb: 1 }}
										>
											{new Date(date).toLocaleDateString("en-GB", {
												day: "2-digit",
												month: "short",
												year: "numeric"
											})}
										</Typography>
										<Typography
											variant="body2"
											color="text.secondary"
										>
											{summary.length > 80
												? `${summary.slice(0, 80)}...`
												: summary}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
}

export default LatestPosts;
