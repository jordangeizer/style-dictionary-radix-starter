//
// Utility for formatting tokens for Figma Tokens platform
//
const { makeObj } = require("./makeObj");

function formatForFigma(dictionary) {
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
		makeObj(obj, path, newToken);
	});
	return obj;
}

module.exports = { formatForFigma };
