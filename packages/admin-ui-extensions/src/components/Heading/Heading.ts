import {createRemoteComponent} from '@remote-ui/core';
import type {BaseHeadingProps} from '@shopify/ui-extensions';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends Omit<BaseHeadingProps, 'level'> {
  /**
   * @default 2
   */
  level?: Level;
}

/**
 * Headings are used as the titles of each major section of an extension.
 */
export const Heading = createRemoteComponent<'Heading', HeadingProps>(
  'Heading',
);
