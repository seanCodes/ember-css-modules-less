'use strict'

const getChannelURL = require('ember-source-channel-url')
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup')

module.exports = async function () {
	return {
		npmOptions: ['--legacy-peer-deps'],
		scenarios: [
			{
				name: 'ember-lts-3.24',
				npm: {
					devDependencies: {
						'ember-qunit': '^5.1.5',
						'ember-resolver': '^8.1.0',
						'ember-source': '~3.24.0',
					},
				},
			},
			{
				name: 'ember-lts-3.28',
				npm: {
					devDependencies: {
						'ember-qunit': '^5.1.5',
						'ember-resolver': '^8.1.0',
						'ember-source': '~3.28.0',
					},
				},
			},
			{
				name: 'ember-lts-4.4',
				npm: {
					devDependencies: {
						'ember-source': '~4.4.0',
					},
				},
			},
			{
				name: 'ember-lts-4.8',
				npm: {
					devDependencies: {
						'ember-source': '~4.8.0',
					},
				},
			},
			{
				name: 'ember-release',
				npm: {
					devDependencies: {
						'ember-source': await getChannelURL('release'),
					},
				},
			},
			{
				name: 'ember-beta',
				npm: {
					devDependencies: {
						'ember-source': await getChannelURL('beta'),
					},
				},
			},
			{
				name: 'ember-canary',
				npm: {
					devDependencies: {
						'ember-source': await getChannelURL('canary'),
					},
				},
			},
			embroiderSafe(),
			{
				...embroiderOptimized(),
				// This scenario fails due to an `ember-css-modules` error:
				// ```
				// Error: Unable to resolve local class names from dummy/components/hello.module.less; does the styles file exist?
				// ```
				allowedToFail: true,
			},
		],
	}
}
