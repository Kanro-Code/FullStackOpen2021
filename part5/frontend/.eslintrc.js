module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		jest: true,
	},
	// extends: ['airbnb', 'airbnb/hooks'],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'windows'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'no-console': 0,
		'no-tabs': 0,
		'no-param-reassign': 1,
		'no-underscore-dangle': 0,
		'object-curly-newline': [
			'error',
			{
				ObjectExpression: { consistent: true, multiline: true },
				ObjectPattern: { consistent: true, multiline: true },
				ImportDeclaration: 'never',
				ExportDeclaration: { multiline: true, minProperties: 3 },
			},
		],
		'consistent-return': 0,
	},
}
