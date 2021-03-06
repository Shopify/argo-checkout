import {extend, TextBlock} from '@shopify/checkout-ui-extensions';

extend('Checkout::Feature::Render', (root) => {
  const textBlock = root.createComponent(TextBlock, undefined, 'Textblock');

  root.appendChild(textBlock);
});
