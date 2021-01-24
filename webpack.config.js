const path = require('path');

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
    ...defaultConfig,
    entry: path.resolve(__dirname, './src/index.ts'),
    output: {
        filename: 'index.js',
		path: path.resolve(__dirname, './build')
    },
    module: {
		...defaultConfig.module,
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			...defaultConfig.module.rules,
		],
	},
	resolve: {
        ...defaultConfig.resolve,
        alias: {
            ...defaultConfig.resolve.alias,
            'react-places-autocomplete': path.resolve(
                __dirname,
                './node_modules/react-places-autocomplete/dist/index.umd.min.js'
            )
        },
		extensions: ['.tsx', '.ts', 'js', 'jsx', 'json'],
	}
};