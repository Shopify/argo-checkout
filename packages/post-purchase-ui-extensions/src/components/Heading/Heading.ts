import {createRemoteComponent} from '@remote-ui/core';

type Level = 1 | 2 | 3;

export interface HeadingProps {
  /**
   * Unique identifier. Typically used to make the heading a target
   * that another component can refer to in order to provide an alternative
   * accessibility label.
   */
  id?: string;
  /**
   * The visual level of the heading. When not provided, the heading will use
   * its “automatic” heading level, which is determined by the level of nesting
   * within ancestor `HeadingGroup`s. No matter what value you provide here,
   * the semantic level (e.g., how the heading contributes to the document outline)
   * is determined exclusively by the “automatic” heading level.
   */
  level?: Level;
  /**
   * A custom accessibility role for this heading. Currently, only `presentation`
   * is supported, which will strip the semantic meaning of the heading, but leave
   * the visual styling intact.
   */
  role?: 'presentation';
}

/**
 * Headings are used as the titles of each major section of the checkout.
 * For example, Contact information, Shipping method, or Payment.
 */
export const Heading = createRemoteComponent<'Heading', HeadingProps>(
  'Heading',
);
