import {
  createRemoteReactComponent,
  ReactPropsFromRemoteComponentType,
} from '@shopify/remote-ui-react';

import {RadioButton as BaseRadioButton} from '@shopify/argo/components';

export type RadioButtonProps = ReactPropsFromRemoteComponentType<typeof BaseRadioButton>;
export const RadioButton = createRemoteReactComponent(BaseRadioButton);