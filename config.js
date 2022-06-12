const StyleDictionaryPackage = require("style-dictionary");

const set = (obj, path, val) => {
	const keys = path.split(".");
	const lastKey = keys.pop();
	const lastObj = keys.reduce((obj, key) => (obj[key] = obj[key] || {}), obj);
	lastObj[lastKey] = val;
};

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

function getStyleDictionaryConfig(theme) {
	return {
		source: [`tokens/color/${theme}/*.json`, "tokens/color/mapping/*.json"],
		format: {
			FigmaTokenReferences: ({ dictionary }) => {
				let obj = {};
				dictionary.allTokens.map((token) => {
					let value = token.value;
					if (dictionary.usesReference(token.original.value)) {
						const refs = dictionary.getReferences(token.original.value);
						refs.forEach((ref) => {
							value = value.replace(ref.value, function () {
								return `${token.original.value}`;
							});
						});
					}
					newToken = {
						value: value,
						type: token.type,
					};
					let path = token.path.join(".");
					set(obj, path, newToken);
				});
				return JSON.stringify(obj, null, 2);
			},
			allTokensRaw: function ({ dictionary }) {
				return JSON.stringify(dictionary.allTokens, null, 2);
			},
			tokensRaw: function ({ dictionary }) {
				return JSON.stringify(dictionary.tokens, null, 2);
			},
			es6WithReferences: function ({ dictionary }) {
				return dictionary.allTokens
					.map((token) => {
						let value = JSON.stringify(token.value);
						if (dictionary.usesReference(token.original.value)) {
							const refs = dictionary.getReferences(token.original.value);
							refs.forEach((ref) => {
								value = value.replace(ref.value, function () {
									return `${ref.name}`;
								});
							});
						}
						return `export const ${token.name} = ${value};`;
					})
					.join(`\n`);
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
							selector: theme == "dark" ? "[dark-mode]:root" : ":root",
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
				buildPath: `build/json/`,
				files: [
					{
						destination: `${theme}.json`,
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

// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT THEMES

["light", "dark"].map(function (theme) {
	console.log("\n==============================================");
	console.log(`\nProcessing: [${theme}]`);

	const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(theme));

	StyleDictionary.buildAllPlatforms();

	console.log("\nEnd processing");
});

console.log("\n==============================================");
console.log("\nBuild completed!");
