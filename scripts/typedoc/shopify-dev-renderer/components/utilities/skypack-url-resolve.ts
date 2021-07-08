import fetch from 'node-fetch';

const SKYPACK_URL = 'https://cdn.skypack.dev';

let pinnedUrls = {};

export function skypackUrlResolve() {
  return {
    async resolveId(source: string) {
      const convertedSource = await convertToSkypackSource(source);
      const maybeAbsoluteUrl = convertSkypackPathsToAbsoluteUrls(convertedSource);
      const url = parseURL(maybeAbsoluteUrl);
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


/** Initial req to skypack returns a 'pinned' URL which loads faster on subsequent reqs */
async function pinnedUrl(pkg: string) {
  if(!pinnedUrl[pkg]){
    const res = await fetch(`${SKYPACK_URL}/${pkg}`);
    const importUrl = res.headers.get('x-import-url')
    pinnedUrl[pkg] = `${SKYPACK_URL}${importUrl}`
  }
  return pinnedUrl[pkg];
}

async function convertToSkypackSource(pkg: string) {
  switch(pkg) {
    case '@shopify/admin-ui-extensions':
    case '@shopify/admin-ui-extensions-react':
      return await pinnedUrl(`${pkg}`)
    default:
      return pkg;
  }
}

function convertSkypackPathsToAbsoluteUrls(path: string): string {
  return path.startsWith('/-/') || path.startsWith('/new/') ? `${SKYPACK_URL}${path}` : path;
}