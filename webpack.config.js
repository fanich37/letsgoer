import webpack from 'webpack';

export default function setWebpackConfig({
	watch = true,
	sourcemaps = false,
	debug = false
}, filesToServe) {
	return {
		watch,
		entry: filesToServe,
		output: {
			filename: '[name].min.js'
		},
		/* If using external libs via script tag - indicate it here in this way:
			moduleName (like in node_modules): 'globalVar'
		*/
		externals: {
			jquery: '$'
		},
		devtool: (sourcemaps || !debug) ? '#source-map' : 'eval',
		resolve: {
			modules: ['node_modules']
		},
		module: {
			rules: [
				{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
				{ test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules|local-modules|external-libs/, options: {
						configFile: './.eslintrc',
						emitErrors: false,
						emitWarning: true
					} 
				}
			]
		},
		plugins: [
			new webpack.optimize.CommonsChunkPlugin({
				name: 'app'
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
			new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, output: {comments: false}})
		])
	}
}