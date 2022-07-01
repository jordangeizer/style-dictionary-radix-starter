//
// Utility for formatting tokens
//
const { makeObj } = require("./makeObj");

function formatJSONWithReferences(dictionary) {
	let obj = {};
	dictionary.allTokens.map((token) => {
		let tokenValue = token.value;
		if (dictionary.usesReference(token.original.value)) {
			const refs = dictionary.getReferences(token.original.value);
			refs.forEach((ref) => {
				tokenValue = tokenValue.replace(ref.value, function () {
					return `${token.original.value}`;
				});
			});
		}
		newToken = tokenValue;
		let path = token.path.join(".");
		makeObj(obj, path, newToken);
	});
	return obj;
}

module.exports = { formatJSONWithReferences };
