import {resolve} from 'path';
import {rollup} from 'rollup';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import {terser} from 'rollup-plugin-terser';

import {babelConfig} from './babel';
import {log, shouldUseReact, getEntry, namedArgument} from './utilities';

export async function build(...args: string[]) {
  log('Starting production build');

  try {
    const build = await rollup({
      input: getEntry(),
      treeshake: {
        propertyReadSideEffects: false,
      },
      plugins: [
        babel({
          compact: true,
          babelrc: false,
          configFile: false,
          ...babelConfig({
            react: shouldUseReact(),
            typescript: true,
          }),
          extensions: ['.esnext', '.ts', '.tsx', '.mjs', '.js'],
          exclude: ['**/node_modules', '!*.esnext'],
          babelHelpers: 'bundled',
        }),
        nodeResolve({
          extensions: ['.esnext', '.ts', '.tsx', '.mjs', '.js', '.json'],
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        commonjs(),
        terser(),
      ],
      onwarn: () => {},
    });

    await build.write({
      file: resolve(`build/${getFileNameFromArgs(args)}.js`),
      format: 'iife',
    });

    log(`Build completed successfully`);
  } catch (error) {
    log('An error was thrown while building your extension:', {error: true});
    // eslint-disable-next-line no-console
    console.error(error);
    process.exitCode = 1;
  }
}

const DEFAULT_FILE_NAME = 'main';

function getFileNameFromArgs(args: string[]) {
  const fileName = namedArgument('filename', args);
  return fileName ?? DEFAULT_FILE_NAME;
}
