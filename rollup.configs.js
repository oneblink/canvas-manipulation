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
      entry: 'index.js',
      plugins
    },
    bundle: {
      dest: 'dist/canvas-manipulation.js',
      format: 'umd',
      moduleName: 'canvasManipulation',
      banner: longBanner
    }
  },
  {
    rollup: {
      entry: 'index.js',
      plugins: [...plugins, uglify()]
    },
    bundle: {
      dest: 'dist/canvas-manipulation.min.js',
      format: 'umd',
      moduleName: 'canvasManipulation',
      banner: shortBanner
    }
  }
]
