import {extend, View} from '@shopify/post-purchase-ui-extensions';

extend('Checkout::PostPurchase::Render', (root) => {
  const view = root.createComponent(View, undefined, 'View');

  root.appendChild(view);
});
