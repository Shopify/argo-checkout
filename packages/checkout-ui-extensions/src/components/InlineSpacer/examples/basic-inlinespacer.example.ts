import {
  extend,
  InlineSpacer,
  InlineStack,
  View,
} from '@shopify/checkout-ui-extensions';

extend('Checkout::Feature::Render', (root) => {
  const inlineSpacer = root.createComponent(InlineStack, undefined, [
    root.createComponent(View, {border: 'base', padding: 'base'}, 'View'),
    root.createComponent(InlineSpacer, {size: 'large'}),
    root.createComponent(View, {border: 'base', padding: 'base'}, 'View'),
    root.createComponent(InlineSpacer, {size: 'small'}),
    root.createComponent(View, {border: 'base', padding: 'base'}, 'View'),
  ]);

  root.appendChild(inlineSpacer);
});
