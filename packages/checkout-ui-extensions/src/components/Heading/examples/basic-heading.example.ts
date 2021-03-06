import {extend, Heading} from '@shopify/checkout-ui-extensions';

extend('Checkout::Feature::Render', (root) => {
  const heading = root.createComponent(Heading, undefined, 'Heading');

  root.appendChild(heading);
});
