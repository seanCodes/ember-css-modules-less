# ember-css-modules-less [![Actions Status](https://github.com/seanCodes/ember-css-modules-less/actions/workflows/ci.yml/badge.svg)](https://github.com/seanCodes/ember-css-modules-less/actions/workflows/ci.yml) [![npm version](https://img.shields.io/npm/v/ember-css-modules-less.svg)](https://www.npmjs.com/package/ember-css-modules-less)

This is an [ember-css-modules](https://github.com/salsify/ember-css-modules) plugin that allows it to understand [Less](https://lesscss.org/) syntax and work in conjunction with [ember-cli-less](https://github.com/gpoitch/ember-cli-less) to process Less CSS modules.


## Compatibility

- Ember.js v3.24 or above
- Ember CLI v3.24 or above
- Node.js v14 or above


## Installation

```sh
ember install ember-cli-less ember-css-modules ember-css-modules-less
```


## Usage

Usage is the same as [ember-css-modules](https://github.com/salsify/ember-css-modules#usage) except that `.less` files will be processed as CSS modules. For example:

```less
// app/components/hello.less

.look-at-me {
  color: crimson;
}
```

```hbs
{{! app/components/hello.hbs }}

<p local-class="look-at-me">
  I’m scoped look at me!
</p>
```

will output something like

```html
<p class="_look-at-me_1p3fr2_">
  I’m scoped look at me!
</p>
```



## Configuration

This plugin will configure ember-css-modules so that classes in all `.less` files in your project will be namespaced. If you need finer-grained control over the treatment of specific aspects of the interplay between CSS Modules and Less, see the [ember-css-modules preprocessors guide](https://github.com/salsify/ember-css-modules/blob/master/docs/PREPROCESSORS.md).

### Migrating to Modules

By default all files with a `.less` extension will be processed as CSS modules and will be combined and output as `app.less`. This can be an issue if you have existing styles that you want to gradually migrate to modules, or if you want the two to coexist.

In these cases you can differentiate between module/non-module Less files by providing a custom `cssModules.extension` value in your `ember-cli-build.js`. Modules can be output in a different location by customizing the `cssModules.intermediateOutputPath` and then the resulting file can be imported into your existing `app.less` file, for example:

```js
// ember-cli-build.js

module.exports = function (defaults) {
	const app = new EmberAddon(defaults, {
      cssModules: {
			extension: 'module.less',
			intermediateOutputPath: 'app/styles/css-modules.less',
		},
	})
	// ...
}
```

```less
// app/styles/app.less

@import 'some-existing-import.less';

@import 'css-modules.less';
```

With this config only `*.module.less` files would be processed as a CSS Modules and all existing files would be handled as normal.

## Usage with Embroider

For applications, the relative output path for CSS is different with Embroider than with a regular Ember CLI build. If `ember-css-modules-less` detects that you’re running in an application with `@embroider/compat` installed, it will attempt to adjust its `intermediateOutputPath` setting accordingly.


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).


## Credits

This addon is basically a clone of [ember-css-modules-sass](https://github.com/dfreeman/ember-css-modules-sass) by @dfreeman, but for modified for Less. Thanks to him for figuring this out first!
