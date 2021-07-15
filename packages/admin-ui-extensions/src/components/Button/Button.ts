import {createRemoteComponent} from '@remote-ui/core';

import {IconProps} from '../Icon';

type RequiredTitleOrIcon =
  | {
      /** Button label text */
      title: string;

      icon?: IconProps;
    }
  | {
      /** Button label text */
      title?: string;
      icon: IconProps;
    };

export type ButtonProps = RequiredTitleOrIcon & {
  /**
   * Provides extra visual weight and identifies the primary action in a set of buttons.
   * @defaultValue `false`
   */
  primary?: boolean;

  /** Allows the button to submit a form */
  submit?: boolean;

  /** Callback when button is pressed */
  onPress?(): void;

  /** Disables the button, preventing interaction. */
  disabled?: boolean;
};

/**
 * Buttons are used primarily for actions, such as “Add”, “Close”, “Cancel”, or “Save”.
 */
export const Button = createRemoteComponent<'Button', ButtonProps>('Button');
