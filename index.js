/* eslint-env node */
'use strict';

const path = require('path');

// Attempts to require a file, recursively checking parent directories until found.
// Similar to native `require` behavior, but doesn't check in `node_modules` folders.
// Based on https://github.com/js-cli/node-findup-sync.
const requireUp = (fileName, cwd) => {
	const filePath = path.resolve(cwd, fileName);
	try {
		return require(filePath);
	} catch (err) {
		// Ignore OS errors (will recurse to parent directory).
		if (err.code !== 'MODULE_NOT_FOUND') {
			throw err;
		}
	}
	const dir = path.dirname(cwd);
	if (dir === cwd) {
		return undefined;
	}
	return requireUp(fileName, dir);
};

const plugin = requireUp('eslint-local-rules.js', __dirname);

if (!plugin) {
	throw new Error(
		`eslint-plugin-local-rules: Cannot find 'eslint-local-rules.js' (looking up from '${__dirname}').`
	);
}

module.exports = plugin;
