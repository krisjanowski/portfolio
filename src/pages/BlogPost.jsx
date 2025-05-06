import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, IconButton, Stack, Tooltip, Grid, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import SEO from "../components/SEO";
import { Facebook, Twitter, LinkedIn, Link as LinkIcon } from "@mui/icons-material";
import LatestPosts from "../components/LatestPosts";

function BlogPost() {
	const { slug } = useParams();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/uploads/blogPosts.json")
			.then((res) => res.json())
			.then((data) => {
				const match = (data.posts || []).find((p) => (p.slug || slugify(p.title)) === slug);
				setPost(match);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Failed to load blogPosts.json:", err);
				setLoading(false);
			});
	}, [slug]);

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

	if (!post) {
		return <Typography variant="h4">404 — Blog post not found</Typography>;
	}

	const postUrl = `https://krisjanowski.co.uk/blog/${slug}`;

	const handleCopyLink = () => {
		navigator.clipboard.writeText(postUrl).then(() => {
			alert("Link copied to clipboard!");
		});
	};

	return (
		<Box sx={{ mt: 1, px: { xs: 2, md: 2 } }}>
			<Grid container spacing={2}>
				<Grid
					item
					xs={12}
					md={9}
					sx={{
						mx: "auto", // horizontal centering
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Box
						sx={(theme) => ({
							bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.50",
							color: theme.palette.text.primary,
							px: { xs: 2, md: 4 },
							py: { xs: 4, md: 6 },
							borderRadius: 2,
						})}
						className="blogPost"
					>
						<Typography
							variant="h3"
							component="h1"
							sx={{
								fontWeight: "bold",
								mb: 2,
								fontSize: { xs: "2rem", md: "2.75rem" },
							}}
						>
							{post.title}
						</Typography>
						<Typography variant="subtitle1" sx={{ mb: 3 }}>
							By {post.author} |{" "}
							{new Date(post.date).toLocaleDateString("en-GB", {
								day: "numeric",
								month: "long",
								year: "numeric",
							})}
						</Typography>

						{/* Share Buttons */}
						<Stack direction="row" spacing={2} sx={{ mb: 4 }} className="shareButtons">
							<Tooltip title="Share on Facebook">
								<IconButton
									component="a"
									href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Facebook />
								</IconButton>
							</Tooltip>
							<Tooltip title="Share on Twitter">
								<IconButton
									component="a"
									href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(
										post.title
									)}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Twitter />
								</IconButton>
							</Tooltip>
							<Tooltip title="Share on LinkedIn">
								<IconButton
									component="a"
									href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
										postUrl
									)}&title=${encodeURIComponent(post.title)}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<LinkedIn />
								</IconButton>
							</Tooltip>
							<Tooltip title="Copy link">
								<IconButton onClick={handleCopyLink}>
									<LinkIcon />
								</IconButton>
							</Tooltip>
						</Stack>

						{post.coverImage && (
							<Box component="img" src={post.coverImage} alt={post.title} sx={{ width: "100%", borderRadius: 2, mb: 4 }} />
						)}

						<Box sx={{ typography: "body1", lineHeight: 1.8 }}>
							<ReactMarkdown>{post.content}</ReactMarkdown>
						</Box>

						<SEO title={post.title} description={post.summary || post.content.slice(0, 150)} image={post.coverImage} url={postUrl} />
					</Box>
				</Grid>
			</Grid>
			{/* Sidebar for Latest Posts */}
			<Grid item xs={12} md={3} pt={4}>
				<Box
					sx={{
						bgcolor: (theme) => (theme.palette.mode === "dark" ? "grey.900" : "grey.100"),
						px: 3,
						py: 4,
						borderRadius: 2,
					}}
				>
					<Divider sx={{ mb: 2 }} />
					<LatestPosts count={10} layout={"grid"} />
				</Box>
			</Grid>
		</Box>
	);
}

export default BlogPost;
