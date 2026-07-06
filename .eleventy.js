export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("src/js");
	eleventyConfig.addGlobalData("year", new Date().getFullYear());

	return {
		dir: {
			input: "src",
			output: "_site",
			includes: "_includes",
			data: "_data",
		},
		templateFormats: ["njk", "md", "html"],
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
	};
}
