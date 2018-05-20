import webpack from 'webpack';
import { scriptBundles } from './package.json';
import { externalLibs } from './package.json';

export default function setWebpackConfig({
	watch = true,
	sourcemaps = false,
	debug = false
}) {
	return {
		watch,
		entry: scriptBundles,
		output: {
			filename: '[name].min.js'
		},
		externals: externalLibs,
		devtool: (sourcemaps || !debug) ? '#source-map' : 'eval',
		resolve: {
			modules: ['node_modules']
		},
		module: {
			rules: [
				{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
				{ test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules|local-libs|external-libs/, options: {
						configFile: './.eslintrc',
						emitErrors: false,
						emitWarning: true
					} 
				}
			]
		},
		plugins: [
			new webpack.optimize.CommonsChunkPlugin({
				name: 'bundle'
			}),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(process.env.NODE_ENV)
				}
			}),
			new webpack.DefinePlugin({
				__DEV__: JSON.stringify(process.env.NODE_ENV !== 'production')
			})
		].concat(debug ? [] : [
			new webpack.optimize.UglifyJsPlugin({
				compress: {warnings: false}, output: {comments: false}
			})
		])
	}
}