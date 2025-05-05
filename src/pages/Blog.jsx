import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, CardHeader, CircularProgress, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

function Blog() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);

	const POSTS_PER_PAGE = 6;

	useEffect(() => {
		fetch("/uploads/blogPosts.json")
			.then((res) => res.json())
			.then((data) => {
				setPosts(data.posts || []);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Failed to load blogPosts.json:", err);
				setLoading(false);
			});
	}, []);

	const slugify = (text) =>
		text
			.toString()
			.toLowerCase()
			.trim()
			.replace(/[\s\W-]+/g, "-");

	if (loading) {
		return (
			<Box sx={{ p: 6, textAlign: "center" }}>
				<CircularProgress />
			</Box>
		);
	}

	const paginatedPosts = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

	return (
		<Box
			sx={(theme) => ({
				bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.50",
				color: theme.palette.text.primary,
				px: { xs: 2, md: 6 },
				py: { xs: 4, md: 8 },
			})}
		>
			<SEO title="Blog | Your Site Name" description="Read the latest insights and thoughts." />

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
				Blog
			</Typography>

			<Typography sx={{ mb: 6, maxWidth: 720 }}>
				Insights, thoughts, and deep dives into creative process, technology, and audio-visual exploration.
			</Typography>

			<Grid container spacing={4}>
				{paginatedPosts.map(({ title, slug, author, date, summary, coverImage }, idx) => {
					const linkSlug = slug ? slug : slugify(title);

					return (
						<Grid item xs={12} sm={6} md={4} key={linkSlug + idx}>
							<Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "background.paper" }}>
								<CardHeader
									title={
										<Typography variant="h6" fontWeight="bold">
											<Link to={`/blog/${linkSlug}`} style={{ color: "inherit", textDecoration: "underline" }}>
												{title}
											</Link>
										</Typography>
									}
									subheader={`By ${author} | ${new Date(date).toLocaleDateString("en-GB", {
										day: "2-digit",
										month: "short",
										year: "numeric",
									})}`}
									sx={{ pb: 0 }}
								/>

								<CardContent sx={{ flexGrow: 1 }}>
									{coverImage && (
										<Box component="img" src={coverImage} alt={title} sx={{ width: "100%", borderRadius: 1, mb: 2 }} />
									)}
									<Typography variant="body2">{summary}</Typography>
								</CardContent>
							</Card>
						</Grid>
					);
				})}
			</Grid>

			{/* Pagination */}
			{posts.length > POSTS_PER_PAGE && (
				<Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
					<Pagination
						count={Math.ceil(posts.length / POSTS_PER_PAGE)}
						page={page}
						onChange={(e, value) => setPage(value)}
						color="primary"
					/>
				</Box>
			)}
		</Box>
	);
}

export default Blog;
