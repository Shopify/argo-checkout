import {extend, InlineStack, View} from '@shopify/argo-checkout';

extend('Checkout::Feature::Render', (root) => {
  const inlineStack = root.createComponent(
    InlineStack,
    {
      spacing: 'base',
    },
    [
      root.createComponent(View, {border: 'base', padding: 'base'}, 'View'),
      root.createComponent(View, {border: 'base', padding: 'base'}, 'View'),
      root.createComponent(View, {border: 'base', padding: 'base'}, 'View'),
    ],
  );

  root.appendChild(inlineStack);
});