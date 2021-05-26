import {createRemoteComponent} from '@remote-ui/core';

export interface ButtonProps {
  /** Allows the button to submit a form */
  submit?: boolean;
  /** Destination to link to, renders a Link */
  to?: string;
  /** Renders a visually subdued button */
  subdued?: boolean;
  /** Renders a button that visually looks like a Link */
  plain?: boolean;
  /** Whether the button should fill all available inline space. */
  fill?: boolean;
  /** Replaces content with a loading indicator */
  loading?: boolean;
  /** Accessible label for the loading indicator when user prefers reduced motion */
  loadingLabel?: string;
  /**
   * A label used for buyers using assistive technologies. When provided, any
   * 'children' supplied to this component are hidden from being seen for
   * accessibility purposes to prevent duplicate content from being read.
   */
  accessibilityLabel?: string;
  /** Disables the button, disallowing any interaction */
  disabled?: boolean;
  /** Callback when pressed */
  onPress?(): void;
}

/**
 * Buttons are used for actions, such as “Add”, “Continue”, “Pay now”, or “Save”.
 */
export const Button = createRemoteComponent<'Button', ButtonProps>('Button');
