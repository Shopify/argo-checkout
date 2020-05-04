import React, {useEffect, useState} from 'react';
import {Page} from '@shopify/polaris';
import {usePerformanceMark} from '@shopify/react-performance';
import {ExtensionPoint} from '@shopify/argo';
import {components} from '@shopify/argo-host';
import {AppExtension} from '../../components';
import {createPlainWorkerFactory} from '@shopify/web-worker';

const reactThirdPartyWorker = createPlainWorkerFactory(() =>
  import(/* webpackChunkName: '3p-inline-script' */ '../../third-party/inline-script'),
);

export function InlineScript() {
  const [inlineScript, setInlineScript] = useState<string | undefined>();

  useEffect(() => {
    async function getDefaultScript() {
      if (!reactThirdPartyWorker.url) {
        return;
      }
      const {url} = reactThirdPartyWorker;
      const results = await fetch(url.href).then(response => {
        return response.text();
      });
      setInlineScript(results);
    }
    getDefaultScript();
  }, []);

  usePerformanceMark('complete', 'Inline Script');

  return (
    <Page title="Inline Script">
      {inlineScript && (
        <AppExtension
          script={inlineScript}
          extensionPoint={ExtensionPoint.SubscriptionsManagement}
          components={components}
        />
      )}
    </Page>
  );
}
