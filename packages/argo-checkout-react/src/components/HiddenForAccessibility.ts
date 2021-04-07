import {HiddenForAccessibility as BaseHiddenForAccessibility} from '@shopify/argo-checkout';
import {createRemoteReactComponent} from '@remote-ui/react';

export const HiddenForAccessibility = createRemoteReactComponent(
  BaseHiddenForAccessibility,
);
