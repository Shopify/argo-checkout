import {extend, Spinner} from '@shopify/checkout-ui-extensions';

extend('Checkout::Feature::Render', (root) => {
  const spinner = root.createComponent(Spinner);

  root.appendChild(spinner);
});
