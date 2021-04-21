import {RemoteRoot} from '@remote-ui/react';

import {render} from '../api';
import {ExtensionApiContext} from '../extension-api/utils';

jest.mock('@remote-ui/react', () => ({
  ...(jest.requireActual('@remote-ui/react') as any),
  render: jest.fn(),
}));

jest.mock('react', () => ({
  ...(jest.requireActual('react') as any),
  createElement: jest.fn(),
}));

jest.mock('@shopify/argo-admin', () => ({
  ...(jest.requireActual('@shopify/argo-admin') as any),
  extend: jest.fn(),
}));

const reactCreateElement = jest.requireMock('react').createElement;
const remoteRender = jest.requireMock('@remote-ui/react').render;

describe('extend()', () => {
  it('calls remote render with generated element', () => {
    reactCreateElement.mockReset();

    const element = <div />;

    const root = ({mount: jest.fn()} as unknown) as RemoteRoot;
    const api = {locale: 'en'} as any;

    const createdElement = <p />;

    reactCreateElement.mockImplementation(() => createdElement);

    const extendCallback = render(() => element);
    extendCallback(root, api);

    expect(reactCreateElement).toHaveBeenCalledWith(
      ExtensionApiContext.Provider,
      {value: api},
      element,
    );
    expect(remoteRender).toHaveBeenCalledWith(
      createdElement,
      root,
      expect.any(Function),
    );

    const renderCallback = remoteRender.mock.calls[0][2];
    renderCallback();

    expect(root.mount).toHaveBeenCalled();
  });
});
