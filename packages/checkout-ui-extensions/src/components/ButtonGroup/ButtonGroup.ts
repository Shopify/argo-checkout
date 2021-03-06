import {createRemoteComponent} from '@remote-ui/core';

export interface ButtonGroupProps {}

/**
 * A button group controls the layout for two or more stacked buttons such as “Continue” and “Return to cart”, and adds the necessary spacing between them.
 */
export const ButtonGroup = createRemoteComponent<
  'ButtonGroup',
  ButtonGroupProps
>('ButtonGroup');
