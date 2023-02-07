const typescript = require('rollup-plugin-typescript2')
const { terser } = require('rollup-plugin-terser')
const { getBabelOutputPlugin } = require('@rollup/plugin-babel')
const replace = require('@rollup/plugin-replace')
const pkg = require('./package.json')

const input = './src/index.ts'
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]
const tsplug = function (declaration = false) {
  return typescript({
    useTsconfigDeclarationDir: true,
    tsconfigOverride: { compilerOptions: { declaration } },
  })
}
const babelplug = function (runtime = true, esm = true) {
  return getBabelOutputPlugin({
    presets: ['@babel/preset-env'],
    plugins: runtime
      ? [
          [
            '@babel/plugin-transform-runtime',
            {
              useESModules: esm,
              version: '7.10.4',
            },
          ],
        ]
      : [],
  })
}
const envprod = { 'process.env.NODE_ENV': '"production"' }

module.exports = [
  {
    input,
    external,
    output: { file: pkg.main, format: 'cjs' },
    plugins: [tsplug(true), babelplug(true, false)],
  },
  {
    input,
    external,
    output: { file: pkg.module, format: 'esm' },
    plugins: [tsplug(), babelplug()],
  },
]
