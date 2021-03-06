import {extend, View} from '@shopify/checkout-ui-extensions';

extend('Checkout::Feature::Render', (root) => {
  const view = root.createComponent(View, undefined, 'View');

  root.appendChild(view);
});
