const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')

const pkg = require('./package.json')
const year = new Date().getFullYear()

const plugins = [babel()]

const longBanner = `/*
 * ${pkg.name}: v${pkg.version}
 * ${pkg.homepage}
 *
 * Copyright ${year} BlinkMobile
 * Released under the ${pkg.license} license
 *
 * ${pkg.description}
 */
`

const shortBanner = `/*
 * ${pkg.name}: v${pkg.version} | ${pkg.homepage}
 * (c) ${year} BlinkMobile | Released under the ${pkg.license} license
 */
`

module.exports = [
  {
    rollup: {
      input: 'index.js',
      plugins
    },
    bundle: {
      file: 'dist/canvas-manipulation.js',
      format: 'umd',
      name: 'canvasManipulation',
      extend: true,
      banner: longBanner
    }
  },
  {
    rollup: {
      input: 'index.js',
      plugins: [...plugins, uglify()]
    },
    bundle: {
      file: 'dist/canvas-manipulation.min.js',
      format: 'umd',
      name: 'canvasManipulation',
      extend: true,
      banner: shortBanner
    }
  }
]
