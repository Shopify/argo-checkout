import React from 'react';
import {createPlainWorkerFactory} from '@shopify/web-worker';
import {Page} from '@shopify/polaris';
import {usePerformanceMark} from '@shopify/react-performance';
import {ExtensionPoint} from '@shopify/app-extensions-renderer';
import {host} from '@shopify/app-extensions-polaris-components';
import {AppExtension} from '../../components';

const reactThirdPartyWorker = createPlainWorkerFactory(() =>
  import(/* webpackChunkName: '3p-render-timeout' */ '../../third-party/render-timeout'),
);

export function RenderTimeout() {
  usePerformanceMark('complete', 'RenderTimeout');

  return (
    <Page title="Render Timeout">
      <AppExtension
        script={reactThirdPartyWorker.url}
        extensionPoint={ExtensionPoint.Playground}
        components={host}
      />
    </Page>
  );
}