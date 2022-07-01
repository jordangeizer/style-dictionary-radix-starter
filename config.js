const StyleDictionaryPackage = require("style-dictionary");
const { formatForFigma } = require("./scripts/figmaTokens");
const { formatJSONWithReferences } = require("./scripts/jsonWithReferences");
const { formatJSON } = require("./scripts/json");

// Add and remove themes here
const themes = ["light", "dark"];

function getStyleDictionaryConfig(theme) {
	return {
		// Add and remove token files to be included here
		source: [`src/color/${theme}/*.json`, "src/color/mapping/*.json"],
		format: {
			FigmaTokenReferences: ({ dictionary }) => {
				return JSON.stringify(formatForFigma(dictionary), null, 2);
			},
			DesignSystemJSONWithReferences: function ({ dictionary }) {
				return JSON.stringify(formatJSONWithReferences(dictionary), null, 2);
			},
			DesignSystemJSON: function ({ dictionary }) {
				return JSON.stringify(formatJSON(dictionary), null, 2);
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
				buildPath: `dist/css/`,
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
				buildPath: "dist/figma/",
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
				buildPath: `dist/json/`,
				files: [
					{
						destination: `${theme}.json`,
						format: "DesignSystemJSON",
					},
				],
			},
			jsonWithReferences: {
				transformGroup: "js",
				buildPath: `dist/jsonWithReferences/`,
				files: [
					{
						destination: `${theme}.json`,
						format: "DesignSystemJSONWithReferences",
					},
				],
			},
			allTokensRaw: {
				transformGroup: "js",
				buildPath: `dist/styleDictionary/allTokensRaw/`,
				files: [
					{
						destination: `${theme}.json`,
						format: "allTokensRaw",
					},
				],
			},
			tokensRaw: {
				transformGroup: "js",
				buildPath: `dist/styleDictionary/tokensRaw/`,
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
