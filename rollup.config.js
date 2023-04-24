import vue from 'rollup-plugin-vue'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default [
  {
    input: 'build/plugin.js',
    output: [
      {
        format: 'esm',
        file: 'out/plugin.mjs'
      },
      {
        format: 'cjs',
        file: 'out/plugin.cjs'
      }
    ],
    plugins: [
      vue(), peerDepsExternal()
    ],
  },
];
