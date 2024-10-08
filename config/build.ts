import esbuild from "https://deno.land/x/esbuild@v0.23.1/mod.js"
import { green } from 'https://deno.land/std@0.211.0/fmt/colors.ts';
import { parseArgs } from 'https://deno.land/std@0.211.0/cli/parse_args.ts';
import denoJson from '../deno.json' with {type: 'json'}


const args = parseArgs<{
  watch: boolean | undefined,
  develope: boolean | undefined,
  logLevel: esbuild.LogLevel
}>(Deno.args);

const copyConfig : esbuild.BuildOptions = {
  allowOverwrite: true,
  logLevel: args.logLevel ?? 'info',
  color: true,
  outdir: './dist',
  loader: {
    '.html': 'copy',
    '.svg': 'copy',
    '.png': 'copy',
    '.jpg': 'copy',
    '.ico': 'copy',
  },
  entryPoints: [
    './src/**/index.html',
    './src/**/_assets/**'
  ]
}

const filesConfig : esbuild.BuildOptions = {
  allowOverwrite: true,
  logLevel: args.logLevel ?? 'info',
  legalComments: args.develope ? 'inline' : 'none',
  color: true,
  minify: !args.develope ?? true,
  outdir: './dist',
  bundle: true,
  format: 'esm',
  target: 'es6',
  sourcemap: true,
  sourcesContent: true,
  tsconfig: './deno.json',
  entryNames: '[dir]/bundle.min',
  entryPoints: [
    './src/**/index.ts',
  ],
  supported: {
    'import-attributes': true,
    'nesting': true
  },
  alias: denoJson.imports
}

console.log('Build process started.');

const timestampNow = Date.now();

if (args.watch) {
  esbuild.context(copyConfig).then((context) => context.watch());
  esbuild.context(filesConfig).then((context) => context.watch());
} else {
  Promise.all([
    esbuild.build(copyConfig),
    esbuild.build(filesConfig),
  ]).then(() => {
    esbuild.stop();
    console.log(green(`esbuild ${esbuild.version} finished build in ${(Date.now() - timestampNow).toString()}ms.`));
  })
}
