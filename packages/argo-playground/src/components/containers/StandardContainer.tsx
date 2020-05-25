import React, {useMemo, useState, ReactNode, useEffect} from 'react';
import {ExtensionPoint} from '@shopify/argo';
import {
  ArgoExtension,
  useLayoutInput,
  useSessionTokenInput,
  useLocaleInput,
  ArgoExtensionsProps,
  createIframeWorkerMessenger,
  ReadyState,
} from '@shopify/argo-host';
import {createWorkerFactory} from '@remote-ui/web-workers';
import {LoadingSpinner} from './shared/LoadingSpinner';
import {Error} from './shared/Error';

const createWorker = createWorkerFactory(() =>
  import(/* webpackChunkName: 'sandbox-worker' */ '@shopify/argo-host/worker'),
);

type BaseProps<T extends ExtensionPoint> = Omit<ArgoExtensionsProps<T>, 'input' | 'worker'>;

type Input<T extends ExtensionPoint> = Omit<
  ArgoExtensionsProps<T>['input'],
  'layout' | 'locale' | 'sessionToken'
>;

export interface StandardContainerProps<T extends ExtensionPoint> extends BaseProps<T> {
  app?: {
    name: string;
    icon?: string;
    id: string;
  };
  input?: Input<T>;
  loading?: ReactNode;
  noScriptError?: ReactNode;
  timeoutError?: ReactNode;
}

export function StandardContainer<T extends ExtensionPoint>(props: StandardContainerProps<T>) {
  const {
    onReadyStateChange,
    noScriptError = <Error />,
    timeoutError = <Error />,
    loading = <LoadingSpinner />,
  } = props;
  const [readyState, setReadyState] = useState(ReadyState.Loading);

  const worker = useMemo(
    () =>
      createWorker({
        createMessenger: createIframeWorkerMessenger,
      }),
    [],
  );

  const [ref, layoutInput] = useLayoutInput();
  const sessionTokenInput = useSessionTokenInput(() => {
    return Promise.resolve(
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaG9wIjoic2hvcDEubXlzaG9waWZ5LmlvIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.DPRpE9-UGNOFtgJV72KfqCfSIde0WW-0snwErCK3mHg',
    );
  }, []);
  const localeInput = useLocaleInput('en');
  const input = useMemo(() => {
    if (!layoutInput) {
      return undefined;
    }
    return {
      ...layoutInput,
      ...sessionTokenInput,
      ...localeInput,
      ...props.input,
    };
  }, [layoutInput, sessionTokenInput, localeInput, props.input]);

  const content = useMemo(() => {
    if (readyState === ReadyState.NoScript) {
      return noScriptError;
    }
    if (readyState === ReadyState.RenderErrorTimeout) {
      return timeoutError;
    }
    return (
      input && (
        <ArgoExtension
          {...props}
          input={input as any}
          worker={worker}
          onReadyStateChange={setReadyState}
        />
      )
    );
  }, [readyState, input, worker, timeoutError, noScriptError, props]);

  useEffect(() => onReadyStateChange?.(readyState), [readyState, onReadyStateChange]);

  return (
    <div style={{position: 'relative', minHeight: '60px', height: '100%'}}>
      <div ref={ref}>{content}</div>
      {readyState === ReadyState.Loading && loading}
    </div>
  );
}
