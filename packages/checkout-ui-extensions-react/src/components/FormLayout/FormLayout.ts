import {
  FormLayout as BaseFormLayout,
  FormLayoutGroup as BaseFormLayoutGroup,
} from '@shopify/checkout-ui-extensions';
import {createRemoteReactComponent} from '@remote-ui/react';

export const FormLayout = createRemoteReactComponent(BaseFormLayout);
export const FormLayoutGroup = createRemoteReactComponent(BaseFormLayoutGroup);
