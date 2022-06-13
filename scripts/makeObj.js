//
// Create JS object from dot notation
//

function makeObj(obj, path, val) {
	const keys = path.split(".");
	const lastKey = keys.pop();
	const lastObj = keys.reduce((obj, key) => (obj[key] = obj[key] || {}), obj);
	lastObj[lastKey] = val;
}

module.exports = { makeObj };
