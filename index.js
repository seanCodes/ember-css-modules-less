'use strict'

// eslint-disable-next-line n/no-extraneous-require, n/no-unpublished-require
const EmberCSSModulesPlugin = require('ember-css-modules/lib/plugin')
// eslint-disable-next-line n/no-extraneous-require
const PostCSSLess = require('postcss-less')

class EmberCSSModulesLessPlugin extends EmberCSSModulesPlugin {
	constructor(parent) {
		super(parent)
		this._verifySetup(parent)
	}

	config() {
		return {
			intermediateOutputPath: this._intermediateOutputPath(),
			extension: 'less',
			postcssOptions: {
				syntax: PostCSSLess,
			},
		}
	}

	_intermediateOutputPath() {
		return this.isForAddon() ? 'addon.less' : this._hasEmbroider() ? 'app.less' : 'app/styles/app.less'
	}

	_hasEmbroider() {
		return '@embroider/compat' in (this.parent.pkg.devDependencies ?? {})
	}

	_verifySetup(parent) {
		const hasEmberCliLess = parent.addons.some(({ name }) => name === 'ember-cli-less')

		if (!hasEmberCliLess) {
			parent.ui.writeWarnLine(
				`Detected ember-css-modules-less without ember-cli-less. You’ll need both in order for Less preprocessing to work correctly.`,
			)
		}
	}
}

const AddonConfig = require('./package')

module.exports = {
	name: AddonConfig.name,

	shouldIncludeChildAddon(addon) {
		// Don’t infinitely recurse – it’s the dummy test app that depends on `dummy-addon`, not this addon itself.
		return addon.name.includes('dummy')
	},

	createCssModulesPlugin(parent) {
		return new EmberCSSModulesLessPlugin(parent)
	},
}
