import React, {useMemo, useState, ReactNode, useEffect} from 'react';
import {ExtensionPoint} from '@shopify/argo-admin';
import {
  ArgoExtension,
  useLayoutApi,
  useSessionTokenApi,
  useLocaleApi,
  ArgoExtensionsProps,
  createIframeWorkerMessenger,
  ReadyState,
} from '@shopify/argo-admin-host';
import {createWorkerFactory} from '@remote-ui/web-workers';
import {useWorker} from '@remote-ui/react/host';

import {LoadingSpinner} from './shared/LoadingSpinner';
import {Error} from './shared/Error';
import {UnsupportedComponentError} from './shared/UnsupportedComponentError';

import './ArgoStyleOverrides.scss';

const createWorker = createWorkerFactory(() =>
  import(/* webpackChunkName: 'sandbox-worker' */ '@shopify/argo-admin-host/worker'),
);

export interface App {
  title: string;
  icon?: {
    transformedSrc: string;
  };
  id: string;
  installation: {
    launchUrl: string;
  };
  developerName: string;
}

type BaseProps<T extends ExtensionPoint> = Omit<ArgoExtensionsProps<T>, 'api' | 'worker'>;

type Api<T extends ExtensionPoint> = Omit<
  ArgoExtensionsProps<T>['api'],
  'layout' | 'locale' | 'sessionToken'
>;

export interface StandardContainerProps<T extends ExtensionPoint> extends BaseProps<T> {
  app?: App;
  api?: Api<T>;
  loading?: ReactNode;
  noScriptError?: ReactNode;
  timeoutError?: ReactNode;
  unsupportedComponentError?: ReactNode;
}

export function StandardContainer<T extends ExtensionPoint>(props: StandardContainerProps<T>) {
  const {
    onReadyStateChange,
    noScriptError = <Error />,
    timeoutError = <Error />,
    unsupportedComponentError = <UnsupportedComponentError />,
    loading = <LoadingSpinner />,
  } = props;
  const [readyState, setReadyState] = useState(ReadyState.Loading);

  const worker = useWorker(createWorker, {
    createMessenger: createIframeWorkerMessenger,
  });

  const [ref, layoutApi] = useLayoutApi();
  const sessionTokenApi = useSessionTokenApi(() => {
    return Promise.resolve(
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaG9wIjoic2hvcDEubXlzaG9waWZ5LmlvIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.DPRpE9-UGNOFtgJV72KfqCfSIde0WW-0snwErCK3mHg',
    );
  }, []);
  const localeApi = useLocaleApi('en');
  const api = useMemo(() => {
    if (!layoutApi) {
      return undefined;
    }
    return {
      ...layoutApi,
      ...sessionTokenApi,
      ...localeApi,
      ...props.api,
    };
  }, [layoutApi, sessionTokenApi, localeApi, props.api]);

  const content = useMemo(() => {
    if (readyState === ReadyState.NoScript) {
      return noScriptError;
    }
    if (readyState === ReadyState.RenderErrorTimeout) {
      return timeoutError;
    }
    if (readyState === ReadyState.UnsupportedComponent) {
      return unsupportedComponentError;
    }
    return (
      api && (
        <ArgoExtension
          {...props}
          api={api as any}
          worker={worker}
          onReadyStateChange={setReadyState}
        />
      )
    );
  }, [readyState, api, worker, timeoutError, noScriptError, unsupportedComponentError, props]);

  useEffect(() => onReadyStateChange?.(readyState), [readyState, onReadyStateChange]);

  return (
    <div
      className="ArgoExtension"
      style={{position: 'relative', minHeight: '60px', height: '100%'}}
    >
      <div ref={ref}>{content}</div>
      {readyState === ReadyState.Loading && loading}
    </div>
  );
}
