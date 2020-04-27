import React, {useEffect, useMemo, useState} from 'react';
import {RemoteReceiver, RemoteRenderer} from '@shopify/remote-ui-react/host';
import {
  createWorkerFactory,
  useWorker,
  createIframeWorkerMessenger,
} from '@shopify/react-web-worker';
import {Spinner, Stack} from '@shopify/polaris';
import {
  ExtensionPoint,
  ExtractedInputFromRenderExtension,
  RenderExtensionComponentProps,
  CallbackTypeForExtensionPoint,
  Layout,
  LayoutInput,
  LayoutHandler,
  SessionTokenInput,
} from '@shopify/app-extensions-renderer';
import {retain} from '@shopify/remote-ui-core';

import useResizeObserver from './utils/ResizeObserver';

const createWorker = createWorkerFactory(() =>
  import(/* webpackChunkName: 'sandbox-worker' */ './workers/worker'),
);

// See https://github.com/Shopify/app-extension-libs/issues/237#issuecomment-606625111
const SIZE_CLASS_BREAK_POINT = 480;

export function AppExtension<T extends ExtensionPoint>({
  extensionPoint,
  script,
  components = {},
  input = {} as ExtractedInputFromRenderExtension<CallbackTypeForExtensionPoint<T>>,
}: RenderExtensionComponentProps<T>) {
  const [loading, setLoading] = useState(true);
  const worker = useWorker(createWorker, {
    createMessenger: createIframeWorkerMessenger,
  });
  const receiver = useMemo(() => new RemoteReceiver(), []);
  const userInput = useMemo(() => input, [JSON.stringify(input)]);
  const [ref, layoutInput] = useLayoutInput();
  const sessionTokenInput = useSessionTokenInput();

  const inputs = useMemo(() => {
    return {...userInput, ...layoutInput, ...sessionTokenInput};
  }, [layoutInput, sessionTokenInput, userInput]);

  useEffect(() => {
    (async () => {
      if (!script) {
        return;
      }
      await worker.load(typeof script === 'string' ? script : script.href);
    })();
  }, [script]);

  useEffect(() => {
    (async () => {
      if (!script) {
        return;
      }
      await worker.render(extensionPoint, inputs, Object.keys(components), receiver.receive);
      setLoading(false);
    })();
  }, [script, worker, extensionPoint, components, receiver, inputs]);

  if (!script) {
    return null;
  }

  return (
    <div ref={ref}>
      {loading && (
        <Stack distribution="center" alignment="center">
          <Spinner />
        </Stack>
      )}
      <RemoteRenderer receiver={receiver} components={components} />
    </div>
  );
}

function useSessionTokenInput(): SessionTokenInput {
  return useMemo(
    () => ({
      sessionToken: {
        getSessionToken: () => {
          return Promise.resolve(
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaG9wIjoic2hvcDEubXlzaG9waWZ5LmlvIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.DPRpE9-UGNOFtgJV72KfqCfSIde0WW-0snwErCK3mHg',
          );
        },
      },
    }),
    [],
  );
}

function useLayoutInput(): [ReturnType<typeof useResizeObserver>[0], LayoutInput | undefined] {
  const [ref, entry] = useResizeObserver();
  const [layout, setLayout] = useState<Layout>();
  const [initialData, setInitialData] = useState<Layout>();
  const [layoutHandler, setLayoutHandler] = useState<LayoutHandler>();

  useEffect(() => {
    if (!entry) {
      return;
    }
    const newLayout: Layout = {
      horizontal: entry.contentRect.width > SIZE_CLASS_BREAK_POINT ? 'regular' : 'compact',
    };
    if (!initialData) {
      setInitialData(newLayout);
    }
    if (JSON.stringify(newLayout) !== JSON.stringify(layout)) {
      setLayout(newLayout);
    }
  }, [entry]);

  useEffect(() => {
    if (!layout || !layoutHandler) {
      return;
    }
    layoutHandler.onLayoutChange(layout);
  }, [layout, layoutHandler]);

  return useMemo(() => {
    const layoutInput: LayoutInput | undefined = initialData
      ? {
          layout: {
            initialData: initialData,
            setHandler: newHandler => {
              retain(newHandler);
              setLayoutHandler(newHandler);
            },
          },
        }
      : undefined;
    return [ref, layoutInput];
  }, [initialData]);
}
