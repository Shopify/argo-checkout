import {
  createRemoteReactComponent,
  ReactPropsFromRemoteComponentType,
} from '@shopify/remote-ui-react';

import {Modal as BaseModal} from '@shopify/argo/components';

export type ModalProps = ReactPropsFromRemoteComponentType<typeof BaseModal>;
export const Modal = createRemoteReactComponent(BaseModal);