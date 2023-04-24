import vue from 'rollup-plugin-vue'
import typescript from '@rollup/plugin-typescript'

export default [
  {
    input: 'src/plugin.ts',
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
    plugins: [
      typescript({
        exclude: ['example', 'typings'],
        compilerOptions: {
          target:
            'ES2020' /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
          /* Modules */
          module: 'esnext' /* Specify what module code is generated. */,
          rootDir: './src',
          outDir: './build',
          declaration: true /* Generate .d.ts files from TypeScript and JavaScript files in your project. */,
          esModuleInterop: true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
          forceConsistentCasingInFileNames: true /* Ensure that casing is correct in imports. */,
          strict: true /* Enable all strict type-checking options. */,
          skipLibCheck: true /* Skip type checking all .d.ts files. */,
        },
      }),
      vue(),
    ],
  },
]
