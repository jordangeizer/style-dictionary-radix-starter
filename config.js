const StyleDictionaryPackage = require("style-dictionary");
const { formatForFigma } = require("./scripts/figmaTokens");
const { formatForES6 } = require("./scripts/es6WithReferences");

// Add and remove themes here
const themes = ["light", "dark"];

function getStyleDictionaryConfig(theme) {
	return {
		// Add and remove token files to be included here
		source: [`tokens/color/${theme}/*.json`, "tokens/color/mapping/*.json"],
		format: {
			FigmaTokenReferences: ({ dictionary }) => {
				return JSON.stringify(formatForFigma(dictionary), null, 2);
			},
			es6WithReferences: function ({ dictionary }) {
				return formatForES6(dictionary);
			},
			allTokensRaw: function ({ dictionary }) {
				return JSON.stringify(dictionary.allTokens, null, 2);
			},
			tokensRaw: function ({ dictionary }) {
				return JSON.stringify(dictionary.tokens, null, 2);
			},
		},
		platforms: {
			web: {
				transformGroup: "web",
				buildPath: `build/css/`,
				files: [
					{
						destination: `${theme}.css`,
						format: "css/variables",
						options: {
							outputReferences: true,
							selector: theme == "dark" ? ".dark-mode:root" : ":root",
						},
					},
				],
			},
			figma: {
				transformGroup: "js",
				buildPath: "build/figma/",
				files: [
					{
						destination: `${theme}.json`,
						format: "FigmaTokenReferences",
						options: {
							outputReferences: true,
						},
					},
				],
			},
			json: {
				transformGroup: "js",
				buildPath: `build/js/`,
				files: [
					{
						destination: `${theme}.js`,
						format: "es6WithReferences",
					},
				],
			},
			allTokensRaw: {
				transformGroup: "js",
				buildPath: `build/sd/allTokensRaw/`,
				files: [
					{
						destination: `${theme}.json`,
						format: "allTokensRaw",
					},
				],
			},
			tokensRaw: {
				transformGroup: "js",
				buildPath: `build/sd/tokensRaw/`,
				files: [
					{
						destination: `${theme}.json`,
						format: "tokensRaw",
					},
				],
			},
		},
	};
}

console.log("Build started...");

// Process design tokens for different themes

themes.map(function (theme) {
	console.log("\n==============================================");
	console.log(`\nProcessing: [${theme}]`);

	const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(theme));

	StyleDictionary.buildAllPlatforms();

	console.log("\nEnd processing");
});

console.log("\n==============================================");
console.log("\nBuild completed!");
