import {createRemoteComponent} from '@remote-ui/core';

export interface FormProps {
  /**
   * Whether the form is able to be submitted. When set to `true`, this will
   * disable the implicit submit behavior of the form.
   */
  disabled?: boolean;
  /**
   * Whether this form should be submitted when the merchant presses the "enter"
   * key on their keyboard. Defaults to `true`. When set to a string value,
   * the implicit submit behavior will be enabled, and the string will be used
   * as a label for an explicit submit button that is visible only to assistive
   * technologies.
   *
   * You can also use your own submit button with <Button submit>
   */
  implicitSubmit?: boolean | string;
  /**
   * A callback that is run when the form is submitted.
   */
  onSubmit(): void;
}

/**
 * The `Form` component should be used to wrap one or more form controls.
 * This component provides an "implicit submit" behavior, where merchants can
 * submit the form from any input by pressing "enter" on their keyboards. This
 * behavior is widely expected, and should be respected as often as possible.
 *
 * Unlike an HTML `form` element, this component does not support configuring
 * the descendant fields to be submitted via HTTP automatically. Instead, you
 * must provide an `onSubmit` callback that will perform the necessary HTTP
 * requests in JavaScript.
 */
export const Form = createRemoteComponent<'Form', FormProps>('Form');
