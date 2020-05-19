import React from 'react';
import {createPlainWorkerFactory} from '@shopify/web-worker';
import {Page} from '@shopify/polaris';
import {usePerformanceMark} from '@shopify/react-performance';
import {ExtensionPoint} from '@shopify/argo';

import {StandardContainer} from '../../components/containers';

const reactThirdPartyWorker = createPlainWorkerFactory(() =>
  import(/* webpackChunkName: 'vanilla' */ '../../third-party/vanilla'),
);

export function Vanilla() {
  usePerformanceMark('complete', 'Vanilla');

  return (
    <Page title="Vanilla">
      <StandardContainer
        script={reactThirdPartyWorker.url}
        extensionPoint={ExtensionPoint.Playground}
      />
    </Page>
  );
}
