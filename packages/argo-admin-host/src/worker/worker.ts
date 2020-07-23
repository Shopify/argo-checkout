import {
  ExtensionPoint,
  ExtensionApi,
  ExtensionPointCallback,
  ShopifyApi,
} from '@shopify/argo-admin';
import {WorkerCreator} from '@shopify/react-web-worker';
import {createRemoteRoot, RemoteChannel, retain} from '@shopify/rui-core';

import {apply as applySandbox, Denylist, builtIns} from './sandbox';

const {importScripts, Function: _Function} = self as any;

const registeredExtensions = new Map<ExtensionPoint, ExtensionPointCallback[ExtensionPoint]>();

const api: ShopifyApi = {
  extend(extensionPoint, callback) {
    registeredExtensions.set(extensionPoint, callback);
  },
};

Reflect.defineProperty(self, 'shopify', {
  value: api,
  configurable: false,
  enumerable: true,
  writable: false,
});

export function load(script: string, extraDenylist?: Denylist) {
  applySandbox(self, {...builtIns, ...extraDenylist});
  try {
    new URL(script);
  } catch (_) {
    new _Function(script)();
    return;
  }
  importScripts(script);
}

export function render<T extends ExtensionPoint>(
  extensionPoint: T,
  api: ExtensionApi[T],
  components: string[],
  channel: RemoteChannel,
) {
  if (!registeredExtensions.has(extensionPoint)) {
    return false;
  }

  retain(channel);
  retain(api);

  const callback = registeredExtensions.get(extensionPoint)!;
  callback(
    createRemoteRoot(channel, {
      components: components as any,
    }),
    api as any,
  );

  return true;
}

interface WorkerAPI {
  load: typeof load;
  render: typeof render;
}
export type Worker = ReturnType<WorkerCreator<WorkerAPI>>;
