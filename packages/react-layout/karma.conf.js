/* karma.conf.js */
module.exports = function karmaConfig(config) {
	config.set({
		browsers: ['Chrome'],
		frameworks: ['mocha', "sinon", "chai", "snapshot", "mocha-snapshot"],
		files: [
			"./node_modules/lite-fixture/index.js",
			"./test/*.js",
			"./__snapshots__/**/*.md",
		],
		snapshot: {
			update: !!process.env.UPDATE,
			prune: !!process.env.PRUNE,
		},
		webpackMiddleware: {
			noInfo: true
		},
		mochaReporter: {
			showDiff: true,
		  },
		  reporters: ["mocha"],
		preprocessors: {
			"./__snapshots__/**/*.md": ["snapshot"],
			"./test/*.js": ["webpack", "sourcemap"],
		},
		webpack: { // kind of a copy of your webpack config
			devtool: "inline-source-map", // just do inline source maps instead of the default
			module: {
				loaders: [
					{
						test: /\.js$/,
						exclude: /\/node_modules\//,
						loader: "babel-loader",
					},
				],
			},
		},
	});
};
