function formatForES6(dictionary) {
	return dictionary.allTokens
		.map((token) => {
			let value = JSON.stringify(token.value);
			if (dictionary.usesReference(token.original.value)) {
				const refs = dictionary.getReferences(token.original.value);
				refs.forEach((ref) => {
					value = value.replace(`"${ref.value}"`, function () {
						return ref.name;
					});
				});
			}
			return `export const ${token.name} = ${value};`;
		})
		.join(`\n`);
}

module.exports = { formatForES6 };
