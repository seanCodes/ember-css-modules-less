import { module, test } from 'qunit'
import { visit } from '@ember/test-helpers'
import { setupApplicationTest } from 'dummy/tests/helpers'

module('Acceptance | verify styles', function (hooks) {
	setupApplicationTest(hooks)

	test('app styles are processed', async function (assert) {
		await visit('/')

		assert
			.dom('[data-test--heading]')
			.hasStyle(
				{ fontSize: '32px', color: 'rgb(33, 37, 41)' },
				'files imported into the app stylesheet are processed',
			)
		assert
			.dom('[data-test--paragraph]')
			.hasStyle({ color: 'rgb(128, 128, 128)', fontSize: '16px' }, 'css module files are processed')
	})
})
