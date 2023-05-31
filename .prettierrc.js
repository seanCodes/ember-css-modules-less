'use strict'

module.exports = {
	arrowParens: 'avoid',
	bracketSpacing: true,
	printWidth: 120,
	proseWrap: 'preserve',
	semi: false,
	singleQuote: true,
	tabWidth: 3,
	trailingComma: 'all',
	useTabs: true,

	overrides: [
		{
			files: '*.{css,less,html,hbs,yml,yaml}',
			options: {
				singleQuote: false,
			},
		},
		{
			files: '*.{html,hbs}',
			options: {
				printWidth: 200,
			},
		},
	],
}
