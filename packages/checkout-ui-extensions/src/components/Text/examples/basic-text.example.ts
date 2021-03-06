import {extend, Text} from '@shopify/checkout-ui-extensions';

extend('Checkout::Feature::Render', (root) => {
  const text = root.createComponent(Text, undefined, 'Text');

  root.appendChild(text);
});
