export default [
  {
    input: 'src/index.js',
    output: [
      {
        format: 'esm',
        file: 'build/plugin.mjs',
      },
      {
        format: 'cjs',
        file: 'build/plugin.cjs',
      },
    ],
    plugins: [],
  },
]
