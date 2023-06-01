'use strict'

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon')

module.exports = function (defaults) {
	const app = new EmberAddon(defaults, {
		cssModules: {
			extension: 'module.less',
			intermediateOutputPath: 'app/styles/_modules.less',
		},
		lessOptions: {
			paths: ['node_modules/bootstrap-less-port/less/'],
			math: 'parens-division',
			sourceMap: { outputSourceFiles: true },
		},
	})

	/*
		This build file specifies the options for the dummy test app of this
		addon, located in `/tests/dummy`
		This build file does *not* influence how the addon or the app using it
		behave. You most likely want to be modifying `./index.js` or app's build file
	*/

	const { maybeEmbroider } = require('@embroider/test-setup')

	return maybeEmbroider(app, {
		skipBabel: [
			{
				package: 'qunit',
			},
		],
	})
}
