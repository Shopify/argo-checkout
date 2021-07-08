// import * as rollup from 'rollup/dist/es/rollup.browser.js';
import {rollup, ModuleFormat} from 'rollup';
import virtual from '@rollup/plugin-virtual';
import jsx from 'rollup-plugin-jsx'

import { skypackUrlResolve } from './skypack-url-resolve';

export async function compileForSandbox(inputCode: string): Promise<string> {
  const LOCAL_ID = 'INPUT';
  const virtualModules = {
    [LOCAL_ID]: inputCode,
  };

  const inputOptions = {
    input: LOCAL_ID,
    plugins: [
      // The virtual plugin let us supply a string instead of a file as input
      virtual(virtualModules),
      skypackUrlResolve(),
      jsx({factory: 'React.createElement'}),
    ],
  };

  const outputOptions = {
    format: 'esm' as ModuleFormat,
  };

  const bundle = await rollup(inputOptions);
  const {output} = await bundle.generate(outputOptions);

  const outputCode = `${output[0].code}`;
  return outputCode;
}

