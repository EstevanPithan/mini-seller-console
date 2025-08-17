/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
	tabWidth: 2,
	useTabs: true,
	semi: false,
	singleQuote: true,
	singleAttributePerLine: true,
	printWidth: 120,
	trailingComma: 'all',
	bracketSameLine: false,
	bracketSpacing: true,
	htmlWhitespaceSensitivity: 'ignore',
	experimentalTernaries: true,
	'prettier/prettier': [
		'error',
		{
			endOfLine: 'auto',
		},
	],
	plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
	tailwindStylesheet: './src/assets/styles/app.css',
}

export default config
