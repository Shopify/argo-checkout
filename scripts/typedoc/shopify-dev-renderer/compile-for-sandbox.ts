// import * as rollup from 'rollup/dist/es/rollup.browser.js';
import {rollup, ModuleFormat} from 'rollup';
import virtual from '@rollup/plugin-virtual';
import jsx from 'rollup-plugin-jsx'
import fetch from 'node-fetch';


export async function compileForSandbox(inputCode: string): Promise<string> {
  // Using the virtual plugin to supply a string as input to rollup
  const LOCAL_ID = 'INPUT';
  const virtualModules = {
    [LOCAL_ID]: inputCode,
  };

  const inputOptions = {
    input: LOCAL_ID,
    plugins: [
      virtual(virtualModules),
      urlResolve(),
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

const SKYPACK_URL = 'https://cdn.skypack.dev';

function urlResolve() {
  return {
    resolveId(source: string) {
      const convertedSource = convertToSkypackSource(source);

      const url = parseURL(
        isSkypackPath(convertedSource) ? `${SKYPACK_URL}${convertedSource}` : convertedSource,
      );
      return url && isValidURL(url) ? url.href : null;
    },
    async load(id: string) {
      const url = parseURL(id);
      const result = url && isValidURL(url) ? await loadURL(url) : null;
      return result;
    },
  };
}

function parseURL(source: string): URL | null {
  try {
    return new URL(source);
  } catch (error) {
    console.warn(error);
    return null;
  }
}

function isValidURL(url: URL): boolean {
  return url !== null && ['http:', 'https:'].indexOf(url.protocol) >= 0;
}

async function loadURL(url: URL) {
  switch (url.protocol) {
    case 'http:':
    case 'https:':
      return fetch(url.href).then((res) =>
        res.status === 404 ? null : res.text(),
      );
    default:
      throw new Error(`Cannot load URL protocol: ${url.protocol}`);
  }
}

function isSkypackPath(path: string) {
  return path.indexOf('/-/') === 0;
}

function convertToSkypackSource(pkg: string) {
  // remove after we ship 0.11.2
  const version = '@v0.11.2-alpha.0';

  switch(pkg) {
    case '@shopify/argo-admin':
    case '@shopify/argo-admin-react':
      return `${SKYPACK_URL}/${pkg}${version}`;
    default:
      return pkg;
  }
}