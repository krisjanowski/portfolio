import React from "react";
import { Helmet } from "react-helmet-async";

function SEO({ title, description, image, url }) {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />

			{/* OpenGraph for social sharing */}
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			{image && <meta property="og:image" content={image} />}
			{url && <meta property="og:url" content={url} />}
			<meta property="og:type" content="article" />

			{/* Twitter cards */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			{image && <meta name="twitter:image" content={image} />}
		</Helmet>
	);
}

export default SEO;
