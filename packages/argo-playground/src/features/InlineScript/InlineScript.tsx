import React, {useEffect, useState} from 'react';
import {Page} from '@shopify/polaris';
import {usePerformanceMark} from '@shopify/react-performance';
import {createPlainWorkerFactory} from '@remote-ui/web-workers';

import {StandardContainer} from '../../components/containers';

const reactThirdPartyWorker = createPlainWorkerFactory(() =>
  import(
    /* webpackChunkName: '3p-inline-script' */ '../../../../argo-admin-playground/src/scripts/inline-script'
  ),
);

export function InlineScript() {
  const [inlineScript, setInlineScript] = useState<string | undefined>();

  useEffect(() => {
    async function getDefaultScript() {
      if (!reactThirdPartyWorker.url) {
        return;
      }
      const {url} = reactThirdPartyWorker;
      const results = await fetch(url.href).then((response) => {
        return response.text();
      });
      setInlineScript(results);
    }
    getDefaultScript();
  }, []);

  usePerformanceMark('complete', 'Inline Script');

  return (
    <Page title="Inline Script">
      {inlineScript && <StandardContainer script={inlineScript} extensionPoint="Playground" />}
    </Page>
  );
}
