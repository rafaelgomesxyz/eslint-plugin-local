# eslint-plugin-local

A fork of https://github.com/cletusw/eslint-plugin-local-rules that allows using a full local plugin instead of just rules.

## Dependencies

* Requires ESLint 0.8.0 or higher

## Install

```
npm install @rafaelgssa/eslint-plugin-local
```

## Usage

### ./eslint-local.js

```javascript
'use strict';

module.exports = {
	rules: {
		'disallow-identifiers': {
			meta: {
				docs: {
					description: 'disallow identifiers',
					category: 'Possible Errors',
					recommended: false,
				},
				schema: [],
			},
			create: function (context) {
				return {
					Identifier: function (node) {
						context.report({
							node: node,
							message: 'Identifiers not allowed for Super Important reasons.',
						});
					},
				};
			},
		},
	},
};
```

### ./.eslintrc

```json
{
	"plugins": [
		"@rafaelgssa/local"
	],

	"rules": {
		"@rafaelgssa/local/disallow-identifiers": 2
	}
}
```
