import {extend, InlineStack, View} from '@shopify/argo-post-purchase';

extend('Checkout::PostPurchase::Render', (root) => {
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
