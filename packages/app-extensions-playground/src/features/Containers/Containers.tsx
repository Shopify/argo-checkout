import React, {useState} from 'react';
import {createPlainWorkerFactory} from '@shopify/web-worker';
import {Page, Layout, Card, Stack, Badge, TextField, Link} from '@shopify/polaris';
import {ArgoModal} from '../../components/containers';
import {host} from '@shopify/app-extensions-polaris-components';
import {ExtensionPoint} from '@shopify/app-extensions-renderer';

const modalClientScript = createPlainWorkerFactory(() =>
  import(/* webpackChunkName: 'modal-script' */ '../../third-party/modal-content'),
);

export function Containers() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Page title="Host Containers" primaryAction={{content: 'Epic Action'}}>
        <Layout>
          <Layout.Section>
            <Card sectioned title="Some form" primaryFooterAction={{content: 'Submit'}}>
              <TextField label="Some field" value="" onChange={() => {}} />
              <TextField label="Some other field" value="" onChange={() => {}} />
              <TextField label="Yet another field" multiline value="" onChange={() => {}} />
            </Card>
            <Card title="Modal Actions">
              <Card.Section key="first-modal-trigger">
                <Stack distribution="fillEvenly">
                  <div>Information about a thing.</div>
                  <div>
                    Coolness percent: <strong>67%</strong>
                  </div>
                  <div>
                    <Stack distribution="trailing">
                      <Link>Remove</Link>
                      <Link onClick={() => setShowModal(true)}>Edit</Link>
                    </Stack>
                  </div>
                </Stack>
              </Card.Section>
              <Card.Section key="second-modal-trigger">
                <Stack distribution="fillEvenly">
                  <div>More info about other things</div>
                  <div>
                    Coolness percent: <strong>89%</strong>
                  </div>
                  <div>
                    <Stack distribution="trailing">
                      <Link>Remove</Link>
                      <Link>Edit</Link>
                    </Stack>
                  </div>
                </Stack>
              </Card.Section>
            </Card>
          </Layout.Section>
          <Layout.Section oneThird>
            <Card
              sectioned
              title="Side bar card one"
              primaryFooterAction={{
                content: 'Do something',
              }}
            >
              Here is some information for the side bar in case you needed it.
            </Card>
            <Card sectioned title="Side bar card two">
              {[1, 2, 3].map(i => (
                <Card.Section key={i}>
                  <Stack distribution="fill">
                    <div>Some cool text</div>
                    <Badge status="success">{String(i)}</Badge>
                  </Stack>
                </Card.Section>
              ))}
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
      <ArgoModal
        open={showModal}
        defaultTitle="Default title"
        appInfo={{
          name: 'OneMoreTime',
        }}
        onClose={() => setShowModal(false)}
        onBackClick={() => {
          console.log('Go back');
          setShowModal(false);
        }}
        script={modalClientScript.url}
        extensionPoint={ExtensionPoint.SubscriptionsManagement}
        components={host}
        height="450px"
      />
    </>
  );
}
