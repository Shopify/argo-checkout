import {extend, Divider} from '@shopify/checkout-ui-extensions';

extend('Checkout::Feature::Render', (root) => {
  const divider = root.createComponent(Divider);

  root.appendChild(divider);
});
